# Widget Software Copilot Test

Projet de test pour intégrer un scraper de contenu web via deux approches :
1. **Widget React visible** (bulle en bas à droite) — l'utilisateur autorise la lecture puis envoie le contenu
2. **Script invisible** — envoie automatiquement le contenu toutes les 5 secondes

Les deux utilisent `@mozilla/readability` + `dom-to-semantic-markdown` pour parser le DOM en markdown sémantique de qualité, et envoient le résultat à un backend FastAPI unique.

---

## Architecture

```
Port 9000 — Widget React (vite dev server)
Port 9001 — Fake site (python http.server)
Port 9002 — Backend FastAPI (uvicorn)
Port 9003 — Widget dist (http-server, pour le build)
Port 9004 — Scraper script dist (http-server)
```

---

## Installation

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### 2. Widget React

```bash
cd react-embeddable-widget
pnpm install
```

### 3. Script invisible

```bash
cd scraper-script
npm install
```

---

## Lancement

Ouvrir **5 terminaux** :

### Terminal 1 — Backend FastAPI

```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 9002 --reload
```

### Terminal 2 — Fake site

```bash
cd fake-site
python -m http.server 9001
```

### Terminal 3 — Widget React (dev mode)

```bash
cd react-embeddable-widget
pnpm dev
```

### Terminal 4 — Widget build + serve (pour intégration dans d'autres sites)

```bash
cd react-embeddable-widget
pnpm build:widget
pnpm serve:widget
```

### Terminal 5 — Script invisible build + serve

```bash
cd scraper-script
npm run build:dev
npm run serve
```

---

## Tester

### Test 1 : Widget React en dev

1. Ouvrir `http://localhost:9000`
2. Cliquer la bulle 🤖 en bas à droite
3. Cliquer "Autoriser la lecture"
4. Cliquer "Envoyer le contenu"
5. Vérifier les logs du backend (terminal 1)
6. Vérifier qu'un fichier `.md` a été créé dans `backend/received_data/`

### Test 2 : Widget intégré sur le fake site

1. Ouvrir `fake-site/index.html` et ajouter **avant `</body>`** :
   ```html
   <script async src="http://localhost:9003/widget.js" data-client-key="test-key"></script>
   ```
2. Ouvrir `http://localhost:9001`
3. Utiliser le widget comme au Test 1
4. Vérifier les logs et les fichiers reçus

### Test 3 : Script invisible sur le fake site

1. Ouvrir `fake-site/index.html` et ajouter **avant `</body>`** :
   ```html
   <script async src="http://localhost:9004/scraper.js" data-scraper data-backend-url="http://localhost:9002/api/content"></script>
   ```
2. Ouvrir `http://localhost:9001`
3. Sans rien faire, le script envoie le contenu toutes les 5 secondes
4. Vérifier les logs du backend et les fichiers dans `backend/received_data/`

### Test 4 : Les deux en même temps

Ajouter les deux balises `<script>` dans le fake site pour les tester simultanément.

---

## Intégration dans un autre projet web

Pour intégrer le **widget visible** dans n'importe quel site, ajouter cette balise avant `</body>` :

```html
<script async src="http://VOTRE_HOST:9003/widget.js" data-client-key="VOTRE_CLE"></script>
```

Pour intégrer le **script invisible** :

```html
<script async src="http://VOTRE_HOST:9004/scraper.js" data-scraper data-backend-url="http://VOTRE_HOST:9002/api/content"></script>
```

---

## Structure du projet

```
.
├── backend/                    # FastAPI backend
│   ├── main.py                 # API endpoint
│   ├── requirements.txt
│   └── received_data/          # Fichiers markdown reçus (créé auto)
├── fake-site/                  # Faux site web de test
│   └── index.html
├── react-embeddable-widget/    # Widget React (MakerKit)
│   ├── src/widget/             # Code du widget
│   ├── dist/                   # Build du widget
│   └── test/                   # Page de test interne
├── scraper-script/             # Script invisible
│   ├── src/scraper.js
│   └── dist/                   # Build du script
└── README.md
```
