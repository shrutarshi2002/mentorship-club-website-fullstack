# SiteGround Quick Start Guide

**Fastest way to deploy your website to SiteGround**

## 🎯 Recommended Approach: Hybrid Deployment

Since SiteGround shared hosting doesn't support Node.js, we'll:
- **Frontend**: Deploy to SiteGround (static files)
- **Backend**: Deploy to Railway or Render (free Node.js hosting)

This is the **easiest and most reliable** method.

---

## Step 1: Deploy Backend (5 minutes)

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo → Choose `backend` folder
4. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=generate-random-secret-here
   JWT_EXPIRE=7d
   FRONTEND_URL=https://yourdomain.com
   ```
5. Wait for deployment → **Copy your backend URL** (e.g., `https://your-app.up.railway.app`)

### Option B: Render

1. Go to [render.com](https://render.com) → Sign up
2. Click "New +" → "Web Service"
3. Connect GitHub → Select `backend` folder
4. Settings:
   - Build: `npm install`
   - Start: `npm start`
5. Add same environment variables as above
6. Deploy → **Copy your backend URL**

---

## Step 2: Build Frontend (2 minutes)

On your local machine:

```bash
cd mentorship-club-website

# Create production environment file
echo "NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app" > .env.production
# Replace with your actual backend URL from Step 1

# Install dependencies (if not done)
npm install

# Build for production
npm run build
```

This creates an `out` folder with all static files ready to upload.

---

## Step 3: Upload to SiteGround (5 minutes)

### Access Site Tools

1. Go to [tools.siteground.com](https://tools.siteground.com)
2. Login with your SiteGround credentials
3. Select your website

### Upload Files

1. **Open File Manager**:
   - Click "Site" → "File Manager"
   - Navigate to `public_html` folder (this is your website root)

2. **Clear existing files** (if any):
   - Select all files in `public_html`
   - Delete them (backup first if needed)

3. **Upload your built files**:
   - Click "Upload" button
   - Select **ALL files and folders** from the `out` directory
   - **Important**: Upload the contents of `out`, not the `out` folder itself
   - Wait for upload to complete

4. **Verify structure**:
   Your `public_html` should contain:
   ```
   public_html/
   ├── index.html
   ├── _next/
   │   └── static/
   ├── assets/
   └── (other files)
   ```

---

## Step 4: Configure .htaccess (Optional but Recommended)

1. In File Manager, go to `public_html`
2. Click "New File" → Name it `.htaccess`
3. Add this content:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Handle client-side routing (for Next.js)
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

4. Save the file

---

## Step 5: Update Backend CORS

1. Go back to Railway/Render
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://yourdomain.com
   ```
   Replace with your actual SiteGround domain
3. Redeploy/restart the backend

---

## Step 6: Test Your Site

1. Visit your domain: `https://yourdomain.com`
2. Your site should load!
3. Try registering a user
4. Check browser console (F12) for any errors

---

## ✅ You're Done!

Your website is now live on SiteGround!

- **Frontend**: `https://yourdomain.com` (SiteGround)
- **Backend**: `https://your-backend.railway.app` (Railway/Render)

---

## 🔧 Troubleshooting

### Files Not Showing

- **Check location**: Files must be in `public_html`, not a subfolder
- **Check permissions**: Files should be 644, folders 755
- **Clear cache**: Hard refresh browser (Ctrl+F5)

### 404 Errors on Routes

- **Check .htaccess**: Ensure rewrite rules are correct
- **Verify file structure**: All files should be directly in `public_html`

### API Not Working

- **Check backend URL**: Verify `NEXT_PUBLIC_API_URL` is correct
- **Check CORS**: Ensure `FRONTEND_URL` in backend matches your domain
- **Test backend**: Visit `https://your-backend.railway.app/api/health`

### Build Errors

- **Test locally first**: Run `npm run build` locally to catch errors
- **Check Node version**: Ensure you're using Node.js 18+

---

## 📝 Quick Reference

### Build Command
```bash
cd mentorship-club-website
npm run build
# Files will be in 'out' folder
```

### Upload Location
```
SiteGround → File Manager → public_html
```

### Environment Variables

**Frontend** (build-time):
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

**Backend**:
```env
FRONTEND_URL=https://yourdomain.com
```

---

## 🆘 Need Help?

- **SiteGround Support**: 24/7 chat support in Site Tools
- **Railway Support**: Check Railway dashboard logs
- **General Issues**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**That's it!** Your fullstack website is now hosted on SiteGround! 🎉





