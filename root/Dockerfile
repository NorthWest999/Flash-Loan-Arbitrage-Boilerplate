# Use a smaller Node.js image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the working directory to /app/bots
WORKDIR /app/bots

# Set environment to production
ENV NODE_ENV=production

# Start the application using PM2
CMD ["pm2-runtime", "../config/ecosystem.config.js"]
