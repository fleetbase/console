# ---- Build Stage ----
FROM node:16.20-alpine AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Create the pnpm directory and set the PNPM_HOME environment variable
RUN mkdir -p ~/.pnpm
ENV PNPM_HOME /root/.pnpm

# Add the pnpm global bin to the PATH
ENV PATH /root/.pnpm/bin:$PATH

# Copy pnpm-lock.yaml (or package.json and shrinkwrap.yaml) into the directory /app in the container
COPY console/package.json console/pnpm-lock.yaml ./

# Install global dependencies
RUN npm install -g ember-cli pnpm 

# Install app dependencies
RUN pnpm install

# Copy the console directory contents into the container at /app
COPY console .

# Build the application
RUN pnpm build

# ---- Serve Stage ----
FROM nginx:alpine

# Copy the built app to our served directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port nginx is bound to
EXPOSE 4200

# Use custom nginx.conf
COPY console/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]