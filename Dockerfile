# Usa una imagen base de Node.js para construir la app
FROM node:18 as builder

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./ 
COPY . .

# Instala las dependencias y genera el build
RUN npm install
RUN npm run build

# Usa una imagen ligera de Nginx para servir el sitio
FROM nginx:alpine

# Copia los archivos estáticos generados por Next.js
COPY --from=builder /app/.next/static /usr/share/nginx/html/static
COPY --from=builder /app/public /usr/share/nginx/html

# Copia los archivos generados por SSR
COPY --from=builder /app/.next/server /usr/share/nginx/html/server

# Copia una configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
