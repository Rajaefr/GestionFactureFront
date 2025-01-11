# Étape 1 : Construction de l'application React
FROM node:22.12.0-alpine AS build

# Définir le répertoire de travail
WORKDIR /GEST-FACT

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers de l'application
COPY . ./

# Construire l'application React
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:stable-alpine

# Copier les fichiers de build générés par React vers Nginx
COPY --from=build /GEST-FACT/build /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
