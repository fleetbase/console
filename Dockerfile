# Use official Node.js 16 as parent image
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Create the pnpm directory and set the PNPM_HOME environment variable
RUN mkdir -p ~/.pnpm
ENV PNPM_HOME /root/.pnpm

# Add the pnpm global bin to the PATH
ENV PATH /root/.pnpm/bin:$PATH

# Copy pnpm-lock.yaml (or package.json and shrinkwrap.yaml) into the directory /app in the container
COPY package.json pnpm-lock.yaml ./

# Install app dependencies
RUN npm install -g ember-cli pnpm && pnpm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 4200 for the app
EXPOSE 4200

# Add the node_modules bin to the PATH
ENV PATH /app/node_modules/.bin:$PATH

# Start the ember app
CMD ["ember", "serve"]