// In-memory progress storage
let progressRecords = [];
let progressIdCounter = 1;

class Progress {
  constructor(data) {
    this.id = progressIdCounter++;
    this.studentId = data.studentId;
    this.courseId = data.courseId;
    this.assignmentId = data.assignmentId || null;
    this.completionRate = data.completionRate || 0; // 0-100
    this.score = data.score || null;
    this.feedback = data.feedback || '';
    this.grade = data.grade || null;
    this.submittedAt = data.submittedAt || new Date();
    this.gradedAt = data.gradedAt || null;
    this.status = data.status || 'in-progress'; // 'in-progress', 'completed', 'graded'
  }

  static create(data) {
    const progress = new Progress(data);
    progressRecords.push(progress);
    return progress;
  }

  static findById(id) {
    return progressRecords.find(p => p.id === parseInt(id));
  }

  static findByStudent(studentId) {
    return progressRecords.filter(p => p.studentId === parseInt(studentId));
  }

  static findByCourse(courseId) {
    return progressRecords.filter(p => p.courseId === parseInt(courseId));
  }

  static findByStudentAndCourse(studentId, courseId) {
    return progressRecords.find(p => 
      p.studentId === parseInt(studentId) && p.courseId === parseInt(courseId)
    );
  }

  static update(id, data) {
    const progress = progressRecords.find(p => p.id === parseInt(id));
    if (progress) {
      Object.assign(progress, data);
      return progress;
    }
    return null;
  }
}

module.exports = Progress;

