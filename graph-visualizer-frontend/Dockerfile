# Build stage
FROM node:20.19-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Angular app for production
RUN npm run build

# Runtime stage with nginx
FROM nginx:alpine

# Copy the built app to nginx
COPY --from=builder /app/dist/graph-visualizer-frontend/browser/ /usr/share/nginx/html

# Copy custom nginx config (optional, see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]