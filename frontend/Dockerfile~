# Build stage
FROM 24.15.0-alpine3.23 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "serve -s dist -l $PORT"]
