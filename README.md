# Minecraft Wiki Toolkit

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Licence](https://img.shields.io/badge/licence-MIT-green.svg)

> Un wiki Minecraft avancé avec stockage de multiples versions, calculateurs interactifs et générateur de blueprints

## 📋 Table des matières

- [Vision du projet](#vision-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Architecture technique](#architecture-technique)
- [Structure de données](#structure-de-données)
- [Modules du projet](#modules-du-projet)
- [Installation](#installation)
- [Développement](#développement)
- [Contribuer](#contribuer)
- [Feuille de route](#feuille-de-route)
- [Licence](#licence)

## 🔭 Vision du projet

**Minecraft Wiki Toolkit** est conçu pour devenir la référence en matière de documentation et d'outils pour Minecraft, avec un accent particulier sur la compatibilité entre versions. Notre objectif est de créer une plateforme qui :

- Archive et présente les données de toutes les versions de Minecraft de manière claire et accessible
- Fournit des outils interactifs pour optimiser l'expérience de jeu
- Permet la création, le partage et l'optimisation de blueprints de construction
- Offre des calculateurs pour les enchantements, crafts, et stratégies de build

## ✨ Fonctionnalités principales

### 📚 Wiki multi-versions
- Base de données complète de toutes les versions de Minecraft
- Tableaux comparatifs des changements entre versions
- Interface simplifiée pour naviguer à travers l'évolution du jeu
- Documentation détaillée sur chaque bloc, item, mob et mécanique

### 🧮 Calculateurs interactifs
- Optimiseur de builds (calcul de matériaux)
- Simulateur d'enchantements
- Planificateur de crafts (recherche de recettes optimales)
- Calculateur de fermes (taux de génération, efficacité)

### 📐 Système de Blueprints
- Créateur de plans de construction interactif
- Import/export au format .schematic ou .nbt
- Analyse automatique des matériaux nécessaires
- Suggestions d'optimisation basées sur les mécaniques de jeu
- Compatibilité cross-version pour vérifier si un build fonctionne dans différentes versions

### 🔄 Optimisation intelligente
- Détection des circuits redstone et suggestions d'amélioration
- Recommandations d'ordre de construction
- Substitution automatique de blocs selon la disponibilité par version
- Analyse de performance des structures complexes

## 🏗️ Architecture technique

Le projet est construit autour d'une architecture modulaire :

```
+---------------------+    +---------------------+
|  Frontend (React)   |    |  API (Express.js)   |
+---------------------+    +---------------------+
          |                           |
          |    +---------------------+
          +--->|  Base de données    |<---+
               |  (MongoDB / MySQL)  |
               +---------------------+
                         |
+-------------+  +-------------+  +-------------+
| Module Wiki |  | Calculateurs|  | Blueprints  |
+-------------+  +-------------+  +-------------+
```

## 📊 Structure de données

### Modèle de version Minecraft
```json
{
  "version": "1.20.6",
  "releaseDate": "2024-08-15",
  "type": "release",
  "items": [...],
  "blocks": [...],
  "entities": [...],
  "mechanics": [...],
  "enchantments": [...]
}
```

### Modèle de Blueprint
```json
{
  "id": "uuid",
  "name": "Tour de guet",
  "creator": "username",
  "version": "1.19.2",
  "dimensions": {"x": 10, "y": 25, "z": 10},
  "blocks": [
    {"id": "minecraft:stone", "pos": {"x": 0, "y": 0, "z": 0}},
    ...
  ],
  "materials": {
    "minecraft:stone": 154,
    "minecraft:oak_planks": 48,
    ...
  },
  "tags": ["défense", "médiéval", "tour"],
  "compatibility": {
    "minVersion": "1.14",
    "maxVersion": "latest",
    "issues": [
      {"version": "1.13", "reason": "Utilise des blocs non disponibles"}
    ]
  }
}
```

## 📦 Modules du projet

### 🌐 Frontend
- Interface web responsive (React/Vue.js)
- Visualisation 3D des blueprints (Three.js)
- Tableaux interactifs pour la comparaison de versions
- Éditeur visuel de blueprints

### 🖥️ Backend
- API RESTful pour accéder aux données
- Système d'authentification
- Gestion des utilisateurs et des contributions
- Générateur de statistiques et analyses

### 💾 Base de données
- Schémas pour toutes les entités Minecraft
- Versionnement des données pour chaque mise à jour
- Système de relations pour les crafts et recettes
- Cache performant pour les requêtes fréquentes

### 🛠️ Outils d'analyse
- Parseurs pour les fichiers de jeu
- Scripts d'extraction de données
- Validation automatique des données
- Détection des changements entre versions

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/kihw/minecraft-wiki-toolkit.git
cd minecraft-wiki-toolkit

# Installer les dépendances
npm install

# Configuration
cp .env.example .env
# Éditer le fichier .env avec vos paramètres

# Lancer le serveur de développement
npm run dev
```

## 💻 Développement

### Structure des dossiers

```
/
├── client/             # Frontend React
├── server/             # Backend Express
├── database/           # Modèles et migrations
├── modules/
│   ├── wiki/           # Module wiki
│   ├── calculators/    # Module calculateurs
│   └── blueprints/     # Module blueprints
├── scripts/            # Scripts utilitaires
└── docs/               # Documentation
```

### Commandes principales

```bash
# Lancer le frontend (développement)
npm run client:dev

# Lancer le backend (développement)
npm run server:dev

# Tests
npm run test

# Build production
npm run build
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

1. Fork du projet
2. Création d'une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit de vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouverture d'une Pull Request

Consultez notre [guide de contribution](CONTRIBUTING.md) pour plus de détails.

## 📅 Feuille de route

### Phase 1 (2 mois)
- [ ] Mise en place de l'architecture de base
- [ ] Import des données pour 5 versions majeures de Minecraft
- [ ] Interface wiki simple avec tableaux comparatifs
- [ ] Prototype de l'éditeur de blueprints

### Phase 2 (3 mois)
- [ ] Implémentation complète du système de blueprints
- [ ] Premiers calculateurs (crafts, matériaux)
- [ ] Système d'authentification
- [ ] Import/export de fichiers .schematic

### Phase 3 (4 mois)
- [ ] Optimisation intelligente des blueprints
- [ ] Calculateurs avancés (enchantements, redstone)
- [ ] Analyse de compatibilité cross-version
- [ ] Visualisation 3D interactive des constructions

### Phase 4 (long terme)
- [ ] API publique pour développeurs
- [ ] Communauté de partage de blueprints
- [ ] Intégration avec des mods populaires
- [ ] Applications mobiles

## 📜 Licence

Ce projet est sous licence [MIT](LICENSE).

---

Projet développé avec ❤️ pour la communauté Minecraft.
