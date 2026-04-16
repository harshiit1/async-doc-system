# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "serve", "-s", "dist", "-l", "$PORT"]
