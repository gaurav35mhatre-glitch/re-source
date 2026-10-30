# 🚀 How to Open and Run re'source in VS Code

Welcome to the **re'source** project workspace for Visual Studio Code.

---

## ⚡ Option 1: 1-Click Open Directly in VS Code (Easiest)

If you already have VS Code installed:

1. Open **Command Prompt** or **PowerShell** on your computer.
2. Run this command:
   ```bash
   code C:\Users\gaura\.gemini\antigravity\scratch\symbio
   ```
   *Or open VS Code, click **File → Open Workspace from File...** and select `re_source.code-workspace`.*

---

## ⚡ Option 2: Using the Downloaded ZIP file

1. Extract `re_source_vscode_project.zip` to any folder on your computer (e.g. `C:\Users\gaura\Projects\re_source` or Desktop).
2. In VS Code, go to **File → Open Folder...** and select the extracted folder.
3. Or double-click the `re_source.code-workspace` file inside the extracted folder.

---

## 🏃 Running the Application

Inside VS Code, you have multiple convenient ways to launch:

### Method A: Built-in Terminal (Recommended)
1. Open the integrated terminal in VS Code (`Ctrl + ~` or **Terminal → New Terminal**).
2. Type:
   ```bash
   npm run dev
   ```
   *(This automatically launches both the Node backend on Port 5000 and the Vite frontend on Port 3000 concurrently!)*
3. Open your browser at:
   - **Frontend App:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### Method B: VS Code Tasks (Zero Typing)
1. Press `Ctrl + Shift + B` (Run Build Task).
2. Select **"🚀 Start Full Stack App (Client + Server)"**.

---

### Method C: Windows 1-Click Batch File
1. In the VS Code file explorer (or Windows Explorer), right-click `start-dev.bat` and click **Open in Integrated Terminal** or just double-click it.

---

### Method D: F5 Debugger
1. Press `F5` in VS Code.
2. Select **"🚀 Full Stack: Run Both Server & Web App"** to start the backend and automatically launch Chrome/Edge.

---

## 📁 Project Architecture

- **`client/`** — React 18, Vite, Tailwind CSS, Lucide icons, Leaflet interactive maps, Recharts.
  - `client/src/pages/Landing.jsx` — Full-width landing page with Executive Cheatsheet.
  - `client/src/pages/Overview.jsx` — Material Flow Control Center & Mass Balance.
  - `client/src/pages/AnalyzeWaste.jsx` — Diagnostic Workstation & Polymer Scanner.
  - `client/src/pages/ProcessingPlan.jsx` — 7-Stage Preprocessing Recipe.
  - `client/src/pages/CapacityNetwork.jsx` — Distributed Processing Node Map.
  - `client/src/pages/MaterialPassport.jsx` — Verified Digital Product Passport (DPP).
- **`server/`** — Node.js & Express REST API with In-Memory MongoDB & Auto-seeding.
- **`re_source.code-workspace`** — VS Code multi-folder workspace configuration.
- **`.vscode/`** — Pre-configured `launch.json`, `tasks.json`, and `settings.json`.
