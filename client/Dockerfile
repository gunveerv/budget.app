# Use an official Node.js runtime as a parent image
FROM node:16.20.1

# Set the working directory in the container
WORKDIR /usr/src/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use a bind mount to mount the client directory from the host into the container
VOLUME /usr/src/app/client

# Define the command to run your app
CMD ["yarn", "start"]