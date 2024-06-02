# Etapa 1: Construir la aplicación
FROM node:14 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Instalar las dependencias y construir la aplicación
RUN npm install
RUN npm run build

# Etapa 2: Servir la aplicación con Node.js y Express
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos construidos y el servidor Express
COPY --from=build /app/build ./build
COPY server.js ./

# Instalar las dependencias de producción
RUN npm install express

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
