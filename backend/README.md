# LMS Backend API

A comprehensive Learning Management System backend built with Node.js and Express.

## Features

- **Authentication & Authorization**
  - User signup and login (Admin, Mentor, Student)
  - JWT-based authentication
  - Forgot password functionality
  - Role-based access control

- **Admin Dashboard**
  - User management (CRUD operations)
  - Mentor approval/rejection
  - Mentor-student assignment
  - Course management
  - Activity tracking
  - Reports generation
  - Review approval

- **Mentor Dashboard**
  - View assigned students
  - Create and manage courses
  - Upload course materials (PDFs, videos, links)
  - Grade student work
  - Messaging with students
  - Track student progress

- **Student Dashboard**
  - Browse and enroll in courses
  - View assigned mentor
  - Submit assignments
  - Track progress
  - Messaging with mentor
  - Apply for internships

- **Course Management**
  - Public/private courses
  - Course catalog with filters
  - Course reviews (pending admin approval)
  - Syllabus and schedule management

- **Communication**
  - Secure messaging between mentors and students
  - Conversation history

- **Progress Tracking**
  - Student progress monitoring
  - Assignment submission and grading
  - Completion rates

- **Internship Management**
  - Student internship applications
  - Mentor/Admin approval workflow

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Admin Routes (requires admin role)
- `GET /api/admin/users` - Get all users (with filters)
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/admin/mentors/:mentorId/approve` - Approve mentor
- `POST /api/admin/assign-mentor` - Assign mentor to student
- `GET /api/admin/courses` - Get all courses
- `GET /api/admin/activities` - Get platform activities
- `GET /api/admin/reports` - Generate reports
- `PUT /api/admin/courses/:id/reviews/:reviewId/approve` - Approve course review

### Mentor Routes (requires mentor role)
- `GET /api/mentor/students` - Get assigned students
- `GET /api/mentor/students/:studentId/progress` - Get student progress
- `GET /api/mentor/courses` - Get mentor's courses
- `POST /api/mentor/courses` - Create course
- `PUT /api/mentor/courses/:id` - Update course
- `DELETE /api/mentor/courses/:id` - Delete course
- `POST /api/mentor/courses/:id/materials` - Add course material
- `POST /api/mentor/progress/:id/grade` - Grade student work
- `GET /api/mentor/messages` - Get messages
- `POST /api/mentor/messages` - Send message to student

### Student Routes (requires student role)
- `GET /api/student/courses` - Get enrolled courses
- `POST /api/student/courses/:id/enroll` - Enroll in course
- `GET /api/student/mentor` - Get assigned mentor
- `GET /api/student/progress` - Get student progress
- `POST /api/student/assignments/:courseId/submit` - Submit assignment
- `GET /api/student/messages` - Get messages
- `POST /api/student/messages` - Send message to mentor

### Course Routes
- `GET /api/courses` - Get all public courses (with filters)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/reviews` - Add course review (requires auth)

### Message Routes (requires auth)
- `GET /api/messages/conversation/:userId` - Get conversation with user
- `PUT /api/messages/:id/read` - Mark message as read

### Progress Routes (requires auth)
- `PUT /api/progress/:id` - Update progress

### Internship Routes (requires auth)
- `GET /api/internships` - Get internships (filtered by role)
- `POST /api/internships` - Create internship application (student only)
- `PUT /api/internships/:id/approve` - Approve internship (admin/mentor)
- `PUT /api/internships/:id/reject` - Reject internship (admin/mentor)

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## Authentication

Include JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## User Roles

- **admin**: Full access to all features
- **mentor**: Can manage courses, students, and provide feedback
- **student**: Can enroll in courses, submit work, and communicate with mentor

## Data Storage

Currently using in-memory storage. To integrate with a database:
1. Replace model classes with database queries
2. Update controllers to use async/await with database operations
3. Add database connection configuration

## Future Enhancements

- Social media authentication (Google/Facebook)
- Email notifications
- Zoom/Google Meet integration
- File upload handling
- Payment gateway integration
- Discussion forums
- Calendar/scheduling system
- Live streaming integration

## Usage Examples

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "student"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes a JWT token that should be used in subsequent requests.

### Create Course (Mentor)
```bash
POST /api/mentor/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Advanced JavaScript",
  "description": "Learn advanced JavaScript concepts",
  "category": "Programming",
  "difficulty": "advanced",
  "ageRange": "15-18",
  "isPublic": true,
  "price": 0,
  "syllabus": ["Week 1: Closures", "Week 2: Promises"],
  "schedule": [{"day": "Monday", "time": "3:00 PM", "duration": "1 hour"}]
}
```

### Enroll in Course (Student)
```bash
POST /api/student/courses/:courseId/enroll
Authorization: Bearer <token>
```

## Seeding Sample Data

Run the seed script to create sample users and courses:
```bash
npm run seed
```

This creates:
- Admin user (admin@lms.com / admin123)
- Mentor user (mentor@lms.com / mentor123)
- Student user (student@lms.com / student123)
- Sample course

## Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)
- Mentor applications require admin approval
- Course reviews require admin approval before being visible
- Students can only message their assigned mentor
- Mentors can only message their assigned students
- Currently using in-memory storage (data resets on server restart)

