/**
 * Routes pour la gestion des utilisateurs
 */

const express = require('express');
const router = express.Router();

// Middleware d'authentification
const { protect, authorize } = require('../middleware/auth');

/**
 * @route   GET /api/users/profile/:username
 * @desc    Récupérer le profil public d'un utilisateur
 * @access  Public
 */
router.get('/profile/:username', async (req, res, next) => {
  try {
    const username = req.params.username;
    
    // TODO: Implémenter la récupération du profil public
    // const user = await User.findOne({ username });
    // 
    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    // }
    
    // Pour le moment, on renvoie des données fictives
    const publicProfile = {
      username,
      memberSince: '2024-01-15',
      role: 'user',
      contributions: {
        blueprints: 5,
        likes: 27,
        comments: 12
      },
      badges: ['early_supporter', 'blueprint_creator'],
      recentActivity: [
        { type: 'blueprint_created', name: 'Tour de guet', date: '2024-06-15' },
        { type: 'blueprint_liked', name: 'Ferme automatique', date: '2024-06-10' }
      ]
    };
    
    res.status(200).json({
      success: true,
      data: publicProfile
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Mettre à jour son profil
 * @access  Private
 */
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { username, email, bio } = req.body;
    
    // TODO: Implémenter la mise à jour du profil
    // // Vérifier si le nouveau username est déjà pris
    // if (username && username !== req.user.username) {
    //   const existingUser = await User.findOne({ username });
    //   if (existingUser) {
    //     return res.status(400).json({ success: false, error: 'Ce nom d\'utilisateur est déjà pris' });
    //   }
    // }
    // 
    // // Mettre à jour le profil
    // const updatedUser = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { username, email, bio },
    //   { new: true, runValidators: true }
    // );
    
    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: {
        id: req.user.id,
        username: username || req.user.username,
        email: email || req.user.email,
        bio: bio || req.user.bio
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /api/users/change-password
 * @desc    Changer son mot de passe
 * @access  Private
 */
router.put('/change-password', protect, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // TODO: Implémenter le changement de mot de passe
    // // Vérifier l'utilisateur et son mot de passe actuel
    // const user = await User.findById(req.user.id).select('+password');
    // 
    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    // }
    // 
    // // Vérifier le mot de passe actuel
    // const isMatch = await user.matchPassword(currentPassword);
    // 
    // if (!isMatch) {
    //   return res.status(401).json({ success: false, error: 'Mot de passe actuel incorrect' });
    // }
    // 
    // // Mettre à jour le mot de passe
    // user.password = newPassword;
    // await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/users/bookmarks
 * @desc    Récupérer les blueprints favoris de l'utilisateur
 * @access  Private
 */
router.get('/bookmarks', protect, async (req, res, next) => {
  try {
    // TODO: Implémenter la récupération des favoris
    // const bookmarks = await Bookmark.find({ user: req.user.id })
    //   .populate('blueprint')
    //   .sort({ createdAt: -1 });
    
    // Pour le moment, on renvoie des données fictives
    const bookmarkedBlueprints = [
      {
        id: 1,
        name: 'Maison médiévale',
        description: 'Maison de style médiéval avec tour et jardins.',
        creator: 'BuildMaster',
        version: '1.20.4',
        bookmarkedAt: '2024-05-12'
      },
      {
        id: 3,
        name: 'Générateur de cobblestone',
        description: 'Générateur automatique de cobblestone efficace.',
        creator: 'RedstoneWizard',
        version: '1.19.4',
        bookmarkedAt: '2024-04-28'
      }
    ];
    
    res.status(200).json({
      success: true,
      count: bookmarkedBlueprints.length,
      data: bookmarkedBlueprints
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/users/admin/all
 * @desc    Récupérer tous les utilisateurs (admin)
 * @access  Private (Admin)
 */
router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    // TODO: Implémenter la récupération de tous les utilisateurs
    // const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    // Pour le moment, on renvoie des données fictives
    const users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        username: 'user1',
        email: 'user1@example.com',
        role: 'user',
        createdAt: '2024-01-15'
      },
      {
        id: 3,
        username: 'user2',
        email: 'user2@example.com',
        role: 'user',
        createdAt: '2024-02-20'
      }
    ];
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;