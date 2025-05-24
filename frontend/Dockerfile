FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

CMD [ "npm", "start" ]