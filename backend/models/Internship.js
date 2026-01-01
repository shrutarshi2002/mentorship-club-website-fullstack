// In-memory internship storage
let internships = [];
let internshipIdCounter = 1;

class Internship {
  constructor(data) {
    this.id = internshipIdCounter++;
    this.title = data.title;
    this.description = data.description;
    this.company = data.company;
    this.location = data.location;
    this.studentId = data.studentId;
    this.mentorId = data.mentorId;
    this.status = data.status || 'pending'; // 'pending', 'approved', 'rejected', 'active', 'completed'
    this.appliedAt = new Date();
    this.approvedAt = data.approvedAt || null;
    this.createdAt = new Date();
  }

  static create(data) {
    const internship = new Internship(data);
    internships.push(internship);
    return internship;
  }

  static findById(id) {
    return internships.find(i => i.id === parseInt(id));
  }

  static findAll() {
    return internships;
  }

  static findByStudent(studentId) {
    return internships.filter(i => i.studentId === parseInt(studentId));
  }

  static findByMentor(mentorId) {
    return internships.filter(i => i.mentorId === parseInt(mentorId));
  }

  static update(id, data) {
    const internship = internships.find(i => i.id === parseInt(id));
    if (internship) {
      Object.assign(internship, data);
      return internship;
    }
    return null;
  }
}

module.exports = Internship;

