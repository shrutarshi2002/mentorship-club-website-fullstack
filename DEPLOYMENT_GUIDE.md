# Fullstack Website Deployment Guide

This guide will help you deploy your mentorship club website (Next.js frontend + Node.js backend) to production.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Hosting Options](#hosting-options)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [Environment Variables](#environment-variables)
6. [Important Notes](#important-notes)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Your application consists of:
- **Frontend**: Next.js 15 application (configured for static export)
- **Backend**: Node.js/Express API server

**⚠️ Important**: The backend currently uses in-memory storage. This means:
- Data will be lost when the server restarts
- For production, you should integrate a database (MongoDB, PostgreSQL, etc.)
- This guide covers deployment with the current in-memory setup

---

## Prerequisites

Before deploying, ensure you have:
- [ ] Git repository set up (GitHub, GitLab, or Bitbucket)
- [ ] Accounts on hosting platforms (see options below)
- [ ] Basic understanding of environment variables

---

## Hosting Options

### Recommended Combinations

#### Option 1: Vercel (Frontend) + Railway (Backend) ⭐ Recommended
- **Frontend**: Vercel (free tier, excellent Next.js support)
- **Backend**: Railway (free tier, easy deployment)
- **Pros**: Easy setup, great free tiers, automatic deployments

#### Option 2: Netlify (Frontend) + Render (Backend)
- **Frontend**: Netlify (free tier, already configured)
- **Backend**: Render (free tier, auto-scaling)
- **Pros**: Both have generous free tiers

#### Option 3: Vercel (Frontend) + Render (Backend)
- **Frontend**: Vercel
- **Backend**: Render
- **Pros**: Reliable, good performance

---

## Step-by-Step Deployment

### Part 1: Deploy Backend API

#### Option A: Deploy to Railway

1. **Sign up/Login**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

3. **Configure Environment Variables**
   - Go to your project → Variables tab
   - Add these variables:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRE=7d
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```
   - **Important**: Generate a strong JWT_SECRET (use a random string generator)

4. **Deploy**
   - Railway will automatically detect Node.js
   - It will run `npm install` and `npm start`
   - Wait for deployment to complete

5. **Get Your Backend URL**
   - Railway provides a URL like: `https://your-app.up.railway.app`
   - Copy this URL - you'll need it for the frontend

#### Option B: Deploy to Render

1. **Sign up/Login**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder

3. **Configure Settings**
   - **Name**: `mentorship-backend` (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

4. **Add Environment Variables**
   - Scroll to "Environment Variables"
   - Add:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRE=7d
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Get your backend URL: `https://your-app.onrender.com`

---

### Part 2: Deploy Frontend

#### Option A: Deploy to Vercel (Recommended for Next.js)

1. **Sign up/Login**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `mentorship-club-website` folder

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `mentorship-club-website`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (for standard Next.js) or `out` (if using static export)

4. **Add Environment Variables**
   - Go to "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
     ```
   - Replace with your actual backend URL from Part 1

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy
   - You'll get a URL like: `https://your-app.vercel.app`

#### Option B: Deploy to Netlify

1. **Sign up/Login**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build Settings**
   - **Base directory**: `mentorship-club-website`
   - **Build command**: `npm run build`
   - **Publish directory**: `out` (since you're using static export)

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
     ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy
   - You'll get a URL like: `https://your-app.netlify.app`

---

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` folder (or set in hosting platform):

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Security Notes**:
- Never commit `.env` files to Git
- Use strong, random JWT_SECRET in production
- Update FRONTEND_URL with your actual frontend domain

### Frontend Environment Variables

Create a `.env.local` file in the `mentorship-club-website` folder (or set in hosting platform):

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

**Important**: 
- `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- Update with your actual backend URL

---

## Important Notes

### ⚠️ In-Memory Storage Limitation

Your backend currently uses in-memory storage:
- **Data is lost on server restart**
- **Not suitable for production** with real users
- **Solution**: Integrate a database (MongoDB, PostgreSQL, etc.)

### CORS Configuration

The backend is configured to accept requests from your frontend. Make sure:
1. `FRONTEND_URL` in backend matches your frontend domain
2. No trailing slashes in URLs
3. Both HTTP and HTTPS are configured correctly

### Static Export vs Server-Side Rendering

Your Next.js app is configured for static export (`output: 'export'`):
- ✅ Works great with Netlify, Vercel
- ✅ No server needed for frontend
- ⚠️ Some Next.js features won't work (API routes, server components)
- ✅ Perfect for your current setup

### Updating Backend URL

After deploying, if you need to update the backend URL:
1. Update `NEXT_PUBLIC_API_URL` in frontend environment variables
2. Rebuild/redeploy the frontend
3. Update `FRONTEND_URL` in backend environment variables
4. Restart backend server

---

## Troubleshooting

### Frontend can't connect to backend

**Symptoms**: Network errors, CORS errors

**Solutions**:
1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running and accessible
3. Check CORS settings in backend
4. Ensure `FRONTEND_URL` in backend matches frontend domain

### Backend returns 404

**Symptoms**: API requests return 404

**Solutions**:
1. Verify backend is deployed and running
2. Check backend URL is correct
3. Ensure routes are correct (e.g., `/api/auth/login`)
4. Check backend logs for errors

### Build fails

**Symptoms**: Deployment fails during build

**Solutions**:
1. Test build locally: `npm run build`
2. Check for TypeScript/ESLint errors
3. Verify all dependencies are in `package.json`
4. Check Node.js version compatibility

### Data disappears after restart

**This is expected** with in-memory storage. To fix:
1. Integrate a database (MongoDB, PostgreSQL)
2. Update models to use database instead of arrays
3. See backend README for database integration steps

---

## Next Steps

### For Production Use

1. **Add Database**
   - Choose MongoDB (MongoDB Atlas) or PostgreSQL (Supabase, Neon)
   - Update backend models to use database
   - Migrate from in-memory storage

2. **Add Error Monitoring**
   - Set up Sentry or similar
   - Monitor API errors
   - Track user issues

3. **Add Analytics**
   - Google Analytics
   - Vercel Analytics (if using Vercel)

4. **Set up Custom Domain**
   - Configure DNS
   - Add SSL certificate (automatic on most platforms)

5. **Backup Strategy**
   - Regular database backups
   - Version control for code

---

## Quick Reference

### Backend URLs
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`

### Frontend URLs
- Vercel: `https://your-app.vercel.app`
- Netlify: `https://your-app.netlify.app`

### Test Your Deployment

1. **Test Backend**:
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **Test Frontend**:
   - Visit your frontend URL
   - Try logging in/registering
   - Check browser console for errors

---

## Support

If you encounter issues:
1. Check hosting platform logs
2. Verify environment variables
3. Test API endpoints directly
4. Check CORS configuration
5. Review this guide's troubleshooting section

Good luck with your deployment! 🚀





