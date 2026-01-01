# API Quick Start Guide

## Base URL
```
http://localhost:5000
```

## Quick Test Endpoints

### 1. Check if server is running
```
GET http://localhost:5000/api/health
```

### 2. Get API information
```
GET http://localhost:5000/
```

### 3. View all public courses
```
GET http://localhost:5000/api/courses
```

## Getting Started

### Step 1: Create a User (Signup)
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "student"
}
```

**Available roles:** `admin`, `mentor`, `student`

### Step 2: Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response will include a `token`** - save this for authenticated requests!

### Step 3: Use the Token
Add to request headers:
```
Authorization: Bearer <your-token-here>
```

## Common Endpoints by Role

### Student Endpoints
- `GET /api/student/courses` - View enrolled courses
- `POST /api/student/courses/:id/enroll` - Enroll in a course
- `GET /api/student/mentor` - View assigned mentor
- `GET /api/student/progress` - View progress

### Mentor Endpoints
- `GET /api/mentor/students` - View assigned students
- `GET /api/mentor/courses` - View your courses
- `POST /api/mentor/courses` - Create a course

### Admin Endpoints
- `GET /api/admin/users` - View all users
- `GET /api/admin/activities` - View platform activities
- `GET /api/admin/reports` - Generate reports

## Testing with Sample Data

Run the seed script to create test users:
```bash
npm run seed
```

This creates:
- **Admin**: admin@lms.com / admin123
- **Mentor**: mentor@lms.com / mentor123
- **Student**: student@lms.com / student123

## Using Postman or Browser

### Browser Testing
1. Open browser and go to: `http://localhost:5000/`
2. You'll see all available endpoints

### Postman/Thunder Client
1. Create a new request
2. Set method (GET, POST, etc.)
3. Enter URL: `http://localhost:5000/api/[endpoint]`
4. For POST requests, add JSON body
5. For protected routes, add header: `Authorization: Bearer <token>`

## Example: Complete Flow

1. **Signup as Student**
   ```
   POST /api/auth/signup
   Body: { "name": "Jane", "email": "jane@test.com", "password": "test123", "phone": "123", "role": "student" }
   ```

2. **Login**
   ```
   POST /api/auth/login
   Body: { "email": "jane@test.com", "password": "test123" }
   ```
   Copy the `token` from response

3. **Browse Courses**
   ```
   GET /api/courses
   ```

4. **Enroll in Course** (use token from step 2)
   ```
   POST /api/student/courses/1/enroll
   Header: Authorization: Bearer <your-token>
   ```

## Troubleshooting

### "Route not found"
- Check the URL is correct
- All API routes start with `/api/`
- Visit `http://localhost:5000/` to see all available routes

### "Unauthorized" or "Token is not valid"
- Make sure you're logged in
- Check the token is in the Authorization header
- Format: `Authorization: Bearer <token>` (with space after "Bearer")

### "Access denied"
- Check your user role matches the required role for the endpoint
- Some routes require specific roles (admin, mentor, or student)

