# Use an official Node.js runtime as the base image
FROM node:18

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the TypeScript source code to the container
COPY . .

# Build the TypeScript code
RUN npm run compile

# Expose the port your Apollo GraphQL server listens on (adjust if needed)
EXPOSE 8000

# Define the command to run your Apollo GraphQL server
CMD ["node", "./dist/index.js"]