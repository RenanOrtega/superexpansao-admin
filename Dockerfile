# Step 1: Build React App
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./''
RUN npm install
COPY . .
RUN npm run build

# Step 2: Server With Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]