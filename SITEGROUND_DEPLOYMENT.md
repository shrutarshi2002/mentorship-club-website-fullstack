# SiteGround Deployment Guide

This guide will help you deploy your fullstack website to SiteGround hosting.

## 📋 Overview

SiteGround offers different hosting plans. For your fullstack application:
- **Frontend (Next.js)**: Can be deployed as static files
- **Backend (Node.js)**: Requires SiteGround's **Cloud Hosting** or **Reseller Hosting** (Node.js support)

## ⚠️ Important Considerations

### SiteGround Hosting Plans

1. **Shared Hosting** (StartUp, GrowBig, GoGeek)
   - ✅ Can host static frontend
   - ❌ **No Node.js support** - Cannot run backend
   - **Solution**: Use SiteGround for frontend only, host backend elsewhere (Railway, Render)
   - **Access**: Site Tools (new interface) or cPanel (legacy)

2. **Cloud Hosting / Reseller Hosting**
   - ✅ Can host static frontend
   - ✅ **May have Node.js support** (check with SiteGround)
   - **Note**: Node.js support varies by plan and region

### SiteGround Interface

SiteGround uses **Site Tools** (new interface) instead of traditional cPanel:
- Access via: `tools.siteground.com`
- Similar functionality to cPanel
- File Manager, Databases, etc. available

### Recommended Approach

**Option 1: Hybrid Deployment (Recommended)**
- Frontend on SiteGround (static files)
- Backend on Railway/Render (free Node.js hosting)

**Option 2: Full SiteGround Deployment**
- Frontend on SiteGround
- Backend on SiteGround Cloud Hosting (requires paid plan with Node.js)

---

## 🚀 Deployment Methods

### Method 1: Hybrid Deployment (Frontend on SiteGround, Backend on Railway/Render)

This is the **easiest and most cost-effective** approach.

#### Step 1: Deploy Backend to Railway or Render

1. **Deploy Backend** (see QUICK_DEPLOY.md):
   - Use Railway or Render (free tier available)
   - Get your backend URL: `https://your-backend.railway.app`

#### Step 2: Build Frontend for Static Export

1. **Update environment variable**:
   ```bash
   cd mentorship-club-website
   ```
   
2. **Create `.env.production` file**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
   Replace with your actual backend URL.

3. **Build the frontend**:
   ```bash
   npm run build
   ```
   This creates an `out` folder with static files.

#### Step 3: Upload to SiteGround

1. **Access SiteGround cPanel**:
   - Login to SiteGround
   - Go to "Websites" → Select your site → "cPanel"

2. **Access File Manager**:
   - In cPanel, find "File Manager"
   - Navigate to `public_html` (or your domain's root folder)

3. **Upload Files**:
   - Delete existing files in `public_html` (backup first if needed)
   - Upload **all contents** from the `out` folder
   - **Important**: Upload the contents of `out`, not the `out` folder itself
   - Files should be directly in `public_html`

4. **Set Permissions**:
   - Ensure files have correct permissions (usually 644 for files, 755 for folders)

5. **Test**:
   - Visit your domain: `https://yourdomain.com`
   - Your site should be live!

#### Step 4: Configure .htaccess (Optional but Recommended)

Create a `.htaccess` file in `public_html` for better routing:

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

---

### Method 2: Full Deployment on SiteGround (Cloud Hosting with Node.js)

This requires SiteGround Cloud Hosting or Reseller Hosting with Node.js support.

#### Prerequisites

- SiteGround Cloud Hosting plan (or Reseller with Node.js)
- SSH access enabled
- Node.js version manager access

#### Step 1: Prepare Backend

1. **Create production build**:
   ```bash
   cd backend
   npm install --production
   ```

2. **Create `.env` file**:
   ```env
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=https://yourdomain.com
   ```

#### Step 2: Upload Backend via SSH

1. **Enable SSH in SiteGround**:
   - Go to cPanel → "SSH/Shell Access"
   - Enable SSH access
   - Note your SSH credentials

2. **Connect via SSH**:
   ```bash
   ssh username@yourdomain.com
   # or
   ssh username@your-server-ip
   ```

3. **Create backend directory**:
   ```bash
   cd ~
   mkdir backend
   cd backend
   ```

4. **Upload files** (using SCP or SFTP):
   ```bash
   # From your local machine
   scp -r backend/* username@yourdomain.com:~/backend/
   ```

   Or use an SFTP client like FileZilla:
   - Connect via SFTP
   - Upload all backend files to `~/backend/`

5. **Install dependencies**:
   ```bash
   cd ~/backend
   npm install --production
   ```

6. **Set up Node.js application**:
   - In SiteGround cPanel, go to "Node.js Selector"
   - Create new Node.js application
   - Set:
     - **Application root**: `~/backend`
     - **Application URL**: `yourdomain.com/api` (or subdomain)
     - **Application startup file**: `server.js`
     - **Node.js version**: Latest LTS (18 or 20)

7. **Set environment variables**:
   - In Node.js Selector, add environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=your-secret
     JWT_EXPIRE=7d
     FRONTEND_URL=https://yourdomain.com
     ```

8. **Start application**:
   - Click "Start" in Node.js Selector
   - Note the port number (might be different from 5000)

#### Step 3: Deploy Frontend

1. **Build frontend** (on your local machine):
   ```bash
   cd mentorship-club-website
   # Create .env.production
   echo "NEXT_PUBLIC_API_URL=https://yourdomain.com/api" > .env.production
   npm run build
   ```

2. **Upload to SiteGround**:
   - Use File Manager or SFTP
   - Upload contents of `out` folder to `public_html`
   - Your frontend will be at `https://yourdomain.com`
   - Your backend will be at `https://yourdomain.com/api`

#### Step 4: Configure Reverse Proxy (Optional)

If you want backend at `/api` path, configure reverse proxy in `.htaccess`:

```apache
RewriteEngine On

# Proxy API requests to Node.js backend
RewriteCond %{REQUEST_URI} ^/api/(.*)$
RewriteRule ^api/(.*)$ http://localhost:PORT/$1 [P,L]

# Handle frontend routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Replace `PORT` with your actual Node.js port from SiteGround.

---

## 🔧 Configuration Details

### Environment Variables

**Backend** (if hosting on SiteGround):
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-strong-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://yourdomain.com
```

**Frontend** (build-time):
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
# or if backend on same domain:
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### Build Commands

**Frontend**:
```bash
cd mentorship-club-website
npm install
npm run build
# Files will be in 'out' folder
```

**Backend** (if deploying to SiteGround):
```bash
cd backend
npm install --production
# Upload entire folder to SiteGround
```

---

## 📁 File Structure on SiteGround

### Method 1 (Hybrid - Recommended)
```
public_html/
├── index.html
├── _next/
│   └── static/
├── assets/
└── .htaccess
```

### Method 2 (Full SiteGround)
```
~
├── backend/          # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── ...
└── public_html/      # Frontend static files
    ├── index.html
    ├── _next/
    └── .htaccess
```

---

## ✅ Testing Your Deployment

1. **Test Frontend**:
   - Visit: `https://yourdomain.com`
   - Should load your homepage

2. **Test Backend** (if on SiteGround):
   - Visit: `https://yourdomain.com/api/health`
   - Should return: `{"success": true, "status": "OK"}`

3. **Test Full Flow**:
   - Try registering a user
   - Check browser console (F12) for errors
   - Verify API calls work

---

## 🔍 Troubleshooting

### Frontend Not Loading

- **Check file permissions**: Should be 644 for files, 755 for folders
- **Verify files are in correct location**: Should be in `public_html`, not a subfolder
- **Check .htaccess**: Ensure rewrite rules are correct
- **Clear browser cache**: Hard refresh (Ctrl+F5)

### Backend Not Working

- **Check Node.js is running**: In cPanel → Node.js Selector → Check status
- **Check logs**: In Node.js Selector → View logs
- **Verify port**: Check what port SiteGround assigned
- **Check environment variables**: Ensure all are set correctly
- **Test SSH access**: Verify you can connect

### CORS Errors

- **Update FRONTEND_URL**: Must match your actual domain
- **Check backend URL**: Ensure `NEXT_PUBLIC_API_URL` is correct
- **Verify HTTPS**: Both frontend and backend should use HTTPS

### 404 Errors on Routes

- **Check .htaccess**: Rewrite rules must be correct
- **Verify static export**: Ensure `next.config.mjs` has `output: 'export'`
- **Check file structure**: All files should be in `public_html`

---

## 🔐 Security Best Practices

1. **Use HTTPS**: SiteGround provides free SSL certificates
2. **Strong JWT Secret**: Generate a random, long string
3. **Environment Variables**: Never commit `.env` files
4. **File Permissions**: Set correct permissions (644/755)
5. **.htaccess Security**: Add security headers (see example above)

---

## 📞 SiteGround Support

If you encounter issues:
1. Check SiteGround Knowledge Base
2. Contact SiteGround Support (24/7 chat)
3. Check Node.js Selector documentation (if using Node.js)

---

## 🎯 Recommended Approach

**For most users, I recommend Method 1 (Hybrid)**:
- ✅ Easier to set up
- ✅ Free backend hosting (Railway/Render)
- ✅ Better performance (dedicated Node.js hosting)
- ✅ Easier to maintain
- ✅ No need for SiteGround Cloud Hosting

**Use Method 2 only if**:
- You want everything on SiteGround
- You have Cloud Hosting plan
- You prefer managing everything in one place

---

## 📝 Quick Checklist

### Method 1 (Hybrid)
- [ ] Backend deployed to Railway/Render
- [ ] Frontend built (`npm run build`)
- [ ] Files uploaded to SiteGround `public_html`
- [ ] `.htaccess` configured (optional)
- [ ] Environment variable set (`NEXT_PUBLIC_API_URL`)
- [ ] Site tested and working

### Method 2 (Full SiteGround)
- [ ] SSH access enabled
- [ ] Node.js Selector access confirmed
- [ ] Backend files uploaded
- [ ] Node.js application created in cPanel
- [ ] Environment variables set
- [ ] Frontend built and uploaded
- [ ] Reverse proxy configured (if needed)
- [ ] Site tested and working

---

**Need help?** Check the main [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for general deployment tips.

