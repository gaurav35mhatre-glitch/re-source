# 🌐 GitHub Deployment Guide for re'source

This repository is pre-configured for automated CI/CD and **1-click GitHub Pages deployment**.

---

## 🚀 Step 1: Push to GitHub

You have three easy ways to push this project to your GitHub account:

### Method A: From VS Code (Zero Terminal Commands Required)
1. Open this folder or `re_source.code-workspace` in **VS Code**.
2. Click the **Source Control** icon on the left sidebar (or press `Ctrl + Shift + G`).
3. Click the blue button: **"Publish to GitHub"** (or "Initialize Repository").
4. Select whether you want a **Public** or **Private** repository.
5. VS Code will automatically commit all files and push them to your GitHub account!

---

### Method B: Using GitHub Desktop (Visual App)
1. Download [GitHub Desktop](https://desktop.github.com/) if you haven't already.
2. Go to **File → Add Local Repository...**
3. Select this folder:
   `C:\Users\gaura\OneDrive\Desktop\SYMBIOSIS EH`
4. Click **Publish repository** to push it to your GitHub profile.

---

### Method C: Using the Command Line (Git Bash / PowerShell)
If you have Git installed, run these commands inside the project folder:
```bash
git init
git add .
git commit -m "Initial commit: re'source platform"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## ⚡ Step 2: Enable GitHub Pages (Automated Deployment)

Once the code is pushed to GitHub, the included **GitHub Actions workflow** (`.github/workflows/deploy.yml`) will automatically build and deploy the web application!

To enable it:
1. On GitHub, go to your repository.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment → Source**, change the dropdown from *Deploy from a branch* to:
   👉 **GitHub Actions**
5. That's it! GitHub will automatically run the build workflow and provide your live public URL:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 🛠 What's Pre-Configured for GitHub:

- ✅ **`.github/workflows/deploy.yml`**: Official GitHub Action that builds Vite and deploys `client/dist` to GitHub Pages on every push.
- ✅ **`.github/workflows/ci.yml`**: Continuous Integration workflow that tests the build and validates syntax on PRs.
- ✅ **`base: './'` in `client/vite.config.js`**: All CSS, JS, and image assets resolve with relative paths so they never break under `username.github.io/repo/`.
- ✅ **`HashRouter` in `client/src/App.jsx`**: Enables client-side routing (`#/overview`, `#/analyze`, `#/plan`, etc.) so refreshing the page or direct links will **never throw a 404 error** on GitHub Pages.
- ✅ **`client/public/404.html`**: Fallback redirect for Single Page Applications.
- ✅ **`.gitignore`**: Carefully configured so `node_modules/` (170MB+) and temporary files are kept out of your git history.
- ✅ **`vercel.json`**: Optional 1-click deployment configuration for Vercel.

---

## 🖥 Live Demo Preview
Once deployed on GitHub Pages, judges and evaluators can interact with:
- **Material Diagnosis Engine**
- **7-Stage Preprocessing Recipe Pipeline**
- **Distributed Capacity Map (Leaflet)**
- **Material Routing Synthesizer**
- **Digital Product Passport (DPP)**
- **Executive Judge Cheatsheet**
