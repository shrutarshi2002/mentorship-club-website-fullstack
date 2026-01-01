// In-memory message storage
let messages = [];
let messageIdCounter = 1;

class Message {
  constructor(data) {
    this.id = messageIdCounter++;
    this.senderId = data.senderId;
    this.receiverId = data.receiverId;
    this.courseId = data.courseId || null;
    this.subject = data.subject || '';
    this.content = data.content;
    this.isRead = false;
    this.createdAt = new Date();
  }

  static create(data) {
    const message = new Message(data);
    messages.push(message);
    return message;
  }

  static findById(id) {
    return messages.find(m => m.id === parseInt(id));
  }

  static findByUser(userId) {
    return messages.filter(m => 
      m.senderId === parseInt(userId) || m.receiverId === parseInt(userId)
    );
  }

  static findByConversation(userId1, userId2) {
    return messages.filter(m => 
      (m.senderId === parseInt(userId1) && m.receiverId === parseInt(userId2)) ||
      (m.senderId === parseInt(userId2) && m.receiverId === parseInt(userId1))
    ).sort((a, b) => a.createdAt - b.createdAt);
  }

  static markAsRead(id) {
    const message = this.findById(id);
    if (message) {
      message.isRead = true;
      return message;
    }
    return null;
  }
}

module.exports = Message;

