# donjonChaton

Installation de packages recquis :
npm i jsonwebtoken => pour l'authent
npm i bcryptjs => pour l'authent
npm i dotenv => pour la gestion du fichier env
npm i vitest => pour les tests
npm i -D @vitest/coverage-v8 => pour le coverage des tests

créer le .env
DATABASE_URL="postgres://postgres:postgres@localhost:5432/kittendungeon"
PORT=4000
TOKEN=1cPh4ZPlC3Sb2M5L6gBi8J7TttTFCFTGdEqhDIUde36ilB4hkCo07YrffxC0m23W677H432LzFWi9ZxA6CzZ

Commandes disponibles :
npm run create_database permet de créer la structure de la database
npm run init_database permet d'alimenter des données principales de paramétrage
npm run start_backend permet de lancer le serveur backend
npm run start_frontend permet de lancer le serveur front
npm test permet d'exécuter les tests unitaires
npm run coverage permet de réaliser la couverture de tests

Structure du projet:(C'était la structure initial mais j'ai eu du mal avec le serveur coté front il arrivait pas a recup le css du coup )

donjonChaton/

├── Backend/
│   ├── controllers/         # Logique métier
│   ├── models/              # Modèles de données
│   ├── routes/              # Définition des routes API
│   ├── server.js            # Serveur backend
├── docs/
│   ├── donjon & chaton.png      #MLD
│   ├── donjonChaton.drawio.png  #MCD
├── Frontend/
│   ├── html/                # Fichiers HTML
│   ├── style/               # Fichiers CSS
│   ├── illustration/        # Images et illustrations
│   ├── script.js            # Fichier JavaScript principal
├── .env                     # Variables d'environnement
├── [package.json] # Dépendances et scripts
├── [README.md] # Documentation du projet

