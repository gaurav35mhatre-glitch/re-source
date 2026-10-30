/**
 * In-Memory Database Fallback for SYMBIO
 * Provides a lightweight, zero-dependency Mongoose-compatible mock
 * guaranteeing immediate startup without requiring 600MB binary downloads.
 */

class MemoryQuery {
  constructor(collection, filter = {}) {
    this.collection = collection;
    this.filter = filter;
    this._populatePaths = [];
    this._sortField = null;
    this._sortAsc = 1;
    this._limit = null;
  }

  populate(pathOrObj) {
    if (typeof pathOrObj === 'string') {
      this._populatePaths.push({ path: pathOrObj });
    } else if (typeof pathOrObj === 'object') {
      this._populatePaths.push(pathOrObj);
    }
    return this;
  }

  sort(sortObj) {
    if (typeof sortObj === 'object') {
      const [field, dir] = Object.entries(sortObj)[0] || [];
      this._sortField = field;
      this._sortAsc = dir === -1 ? -1 : 1;
    }
    return this;
  }

  limit(n) {
    this._limit = n;
    return this;
  }

  _matches(doc) {
    for (const [key, val] of Object.entries(this.filter)) {
      if (val === undefined) continue;
      if (typeof val === 'object' && val !== null) {
        if ('$gte' in val && doc[key] < val.$gte) return false;
        if ('$lte' in val && doc[key] > val.$lte) return false;
        if ('$in' in val && !val.$in.includes(doc[key])) return false;
        if (val instanceof RegExp && !val.test(doc[key])) return false;
      } else {
        const docVal = doc[key]?._id ? doc[key]._id.toString() : doc[key]?.toString();
        const targetVal = val?._id ? val._id.toString() : val?.toString();
        if (docVal !== targetVal) return false;
      }
    }
    return true;
  }

  _populateDoc(doc, store) {
    const clone = { ...doc };
    for (const pop of this._populatePaths) {
      const path = pop.path;
      if (clone[path] !== undefined) {
        // Find in store
        const val = clone[path];
        if (Array.isArray(val)) {
          clone[path] = val.map(id => store.findDocById(id)).filter(Boolean);
        } else if (val) {
          let populated = store.findDocById(val);
          // Nested populate support
          if (populated && pop.populate) {
            const nestedList = Array.isArray(pop.populate) ? pop.populate : [pop.populate];
            for (const nested of nestedList) {
              const nestedPath = nested.path;
              if (populated[nestedPath]) {
                populated = {
                  ...populated,
                  [nestedPath]: store.findDocById(populated[nestedPath])
                };
              }
            }
          }
          clone[path] = populated || val;
        }
      }
    }
    return clone;
  }

  async exec() {
    let docs = this.collection.docs.filter(d => this._matches(d));
    if (this._sortField) {
      docs.sort((a, b) => {
        const va = a[this._sortField];
        const vb = b[this._sortField];
        if (va < vb) return -1 * this._sortAsc;
        if (va > vb) return 1 * this._sortAsc;
        return 0;
      });
    }
    if (this._limit) {
      docs = docs.slice(0, this._limit);
    }
    return docs.map(d => this._populateDoc(d, this.collection.store));
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }
}

class MemoryCollection {
  constructor(name, store) {
    this.name = name;
    this.store = store;
    this.docs = [];
    this._idCounter = 1;
  }

  _generateId() {
    return `mem_${this.name.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  find(filter = {}) {
    return new MemoryQuery(this, filter);
  }

  async findOne(filter = {}) {
    const docs = await new MemoryQuery(this, filter).exec();
    return docs[0] || null;
  }

  async findById(id) {
    if (!id) return null;
    const targetId = id._id ? id._id.toString() : id.toString();
    const doc = this.docs.find(d => d._id === targetId);
    if (!doc) return null;
    return new MemoryQuery(this, { _id: targetId }).exec().then(res => res[0] || null);
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const targetId = id._id ? id._id.toString() : id.toString();
    const idx = this.docs.findIndex(d => d._id === targetId);
    if (idx === -1) return null;
    this.docs[idx] = { ...this.docs[idx], ...update, updatedAt: new Date() };
    return this.findById(targetId);
  }

  async create(data) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(d => this.create(d)));
    }
    const newDoc = {
      ...data,
      _id: data._id ? data._id.toString() : this._generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.docs.push(newDoc);
    return newDoc;
  }

  async deleteMany(filter = {}) {
    if (Object.keys(filter).length === 0) {
      const count = this.docs.length;
      this.docs = [];
      return { deletedCount: count };
    }
    const before = this.docs.length;
    this.docs = this.docs.filter(d => !new MemoryQuery(this, filter)._matches(d));
    return { deletedCount: before - this.docs.length };
  }

  async countDocuments(filter = {}) {
    const matched = await new MemoryQuery(this, filter).exec();
    return matched.length;
  }

  async distinct(field, filter = {}) {
    const matched = await new MemoryQuery(this, filter).exec();
    const values = new Set();
    matched.forEach(d => {
      if (d[field] !== undefined) values.add(d[field]);
    });
    return Array.from(values);
  }
}

class InMemoryStore {
  constructor() {
    this.collections = {
      Industry: new MemoryCollection('Industry', this),
      Material: new MemoryCollection('Material', this),
      Company: new MemoryCollection('Company', this),
      Resource: new MemoryCollection('Resource', this),
      Requirement: new MemoryCollection('Requirement', this),
      Match: new MemoryCollection('Match', this),
      Regulation: new MemoryCollection('Regulation', this),
    };
  }

  findDocById(id) {
    if (!id) return null;
    const targetId = id._id ? id._id.toString() : id.toString();
    for (const col of Object.values(this.collections)) {
      const found = col.docs.find(d => d._id === targetId);
      if (found) return found;
    }
    return null;
  }
}

export const inMemoryStore = new InMemoryStore();
