# Этап 1: сборка React приложения
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ARG позволяет передать URL бэкенда при сборке
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Этап 2: сервинг через nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Конфиг nginx для SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
