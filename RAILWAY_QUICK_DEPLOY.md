# Quick Backend Deployment to Railway (Free)

Step-by-step guide to deploy your backend to Railway from your GitHub repository.

## 🚀 Step-by-Step Guide

### Step 1: Push Backend to GitHub

If you haven't already, add the backend to your existing repo:

```bash
# From your project root
git add backend/
git commit -m "Add backend to repository"
git push origin master
# or
git push origin main
```

### Step 2: Sign Up for Railway

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with **GitHub** (easiest option)
4. Authorize Railway to access your GitHub

### Step 3: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select: `shrutarshi2002/mentorship-club-website`
4. Click **"Deploy Now"**

### Step 4: Configure Backend Settings

Railway will detect it's a Node.js project. Now configure it:

1. Click on your new service
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Set it to: `backend`
5. Click **"Save"**

### Step 5: Add Environment Variables

1. Still in **"Settings"** tab
2. Scroll to **"Variables"** section
3. Click **"New Variable"** and add each:

   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=generate-a-random-secret-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

   **Important**: 
   - Generate a strong `JWT_SECRET` (use a random string generator)
   - You'll update `FRONTEND_URL` later with your actual frontend URL

4. Click **"Save"** after adding each variable

### Step 6: Deploy

1. Railway will automatically start deploying
2. Go to **"Deployments"** tab to see progress
3. Wait for deployment to complete (usually 2-3 minutes)

### Step 7: Get Your Backend URL

1. Once deployed, go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Railway provides a default domain like: `your-app.up.railway.app`
4. **Copy this URL** - you'll need it for your frontend!

### Step 8: Test Your Backend

1. Visit: `https://your-app.up.railway.app/api/health`
2. You should see: `{"success": true, "status": "OK", ...}`

✅ **Backend is now live!**

---

## 🔄 Update Frontend URL Later

After you deploy your frontend:

1. Go back to Railway → Your project → Settings → Variables
2. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Railway will automatically redeploy

---

## 📋 Quick Reference

### Your Backend URL Format
```
https://your-app-name.up.railway.app
```

### Test Endpoints
- Health: `https://your-app.up.railway.app/api/health`
- API Info: `https://your-app.up.railway.app/`

### Environment Variables Needed
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your-random-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.com
```

---

## 🆘 Troubleshooting

### Build Fails

- Check **"Deployments"** tab → Click on failed deployment → View logs
- Common issues:
  - Missing `package.json` in backend folder
  - Wrong root directory (should be `backend`)
  - Node.js version issues

### Backend Not Starting

- Check **"Deployments"** → **"Logs"** tab
- Verify environment variables are set
- Check that `server.js` exists in backend folder

### Can't Access Backend

- Verify deployment is successful (green checkmark)
- Check the domain in Settings → Domains
- Test with `/api/health` endpoint

### CORS Errors

- Make sure `FRONTEND_URL` is set correctly
- Update it after deploying frontend
- No trailing slash in URL

---

## 💡 Pro Tips

1. **Free Tier**: Railway gives you $5 free credit monthly (enough for small projects)
2. **Auto Deploy**: Every push to GitHub automatically redeploys
3. **Logs**: Check logs in Railway dashboard for debugging
4. **Custom Domain**: You can add your own domain later (paid feature)

---

## ✅ Checklist

- [ ] Backend pushed to GitHub
- [ ] Railway account created
- [ ] Project created from GitHub repo
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Backend URL copied
- [ ] Health endpoint tested
- [ ] Frontend URL updated in Railway (after frontend deploy)

---

**Your backend is now live on Railway!** 🎉

Next step: Update your frontend's `NEXT_PUBLIC_API_URL` to point to your Railway backend URL.


