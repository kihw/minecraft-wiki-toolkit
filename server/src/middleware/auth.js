/**
 * Middleware d'authentification
 * Permet de protéger les routes et de vérifier les autorisations
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware pour protéger les routes
 * Vérifie si l'utilisateur est authentifié via le token JWT
 */
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Vérifier si le token est présent dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Ou dans les cookies
      token = req.cookies.token;
    }
    
    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Non autorisé, veuillez vous connecter'
      });
    }
    
    try {
      // Vérifier et décoder le token
      // NOTE: En production, cette vérification utilisera le modèle User pour récupérer l'utilisateur complet
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.id);
      
      // Pour le moment, en développement, on simule un utilisateur
      req.user = {
        id: '12345',
        username: 'utilisateur_test',
        email: 'utilisateur@test.com',
        role: 'user'
      };
      
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide ou expiré'
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware pour vérifier le rôle de l'utilisateur
 * @param {...string} roles - Les rôles autorisés
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Non autorisé, veuillez vous connecter'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`
      });
    }
    
    next();
  };
};
