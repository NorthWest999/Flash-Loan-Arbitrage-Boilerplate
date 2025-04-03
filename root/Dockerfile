# Nutze ein Node.js-Image
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere alles rein
COPY . .

# Wechsel in bots/ und installiere Abhängigkeiten
WORKDIR /app/bots
RUN npm install

# Setze Environment auf Production
ENV NODE_ENV=production

# Starte über PM2
CMD ["pm2-runtime", "../config/ecosystem.config.js"]
