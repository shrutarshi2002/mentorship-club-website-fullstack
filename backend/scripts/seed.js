const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');

// Seed function to create initial data
const seed = async () => {
  try {
    console.log('Seeding database...');

    // Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = User.create({
      name: 'Admin User',
      email: 'admin@lms.com',
      password: adminPassword,
      phone: '1234567890',
      role: 'admin',
      isApproved: true,
      isActive: true
    });
    console.log('✓ Admin created:', admin.email);

    // Create Mentor
    const mentorPassword = await bcrypt.hash('mentor123', 10);
    const mentor = User.create({
      name: 'John Mentor',
      email: 'mentor@lms.com',
      password: mentorPassword,
      phone: '1234567891',
      role: 'mentor',
      isApproved: true,
      isActive: true
    });
    console.log('✓ Mentor created:', mentor.email);

    // Create Student
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = User.create({
      name: 'Jane Student',
      email: 'student@lms.com',
      password: studentPassword,
      phone: '1234567892',
      role: 'student',
      isApproved: true,
      isActive: true,
      mentorId: mentor.id
    });
    console.log('✓ Student created:', student.email);

    // Assign student to mentor
    mentor.assignedStudents.push(student.id);

    // Create Course
    const course = Course.create({
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
      mentorId: mentor.id,
      category: 'Technology',
      difficulty: 'beginner',
      ageRange: '13-18',
      isPublic: true,
      price: 0,
      syllabus: [
        'Week 1: HTML Basics',
        'Week 2: CSS Styling',
        'Week 3: JavaScript Fundamentals',
        'Week 4: Building Your First Website'
      ],
      schedule: [
        { day: 'Monday', time: '10:00 AM', duration: '1 hour' },
        { day: 'Wednesday', time: '10:00 AM', duration: '1 hour' }
      ]
    });
    console.log('✓ Course created:', course.title);

    // Enroll student in course
    Course.enrollStudent(course.id, student.id);

    console.log('\n✅ Seeding completed!');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@lms.com, Password: admin123');
    console.log('Mentor - Email: mentor@lms.com, Password: mentor123');
    console.log('Student - Email: student@lms.com, Password: student123');
  } catch (error) {
    console.error('Error seeding:', error);
  }
};

// Run seed if called directly
if (require.main === module) {
  seed();
}

module.exports = seed;

