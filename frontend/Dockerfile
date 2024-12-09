# Etapa 1: Construirea aplicației React
FROM node:20 as build

# Setează directorul de lucru în container
WORKDIR /app

# Copiază fișierele de configurare pentru npm/yarn
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază restul codului aplicației
COPY . .

# Construiește aplicația pentru producție
RUN npm run build

# Etapa 2: Servirea aplicației React cu Nginx
FROM nginx:1.21

# Copiază fișierele construite din etapa de build în Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expune portul 80 pentru servirea aplicației
EXPOSE 80

# Pornește Nginx
CMD ["nginx", "-g", "daemon off;"]
