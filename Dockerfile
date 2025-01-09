# Step 1: Build React App
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Server With Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *

# Copie o build do React para o diretório padrão do Nginx
COPY --from=build /app/dist .

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]