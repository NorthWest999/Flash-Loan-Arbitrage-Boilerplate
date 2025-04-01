#!/bin/bash
# Startet alle Dienste (Bots und Dashboard) mit PM2
PROJECT_DIR="$(dirname "$0")/.."
cd "$PROJECT_DIR"

echo "Starte alle Anwendungen mit PM2..."
pm2 start config/ecosystem.config.js --same-directory
