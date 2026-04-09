FROM node:18-alpine AS base
WORKDIR /app

FROM base AS production
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.cjs"]
