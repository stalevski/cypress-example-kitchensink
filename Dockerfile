# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/playwright:v1.60.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .

EXPOSE 8080

ENV REUSE_SERVER=1
ENV BASE_URL=http://localhost:8080
CMD ["npx", "start-server-and-test", "start", "http://localhost:8080/todo", "test"]
