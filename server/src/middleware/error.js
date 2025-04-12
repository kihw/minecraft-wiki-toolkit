/**
 * Middleware de gestion des erreurs
 */

const errorHandler = (err, req, res, next) => {
  // Journaliser l'erreur pour le développement
  console.error(err);
  
  let error = { ...err };
  error.message = err.message;
  
  // Erreur Mongoose - ID invalide
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée avec l'ID ${err.value}`;
    error = new Error(message);
    error.statusCode = 404;
  }
  
  // Erreur Mongoose - Champs requis
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }
  
  // Erreur Mongoose - Valeur en double
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `La valeur '${err.keyValue[field]}' pour le champ '${field}' est déjà utilisée`;
    error = new Error(message);
    error.statusCode = 400;
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Erreur serveur',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
