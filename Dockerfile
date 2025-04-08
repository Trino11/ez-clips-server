# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable for the port
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]