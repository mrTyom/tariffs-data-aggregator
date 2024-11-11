# Файл Dockerfile
# Используем Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код приложения
COPY . .

# Экспортируем порт для сервиса
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
