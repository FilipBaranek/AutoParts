# Use Node.js image
FROM node:18

# Install ping utility
RUN apt-get update && apt-get install -y iputils-ping && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY ./src/server.js /app/server.js
COPY . .

# Expose the necessary port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
