// In-memory user storage (replace with database later)
let users = [];
let userIdCounter = 1;

class User {
  constructor(data) {
    this.id = userIdCounter++;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password; // In production, this should be hashed
    this.phone = data.phone;
    this.role = data.role; // 'admin', 'mentor', 'student'
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.isApproved = data.isApproved !== undefined ? data.isApproved : data.role === 'admin' || data.role === 'student';
    this.mentorId = data.mentorId || null; // For students
    this.assignedStudents = data.assignedStudents || []; // For mentors
    this.socialAuthId = data.socialAuthId || null;
    this.socialAuthProvider = data.socialAuthProvider || null; // 'google', 'facebook'
    this.resetPasswordToken = data.resetPasswordToken || null;
    this.resetPasswordExpire = data.resetPasswordExpire || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(data) {
    const user = new User(data);
    users.push(user);
    return user;
  }

  static findById(id) {
    return users.find(u => u.id === parseInt(id));
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static findBySocialAuth(provider, socialId) {
    return users.find(u => 
      u.socialAuthProvider === provider && u.socialAuthId === socialId
    );
  }

  static findAll() {
    return users;
  }

  static findByRole(role) {
    return users.filter(u => u.role === role);
  }

  static update(id, data) {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      Object.assign(user, data);
      user.updatedAt = new Date();
      return user;
    }
    return null;
  }

  static delete(id) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }

  static assignMentorToStudent(studentId, mentorId) {
    const student = this.findById(studentId);
    const mentor = this.findById(mentorId);
    
    if (student && mentor && mentor.role === 'mentor') {
      student.mentorId = mentorId;
      if (!mentor.assignedStudents.includes(studentId)) {
        mentor.assignedStudents.push(studentId);
      }
      return { student, mentor };
    }
    return null;
  }

  static getAssignedStudents(mentorId) {
    const mentor = this.findById(mentorId);
    if (mentor && mentor.role === 'mentor') {
      return mentor.assignedStudents.map(id => this.findById(id)).filter(Boolean);
    }
    return [];
  }
}

module.exports = User;

