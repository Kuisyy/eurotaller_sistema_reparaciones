FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponer el puerto que usa Vite por defecto
EXPOSE 5173

# Modificar el comando para permitir conexiones desde el host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]