# Adding Backend to Your GitHub Repository

You can use the **same repository** for both frontend and backend. This is called a "monorepo" approach and works perfectly with Railway/Render.

## ✅ Option 1: Add Backend to Existing Repo (Recommended)

### Step 1: Add Backend to Your Local Project

If your backend folder isn't already in the project root, make sure it's there:

```
your-project/
├── mentorship-club-website/  # Frontend (already on GitHub)
│   └── ...
└── backend/                  # Backend (needs to be added)
    └── ...
```

### Step 2: Commit and Push Backend to GitHub

From your project root directory:

```bash
# Make sure you're in the project root (where both folders exist)
cd "G:\client project"

# Add backend folder to git
git add backend/

# Commit the changes
git commit -m "Add backend to repository"

# Push to GitHub
git push origin master
# or if your branch is called 'main':
git push origin main
```

That's it! Your backend is now in the same repository.

---

## 🚀 Deploy Backend from Same Repo

When deploying to Railway or Render, you can point to the `backend` folder in the same repo.

### Railway Deployment

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository: `shrutarshi2002/mentorship-club-website`
4. **Important**: In the settings, set:
   - **Root Directory**: `backend`
5. Add environment variables (see below)
6. Deploy!

### Render Deployment

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub → Select `shrutarshi2002/mentorship-club-website`
4. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy!

---

## 📝 Environment Variables for Backend

Add these in Railway/Render:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-random-string-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important**: 
- Generate a strong `JWT_SECRET` (random string)
- Update `FRONTEND_URL` after you deploy your frontend

---

## 🔄 Alternative: Separate Repository (Not Recommended)

If you really want a separate repo (not necessary), you can:

1. Create a new GitHub repository for backend
2. Push backend folder to that repo
3. Deploy from that repo

But this is more work and not needed. The monorepo approach is simpler!

---

## ✅ Quick Checklist

- [ ] Backend folder is in your project root
- [ ] Backend is committed to Git
- [ ] Backend is pushed to GitHub
- [ ] Railway/Render is connected to your repo
- [ ] Root directory is set to `backend` in deployment settings
- [ ] Environment variables are configured
- [ ] Backend is deployed and running

---

## 🎯 Your Repository Structure Should Look Like:

```
mentorship-club-website (GitHub repo)
├── mentorship-club-website/  # Frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/                  # Backend
│   ├── server.js
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

Both folders in the same repository! 🎉

---

## 🆘 Troubleshooting

### Backend folder not showing in GitHub

- Make sure you committed and pushed: `git add backend/ && git commit -m "Add backend" && git push`
- Check if `backend/` is in `.gitignore` (it shouldn't be)

### Deployment can't find backend

- Verify Root Directory is set to `backend` in Railway/Render settings
- Check that `backend/package.json` exists
- Ensure `backend/server.js` is the entry point

---

**That's it!** You now have both frontend and backend in the same repository, and you can deploy them separately to different platforms. 🚀


