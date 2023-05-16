# ---- Build Stage ----
FROM node:16-alpine AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Create the pnpm directory and set the PNPM_HOME environment variable
RUN mkdir -p ~/.pnpm
ENV PNPM_HOME /root/.pnpm

# Add the pnpm global bin to the PATH
ENV PATH /root/.pnpm/bin:$PATH

# Set the working directory in the container to /app/console
WORKDIR /app/console

# Copy pnpm-lock.yaml (or package.json and shrinkwrap.yaml) into the directory /app in the container
COPY console/package.json console/pnpm-lock.yaml ./

# Set the working directory in the container to /app
WORKDIR /app

# Install global dependencies
RUN npm install -g ember-cli pnpm 

# Copy the dependency directories into the container
COPY packages/ember-ui ./packages/ember-ui
COPY packages/ember-core ./packages/ember-core
COPY packages/fleetops-engine ./packages/fleetops-engine
COPY packages/fleetops-data ./packages/fleetops-data
COPY packages/dev-engine ./packages/dev-engine
COPY packages/storefront-engine ./packages/storefront-engine
COPY packages/fleetbase-extensions-indexer ./packages/fleetbase-extensions-indexer

# Set the working directory in the container to /app/packages
WORKDIR /app/packages

# Install dependencies
RUN cd ember-ui && pnpm install && cd ../ember-core && pnpm install && cd ../fleetops-engine && pnpm install && cd ../fleetops-data && pnpm install && cd ../dev-engine && pnpm install && cd ../storefront-engine && pnpm install && cd ../fleetbase-extensions-indexer && pnpm install

# Set the working directory in the container to /app/console
WORKDIR /app/console

# Install app dependencies
RUN pnpm install

# Copy the console directory contents into the container at /app/console
COPY console .

# Build the application
RUN ember build

# ---- Serve Stage ----
FROM nginx:alpine

# Copy the built app to our served directory
COPY --from=builder /app/console/dist /usr/share/nginx/html

# Expose the port nginx is bound to
EXPOSE 4200

# Use custom nginx.conf
COPY console/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]