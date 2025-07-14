#!/bin/bash

# Lade Umgebungsvariablen aus .env-Datei
if [ -f ../.env ]; then
  export $(grep -v '^#' ../.env | xargs)
else
  echo "Fehler: .env-Datei nicht gefunden!"
  exit 1
fi

# Konfiguriere Backup-Verzeichnis
BACKUP_DIR='../api/db/backups'

# Führe pg_dump mit Umgebungsvariablen aus
BACKUP_NAME=$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql
pg_dump "postgresql://postgres.${SUPABASE_PROJECT_REF}:${SUPABASE_DB_PASSWORD}@${SUPABASE_HOST}:6543/postgres?sslmode=require" > $BACKUP_NAME

# Überprüfe, ob das Backup erfolgreich war
if [ $? -eq 0 ]; then
  echo "Backup erfolgreich erstellt: $BACKUP_NAME"
else
  echo "Fehler beim Erstellen des Backups!"
  exit 1
fi
