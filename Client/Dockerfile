# Use the official Node.js image to build the React app
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app (outputs to /app/dist)
RUN npm run build

# Use a lightweight Nginx image to serve the app
FROM nginx:latest

# Copy the React build output (dist folder) to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
