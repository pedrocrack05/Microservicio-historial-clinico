# Dockerfile
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript (opcional si usas ts-node)
# RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor en desarrollo
CMD ["npm", "run", "dev"]
