# Mentorship Club Website

A fullstack mentorship platform built with Next.js (frontend) and Node.js/Express (backend).

## 📁 Project Structure

```
.
├── mentorship-club-website/  # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   └── lib/              # API utilities
│   └── package.json
│
└── backend/                  # Node.js/Express backend
    ├── controllers/         # Route controllers
    ├── models/              # Data models
    ├── routes/              # API routes
    ├── middleware/          # Auth middleware
    └── server.js            # Entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Local Development

1. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend runs on `http://localhost:5000`

2. **Start Frontend** (in a new terminal):
   ```bash
   cd mentorship-club-website
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

3. **Seed Sample Data** (optional):
   ```bash
   cd backend
   npm run seed
   ```
   Creates test users:
   - Admin: `admin@lms.com` / `admin123`
   - Mentor: `mentor@lms.com` / `mentor123`
   - Student: `student@lms.com` / `student123`

## 🌐 Deployment

### Quick Deployment (5-10 minutes)
See **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** for step-by-step instructions.

### Detailed Deployment Guide
See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for comprehensive hosting options and troubleshooting.

### SiteGround Hosting
See **[SITEGROUND_QUICK_START.md](./SITEGROUND_QUICK_START.md)** for fast SiteGround deployment, or **[SITEGROUND_DEPLOYMENT.md](./SITEGROUND_DEPLOYMENT.md)** for detailed guide.

### Recommended Hosting
- **Frontend**: [Vercel](https://vercel.com) (free, excellent Next.js support) or SiteGround
- **Backend**: [Railway](https://railway.app) or [Render](https://render.com) (free tiers available)

## 📚 Documentation

- [Frontend README](./mentorship-club-website/README.md) - Frontend setup and details
- [Backend README](./backend/README.md) - Backend API documentation
- [API Quick Start](./backend/API_QUICK_START.md) - Quick API reference

## ⚠️ Important Notes

### Current Limitations
- **In-Memory Storage**: Backend currently uses in-memory storage
  - Data is lost on server restart
  - Not suitable for production with real users
  - Consider integrating a database (MongoDB, PostgreSQL) for production

### Environment Variables

**Backend** (create `backend/.env`):
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend** (create `mentorship-club-website/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS 4

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs (password hashing)

## 📝 Features

- User authentication (Admin, Mentor, Student roles)
- Course management
- Student-Mentor matching
- Progress tracking
- Messaging system
- Internship applications

## 🔒 Security Notes

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for frontend-backend communication
- Environment variables for sensitive data

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For deployment help, see the deployment guides:
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Fast deployment
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed guide

---

**Ready to deploy?** Start with [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) 🚀

