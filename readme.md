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
   git clone https://github.com/Aisser24/KeysManager.git
   cd KeysManager
   ```

2. **Docker Container starten:**
   ```bash
   docker-compose up -d
   ```

3. **Anwendung öffnen:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)

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

Die Backend-API ist unter `http://localhost:8000/api` erreichbar und bietet folgende Endpoints:

### 🔑 Token-Management

#### Alle aktiven Tokens abrufen
```http
GET /api/tokens
```
Gibt eine Liste aller aktiven Tokens zurück.

#### Token-Details abrufen
```http
GET /api/tokens/{id}
```
Gibt Details zu einem spezifischen Token zurück.

#### Neuen Token erstellen
```http
POST /api/tokens
Content-Type: application/json

{
  "token_number": 123,
  "token_type": "Schlüssel",
  "token_description": "Büroschlüssel Raum 101"
}
```

#### Token aktualisieren
```http
PUT /api/tokens/{id}
Content-Type: application/json

{
  "token_number": 124,
  "token_type": "Transponder",
  "token_description": "Aktualisierte Beschreibung"
}
```

#### Token löschen (Soft Delete)
```http
DELETE /api/tokens/{id}
```
Setzt `is_active = 0` und fügt `deleted_date` hinzu.

#### Token-Historie abrufen
```http
GET /api/tokens/{id}/history
```
Zeigt alle Zuweisungen eines Tokens (ausgegeben/zurückgegeben).

#### Verfügbare Token abrufen
```http
GET /api/tokens/available/
```
Gibt alle Tokens zurück, die aktuell nicht zugewiesen sind.

#### Token-Typen abrufen
```http
GET /api/tokens/types/
```
Gibt alle eindeutigen Token-Typen zurück.

### 👥 Mitarbeiter-Management

#### Alle aktiven Mitarbeiter abrufen
```http
GET /api/mitarbeiter
```
Gibt alle Mitarbeiter mit `status = 0` zurück.

#### Mitarbeiter-Details abrufen
```http
GET /api/mitarbeiter/{id}
```

#### Tokens eines Mitarbeiters abrufen
```http
GET /api/mitarbeiter/{id}/tokens
```
Zeigt alle Tokens, die jemals an einen Mitarbeiter ausgegeben wurden (inkl. Historie).

### 📋 Zuweisungen (Assignments)

#### Alle Zuweisungen abrufen
```http
GET /api/assignments
```
Gibt alle Zuweisungen aus der `keyassignments` Tabelle zurück.

#### Aktive Zuweisungen abrufen
```http
GET /api/assignments/active
```
Zeigt alle aktuell ausgegebenen Tokens mit Mitarbeiter- und Token-Details.

#### Token zuweisen
```http
POST /api/assignments
Content-Type: application/json

{
  "mitarbeiter_id": 5,
  "token_id": 1
}
```
Weist einen verfügbaren Token einem Mitarbeiter zu.

#### Token zurückgeben
```http
PUT /api/assignments/return
Content-Type: application/json

{
  "mitarbeiter_id": 5,
  "token_id": 1
}
```
Setzt das `rueckgabedatum` auf das aktuelle Datum.

### 📊 Export

#### Excel-Export aktiver Zuweisungen
```http
GET /api/exports/xlsx
```
Lädt eine Excel-Datei mit allen aktiven Token-Zuweisungen herunter.

### 🧪 Test

#### Test-Endpoint
```http
GET /api/test
```
Einfacher Test-Endpoint zur Überprüfung der API-Funktionalität.

### 🔍 Beispiel-Antworten

**Token-Liste:**
```json
[
  {
    "token_id": 1,
    "token_number": 101,
    "token_type": "Schlüssel",
    "token_description": "Haupteingang",
    "added_date": "2025-05-24 10:30:00"
  }
]
```

**Aktive Zuweisungen:**
```json
[
  {
    "token_id": 1,
    "mitarbeiter_id": 5,
    "ausgabedatum": "2025-05-24",
    "vorname": "Max",
    "nachname": "Mustermann",
    "token_type": "Schlüssel",
    "token_number": 101,
    "token_description": "Haupteingang"
  }
]
```

**Verfügbare Tokens:**
```json
[
  {
    "token_id": 2,
    "token_number": 102,
    "token_type": "Transponder",
    "token_description": "Parkplatz"
  }
]
```

**Token-Historie:**
```json
[
  {
    "mitarbeiter_id": 3,
    "ausgabedatum": "2025-05-20",
    "rueckgabedatum": "2025-05-23"
  },
  {
    "mitarbeiter_id": 5,
    "ausgabedatum": "2025-05-24",
    "rueckgabedatum": null
  }
]
```

### ⚠️ HTTP-Status-Codes

- `200` - Erfolgreich
- `201` - Erfolgreich erstellt
- `400` - Ungültige Anfrage (fehlende Parameter)
- `404` - Ressource nicht gefunden
- `409` - Konflikt (z.B. Token bereits zugewiesen)
- `500` - Server-Fehler

### 🔒 Besonderheiten

- **Soft Delete**: Tokens werden nicht physisch gelöscht, sondern mit `is_active = 0` markiert
- **Eindeutige Zuweisungen**: Ein Token kann nur einem Mitarbeiter gleichzeitig zugewiesen sein
- **Automatische Datumsfelder**: `ausgabedatum` und `rueckgabedatum` werden automatisch gesetzt