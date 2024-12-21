# Dockerfile
FROM node:16

# Instalar herramientas necesarias para compilar dependencias nativas
#RUN apt-get update && apt-get install -y make g++ python3

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias (incluye nativas como bcrypt)
RUN npm install

# Reconstruir bcrypt para el entorno Docker
RUN npm rebuild bcrypt --build-from-source

# Copiar el resto de los archivos del proyecto
COPY . .


# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]


#ejempplo para subir  a dockerhub
#"docker tag ejemplo-k8s-express:latest omaniasdocker/ejemplo-k8s-express:latest"
#"docker push omaniasdocker/ejemplo-k8s-express:latest"