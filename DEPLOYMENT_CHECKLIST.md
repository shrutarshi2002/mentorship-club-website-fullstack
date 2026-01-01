# Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

- [ ] Code is committed to Git repository
- [ ] All features are tested locally
- [ ] Environment variables are documented
- [ ] No sensitive data in code (use environment variables)
- [ ] `.env` files are in `.gitignore`

## Backend Deployment

### Setup
- [ ] Created account on hosting platform (Railway/Render)
- [ ] Connected GitHub repository
- [ ] Selected `backend` folder for deployment

### Configuration
- [ ] Set `PORT=5000` (or let platform assign)
- [ ] Set `NODE_ENV=production`
- [ ] Generated strong `JWT_SECRET` (random string)
- [ ] Set `JWT_EXPIRE=7d`
- [ ] Set `FRONTEND_URL` (will update after frontend deploys)

### Deployment
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., `https://your-app.railway.app`)
- [ ] Tested backend health endpoint: `/api/health`
- [ ] Backend is accessible from browser

## Frontend Deployment

### Setup
- [ ] Created account on hosting platform (Vercel/Netlify)
- [ ] Connected GitHub repository
- [ ] Selected `mentorship-club-website` folder

### Configuration
- [ ] Set `NEXT_PUBLIC_API_URL` to backend URL
- [ ] Build settings configured correctly
- [ ] Output directory set to `out` (for static export)

### Deployment
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., `https://your-app.vercel.app`)
- [ ] Frontend is accessible

## Post-Deployment

### Backend Updates
- [ ] Updated `FRONTEND_URL` in backend to actual frontend URL
- [ ] Backend restarted/redeployed with new CORS settings

### Testing
- [ ] Can access frontend URL
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] API calls work (check browser console)
- [ ] No CORS errors
- [ ] No network errors

### Security
- [ ] Using HTTPS (automatic on most platforms)
- [ ] Strong JWT_SECRET set
- [ ] No sensitive data exposed
- [ ] CORS properly configured

## Production Considerations

### Database (Future)
- [ ] Database selected (MongoDB/PostgreSQL)
- [ ] Database hosted (MongoDB Atlas/Supabase/Neon)
- [ ] Backend updated to use database
- [ ] Data migration plan (if needed)

### Monitoring
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Analytics configured (optional)
- [ ] Logging configured

### Domain & SSL
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on most platforms)
- [ ] DNS records updated (if using custom domain)

## Final Verification

- [ ] All features work in production
- [ ] User registration works
- [ ] User login works
- [ ] API endpoints respond correctly
- [ ] No console errors
- [ ] Mobile responsive (test on phone)
- [ ] Performance is acceptable

## Documentation

- [ ] Deployment URLs documented
- [ ] Environment variables documented
- [ ] Team members have access
- [ ] Backup/recovery plan in place

---

## Quick Test Commands

### Test Backend
```bash
curl https://your-backend-url.railway.app/api/health
```

### Test Frontend
- Open in browser
- Check browser console (F12)
- Try registering a user

---

## Troubleshooting Checklist

If something doesn't work:

- [ ] Check backend logs
- [ ] Check frontend build logs
- [ ] Verify environment variables are set
- [ ] Verify URLs are correct (no typos)
- [ ] Check CORS configuration
- [ ] Test backend endpoint directly
- [ ] Check browser console for errors
- [ ] Verify both services are running

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

Mark items as you complete them!





