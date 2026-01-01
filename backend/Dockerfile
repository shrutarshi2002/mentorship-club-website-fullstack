FROM node:18-alpine

WORKDIR /app

# Copy package files from backend directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY backend/ ./

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

