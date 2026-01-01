// In-memory course storage
let courses = [];
let courseIdCounter = 1;

class Course {
  constructor(data) {
    this.id = courseIdCounter++;
    this.title = data.title;
    this.description = data.description;
    this.mentorId = data.mentorId;
    this.category = data.category;
    this.difficulty = data.difficulty; // 'beginner', 'intermediate', 'advanced'
    this.ageRange = data.ageRange; // e.g., '13-18'
    this.isPublic = data.isPublic !== undefined ? data.isPublic : true;
    this.price = data.price || 0;
    this.syllabus = data.syllabus || [];
    this.schedule = data.schedule || [];
    this.materials = data.materials || []; // PDFs, videos, links
    this.enrolledStudents = data.enrolledStudents || [];
    this.ratings = data.ratings || [];
    this.reviews = data.reviews || []; // Pending admin approval
    this.status = data.status || 'active'; // 'active', 'inactive', 'draft'
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(data) {
    const course = new Course(data);
    courses.push(course);
    return course;
  }

  static findById(id) {
    return courses.find(c => c.id === parseInt(id));
  }

  static findAll() {
    return courses;
  }

  static findByMentor(mentorId) {
    return courses.filter(c => c.mentorId === parseInt(mentorId));
  }

  static findByCategory(category) {
    return courses.filter(c => c.category === category);
  }

  static findByDifficulty(difficulty) {
    return courses.filter(c => c.difficulty === difficulty);
  }

  static findByAgeRange(ageRange) {
    return courses.filter(c => c.ageRange === ageRange);
  }

  static findPublic() {
    return courses.filter(c => c.isPublic && c.status === 'active');
  }

  static update(id, data) {
    const course = courses.find(c => c.id === parseInt(id));
    if (course) {
      Object.assign(course, data);
      course.updatedAt = new Date();
      return course;
    }
    return null;
  }

  static delete(id) {
    const index = courses.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      return courses.splice(index, 1)[0];
    }
    return null;
  }

  static enrollStudent(courseId, studentId) {
    const course = this.findById(courseId);
    if (course && !course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      return course;
    }
    return null;
  }

  static addMaterial(courseId, material) {
    const course = this.findById(courseId);
    if (course) {
      course.materials.push(material);
      return course;
    }
    return null;
  }

  static addReview(courseId, review) {
    const course = this.findById(courseId);
    if (course) {
      course.reviews.push(review);
      return course;
    }
    return null;
  }
}

module.exports = Course;

