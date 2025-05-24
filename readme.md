# Keysmanager

## 🚀 Übersicht
Eine moderne Full-Stack-Anwendung zur Schlüsselverwaltung mit PHP-Backend und React-Frontend.

## 🏗 Projektstruktur
- `/api` - PHP-Backend API
- `/frontend` - React Frontend Anwendung
- `/sql` - SQL-Skripte und Datenbankmigrationen

## 🛠 Technologie-Stack
### Backend
- PHP 8.4
- PHPUnit für Tests
- Composer für Paketmanagement
- Wichtige Pakete:
  - PHPSpreadsheet
  - phpdotenv
  - und weitere...

### Frontend
- React 19.0.0
- Next.js 15.3.1
- TypeScript
- Tailwind CSS
- Shadcn/ui

## 📋 Voraussetzungen

### Mit Docker (Empfohlen)
- [Docker](https://www.docker.com/get-started/) (Version 20.10 oder höher)
- [Docker Compose](https://docs.docker.com/compose/install/) (Version 2.0 oder höher)

### Ohne Docker
- [Node.js](https://nodejs.org/) (Version 18 oder höher)
- [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)
- [PHP](https://www.php.net/) (Version 8.4 oder höher)
- [Composer](https://getcomposer.org/)
- MySQL/MariaDB Server

## 🚀 Installation und Start

### Mit Docker Compose (Empfohlen)

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd KeysManager
   ```

2. **Docker Container starten:**
   ```bash
   docker-compose up -d
   ```

3. **Anwendung öffnen:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - PhpMyAdmin: [http://localhost:8080](http://localhost:8080)

## 🐳 Docker Services

Die Anwendung verwendet folgende Docker Services:

- **api** - PHP-Backend (Port 8000)
- **frontend** - Next.js Frontend (Port 3000)
- **db** - MariaDB Database (Port 3306)

## 🔧 Nützliche Befehle

### Docker
```bash
# Services stoppen
docker-compose down

# Services neu starten
docker-compose restart

# Logs anzeigen
docker-compose logs -f

# Einzelne Services verwalten
docker-compose up -d database
docker-compose stop frontend
```

## 🗄️ Datenbank

Die Anwendung verwendet MariaDB als Datenbank. Die SQL-Skripte befinden sich im `/sql` Verzeichnis:

- `create_tables.sql` - Initiale Datenbankstruktur
- `seed_data.sql` - Einfügen der Beispieldaten

## 📝 API-Dokumentation

Die API-Dokumentation ist verfügbar unter:
- [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger/OpenAPI)