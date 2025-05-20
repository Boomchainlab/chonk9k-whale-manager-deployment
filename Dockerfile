# Stage 1: Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM alpine:3.21

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Install runtime dependencies
RUN apk add --no-cache nodejs npm

# Clean up unnecessary files
RUN rm -rf /var/cache/apk/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Set environment variables
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
