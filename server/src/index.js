/**
 * Point d'entrée principal de l'application Minecraft Wiki Toolkit
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(helmet()); // Sécurité
app.use(compression()); // Compression des réponses
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '50mb' })); // Parsing JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser()); // Parser les cookies

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB établie'))
.catch(err => {
  console.error('Erreur de connexion à MongoDB :', err);
  process.exit(1);
});

// Routes API
app.use('/api/versions', require('./routes/versions'));
app.use('/api/blueprints', require('./routes/blueprints'));
app.use('/api/calculators', require('./routes/calculators'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Route pour la documentation API
app.use('/api-docs', express.static(path.join(__dirname, '../docs/api')));

// Servir les fichiers statiques du frontend en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

// Middleware pour les routes non trouvées
app.use((req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
  console.log(`Documentation API disponible sur http://localhost:${PORT}/api-docs`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('Erreur non gérée :', err);
  // Fermer le serveur et quitter le processus en cas d'erreur grave
  server.close(() => process.exit(1));
});

module.exports = app; // Pour les tests