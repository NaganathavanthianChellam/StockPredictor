# Installing Node.js for StockPredictor

## 🎯 Quick Installation Guide

### Method 1: Official Installer (Recommended)

**Step 1: Download Node.js**
1. Open your browser
2. Go to: **https://nodejs.org/**
3. Click the **"LTS"** (Long Term Support) button - usually the left green button
   - Recommended version: **20.x LTS** or latest LTS
4. Save the installer (e.g., `node-v20.11.0-x64.msi`)

**Step 2: Run the Installer**
1. Double-click the downloaded `.msi` file
2. Click **"Next"** through the setup wizard
3. **IMPORTANT**: On the "Tools for Native Modules" screen:
   - ✅ Check "Automatically install the necessary tools"
4. **IMPORTANT**: Ensure "Add to PATH" is checked (should be default)
5. Click **"Install"**
6. Wait for installation to complete (2-3 minutes)
7. Click **"Finish"**

**Step 3: Verify Installation**
1. **Close all PowerShell windows** (important!)
2. Open a **new** PowerShell window
3. Run these commands:
   ```powershell
   node --version
   npm --version
   ```
4. You should see version numbers like:
   ```
   v20.11.0
   10.2.4
   ```

**If you see version numbers, Node.js is installed!** ✅

---

### Method 2: Using Scoop (Alternative)

**Step 1: Install Scoop** (if not already installed)
```powershell
# Run in PowerShell (as Administrator)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

**Step 2: Install Node.js**
```powershell
scoop install nodejs-lts
```

**Step 3: Verify**
```powershell
node --version
npm --version
```

---

### Method 3: Portable Installation (No Admin Rights)

**If you can't install with administrator rights:**

1. Download the **Windows Binary (.zip)** from: https://nodejs.org/en/download/
2. Extract to a folder like: `C:\nodejs`
3. Add to PATH manually:
   - Open System Properties → Environment Variables
   - Edit "Path" for your user
   - Add: `C:\nodejs`
4. Restart PowerShell
5. Verify with `node --version`

---

## 🚀 After Node.js is Installed

### Step 1: Verify Installation
```powershell
# Open NEW PowerShell window
node --version    # Should show: v20.x.x
npm --version     # Should show: 10.x.x
```

### Step 2: Navigate to Frontend
```powershell
cd C:\Users\user\Desktop\Projects\StockPredictor\frontend
```

### Step 3: Install Dependencies
```powershell
npm install
```
This will take 2-3 minutes and download all required packages.

### Step 4: Start the Frontend
```powershell
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 1234 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 5: Open Your Browser
Go to: **http://localhost:3000**

You'll see the professional StockPredictor UI! 🎉

---

## 🐛 Troubleshooting

### Issue: "node is not recognized"
**Solution**: 
1. Close ALL PowerShell windows
2. Open a NEW PowerShell window
3. Try `node --version` again
4. If still not working, restart your computer

### Issue: "execution policy" error
**Solution**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: npm install fails with errors
**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: Port 3000 already in use
**Solution**: Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001,
}
```

### Issue: Slow npm install
**Solution**: This is normal - first install takes 2-3 minutes

---

## 📋 Complete Setup Checklist

- [ ] Download Node.js LTS from nodejs.org
- [ ] Run installer with "Add to PATH" checked
- [ ] Close and reopen PowerShell
- [ ] Verify: `node --version` works
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Open browser to: http://localhost:3000
- [ ] Backend running on: http://localhost:8000

---

## 🎊 What You'll See After Installation

### Backend (Already Running) ✅
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs

### Frontend (After npm run dev) ✨
- **UI**: http://localhost:3000
- Professional stock analysis dashboard
- Search and select Indian stocks
- Real-time analysis predictions
- Beautiful charts and visualizations

---

## 💡 Quick Reference

### Check Node.js Version
```powershell
node --version
npm --version
```

### Install Frontend Dependencies
```powershell
cd frontend
npm install
```

### Start Frontend Dev Server
```powershell
cd frontend
npm run dev
```

### Stop Frontend Server
Press `Ctrl + C` in the PowerShell window

### Update npm (if needed)
```powershell
npm install -g npm@latest
```

---

## 📞 Need Help?

If you encounter any issues:
1. Make sure you closed and reopened PowerShell after Node.js installation
2. Verify Node.js is in PATH: `$env:PATH -split ';' | Select-String node`
3. Try restarting your computer
4. Check Node.js installation in: `C:\Program Files\nodejs`

---

## 🌐 Download Links

- **Node.js Official**: https://nodejs.org/
- **Node.js Downloads Page**: https://nodejs.org/en/download/
- **Scoop Package Manager**: https://scoop.sh/

---

## ✅ Success Indicators

You'll know everything is working when:
1. `node --version` shows a version number
2. `npm --version` shows a version number
3. `npm install` completes without errors
4. `npm run dev` starts the Vite server
5. http://localhost:3000 shows the StockPredictor UI
6. http://localhost:8000 shows the backend API

---

**Once installed, you'll have a fully functional stock analysis platform!** 🚀📈
