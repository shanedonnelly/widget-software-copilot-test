# Widget Software Copilot Test

Projet de test pour intégrer un scraper de contenu web via trois approches :
1. **Widget React visible** (bulle en bas à droite) — l'utilisateur autorise la lecture puis envoie le contenu
2. **Script invisible (smart)** — envoie automatiquement du markdown sémantique toutes les 5 secondes (utilise readability + d2m)
3. **Script invisible (dumb)** — envoie les métadonnées + le HTML brut toutes les 5 secondes (aucune dépendance, JS pur)

---

## Architecture

```
Port 9000 — Widget React (vite dev server)
Port 9001 — Fake site (python3 http.server)
Port 9002 — Backend FastAPI (uvicorn)
Port 9003 — Widget dist (python3 http.server)
Port 9004 — Scraper script dist (python3 http.server)
Port 9005 — Dumb scraper (python3 http.server)
```

---

## Installation

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### 2. Widget React

```bash
cd react-embeddable-widget
npm install
```

### 3. Script invisible (smart)

```bash
cd scraper-script
npm install
```

### 4. Script invisible (dumb)

Aucune installation nécessaire — c'est du JS pur.

---

## Lancement

Ouvrir **6 terminaux** :

### Terminal 1 — Backend FastAPI

```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 9002 --reload
```

### Terminal 2 — Fake site

```bash
cd fake-site
python3 -m http.server 9001
```

### Terminal 3 — Widget React (dev mode)

```bash
cd react-embeddable-widget
npm run dev
```

### Terminal 4 — Widget build + serve (pour intégration dans d'autres sites)

```bash
cd react-embeddable-widget
npm run build:widget
cd dist && python3 -m http.server 9003
```

### Terminal 5 — Script invisible (smart) build + serve

```bash
cd smart-scraper
npm run build:dev
cd dist && python3 -m http.server 9004
```

### Terminal 6 — Script invisible (dumb) serve

```bash
cd dumb-scraper
python3 -m http.server 9005
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

Ajouter **avant `</body>`** dans `fake-site/index.html` :
```html
<script async src="http://localhost:9003/widget.js" data-client-key="test-key"></script>
```
Puis ouvrir `http://localhost:9001` et utiliser le widget.

### Test 3 : Script invisible (smart) sur le fake site

Ajouter **avant `</body>`** dans `fake-site/index.html` :
```html
<script async src="http://localhost:9004/scraper.js" data-scraper data-backend-url="http://localhost:9002/api/content"></script>
```
Le script envoie le contenu markdown toutes les 5 secondes.

### Test 4 : Script invisible (dumb) sur le fake site

Ajouter **avant `</body>`** dans `fake-site/index.html` :
```html
<script async src="http://localhost:9005/scraper.js" data-scraper data-backend-url="http://localhost:9002/api/content"></script>
```
Le script envoie les métadonnées + le HTML brut toutes les 5 secondes.

### Test 5 : Tout en même temps

Ajouter les trois balises `<script>` dans le fake site pour les tester simultanément.

---

## Intégration dans un autre projet web

**Widget visible** — ajouter avant `</body>` :
```html
<script async src="http://VOTRE_HOST:9003/widget.js" data-client-key="VOTRE_CLE"></script>
```

**Script invisible (smart)** :
```html
<script async src="http://VOTRE_HOST:9004/scraper.js" data-scraper data-backend-url="http://VOTRE_HOST:9002/api/content"></script>
```

**Script invisible (dumb)** :
```html
<script async src="http://VOTRE_HOST:9005/scraper.js" data-scraper data-backend-url="http://VOTRE_HOST:9002/api/content"></script>
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
├── scraper-script/             # Script invisible (smart, avec deps)
│   ├── src/scraper.js
│   └── dist/                   # Build du script
├── dumb-scraper/               # Script invisible (dumb, JS pur)
│   └── scraper.js
└── README.md
```
