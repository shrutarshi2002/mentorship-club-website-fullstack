# Quick Deployment Guide

## 🚀 Fastest Way to Deploy

### Step 1: Deploy Backend (5 minutes)

#### Using Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository → Choose `backend` folder
4. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=generate-a-random-secret-here
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Wait for deployment → Copy your backend URL (e.g., `https://your-app.up.railway.app`)

#### Using Render (Alternative)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect GitHub → Select `backend` folder
4. Settings:
   - Build: `npm install`
   - Start: `npm start`
5. Add same environment variables as above
6. Deploy → Copy URL (e.g., `https://your-app.onrender.com`)

---

### Step 2: Deploy Frontend (5 minutes)

#### Using Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New..." → "Project"
3. Import your repository → Select `mentorship-club-website` folder
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
   (Replace with your actual backend URL from Step 1)
5. Click "Deploy"
6. Done! Your site is live at `https://your-app.vercel.app`

#### Using Netlify (Alternative)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select repository
4. Build settings:
   - Base directory: `mentorship-club-website`
   - Build command: `npm run build`
   - Publish directory: `out`
5. Add environment variable: `NEXT_PUBLIC_API_URL` (same as above)
6. Deploy

---

### Step 3: Update Backend CORS

After frontend is deployed, update backend environment variable:

1. Go back to your backend hosting (Railway/Render)
2. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Redeploy/restart backend

---

## ✅ Test Your Deployment

1. **Test Backend**: Visit `https://your-backend-url/api/health`
   - Should return: `{"success": true, "status": "OK", ...}`

2. **Test Frontend**: Visit your frontend URL
   - Try registering a new user
   - Check browser console for errors

---

## 🔧 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend domain exactly
- No trailing slashes
- Include `https://`

### Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend is running (visit `/api/health`)
- Check browser console for errors

### Build Fails
- Run `npm run build` locally first to catch errors
- Check Node.js version (should be 18+)

---

## 📝 Environment Variables Summary

### Backend (.env or hosting platform)
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.local or hosting platform)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## ⚠️ Important Notes

1. **Data Storage**: Backend uses in-memory storage - data is lost on restart
2. **JWT Secret**: Use a strong, random secret in production
3. **HTTPS**: Always use HTTPS in production (automatic on Vercel/Netlify/Railway)

---

## 🎉 You're Done!

Your fullstack website is now live! Share the frontend URL with users.

For detailed information, see `DEPLOYMENT_GUIDE.md`





