#!/bin/bash

echo "🔧 Initialisiere Projekt-Setup..."

# Node.js & npm check
if ! command -v node &> /dev/null
then
    echo "❌ Node.js nicht gefunden. Bitte installiere es zuerst."
    exit
fi

# Globale Tools installieren
echo "📦 Installiere globale Tools (pm2)..."
npm install -g pm2

# Installiere Projekt-Abhängigkeiten
echo "📂 Wechsle in bots/ und installiere Node-Pakete..."
cd bots
npm install
cd ..

# Optional: PM2 Setup starten (nur falls ecosystem.config.js da ist)
echo "🚀 Starte pm2..."
pm2 start config/ecosystem.config.js || echo "⚠️ Konnte PM2 nicht starten – prüfe config/ecosystem.config.js"

echo "✅ Installation abgeschlossen!"
