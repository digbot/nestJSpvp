# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built app using NGINX
FROM nginx:alpine

# Copy the build output to NGINX's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 81 instead of the default port 80
EXPOSE 81

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
