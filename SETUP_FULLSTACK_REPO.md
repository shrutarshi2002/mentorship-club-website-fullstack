# Setting Up Fullstack Repository

Guide to add both frontend and backend to your new GitHub repository: `mentorship-club-website-fullstack`

## 🎯 Goal

Add both folders to your new repository:
- `mentorship-club-website/` (Frontend)
- `backend/` (Backend)

## 📋 Step-by-Step Instructions

### Step 1: Navigate to Your Project

Open terminal/command prompt and go to your project root:

```bash
cd "G:\client project"
```

### Step 2: Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

### Step 3: Add Remote Repository

```bash
# Add your new GitHub repository as remote
git remote add origin https://github.com/shrutarshi2002/mentorship-club-website-fullstack.git

# Or if you already have a remote, update it:
git remote set-url origin https://github.com/shrutarshi2002/mentorship-club-website-fullstack.git
```

### Step 4: Create .gitignore (if it doesn't exist)

Create a `.gitignore` file in the root with:

```
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Next.js
.next/
out/
.vercel

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Backend specific
backend/node_modules/
backend/.env
```

### Step 5: Add All Files

```bash
# Add both frontend and backend
git add mentorship-club-website/
git add backend/

# Add root files (README, etc.)
git add .

# Check what will be committed
git status
```

### Step 6: Commit Everything

```bash
git commit -m "Initial commit: Add frontend and backend"
```

### Step 7: Push to GitHub

```bash
# Push to main branch (or master if that's your default)
git branch -M main
git push -u origin main

# If your default branch is master:
# git push -u origin master
```

### Step 8: Verify on GitHub

1. Go to: https://github.com/shrutarshi2002/mentorship-club-website-fullstack
2. You should see both folders:
   - `mentorship-club-website/`
   - `backend/`

## ✅ Expected Repository Structure

```
mentorship-club-website-fullstack/
├── mentorship-club-website/     # Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/                      # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

## 🚀 Next Steps: Deploy

### Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select: `shrutarshi2002/mentorship-club-website-fullstack`
4. **Root Directory**: `backend`
5. Add environment variables
6. Deploy!

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. New Project → Import from GitHub
3. Select: `shrutarshi2002/mentorship-club-website-fullstack`
4. **Root Directory**: `mentorship-club-website`
5. Add `NEXT_PUBLIC_API_URL` environment variable
6. Deploy!

## 🆘 Troubleshooting

### "Repository not found" error

- Make sure the repository exists on GitHub
- Check you have write access
- Verify the URL is correct

### "Everything up-to-date" but nothing on GitHub

- Check you're pushing to the correct branch
- Try: `git push -u origin main --force` (be careful with force push)

### Files not showing

- Make sure files are not in `.gitignore`
- Check `git status` to see what's tracked
- Verify you committed: `git log`

## 📝 Quick Command Summary

```bash
cd "G:\client project"
git init
git remote add origin https://github.com/shrutarshi2002/mentorship-club-website-fullstack.git
git add .
git commit -m "Initial commit: Add frontend and backend"
git branch -M main
git push -u origin main
```

---

**That's it!** Your fullstack project is now on GitHub! 🎉

