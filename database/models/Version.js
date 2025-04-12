/**
 * Modèle pour les versions de Minecraft
 * Ce schéma définit la structure des données pour chaque version de Minecraft
 */

const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  type: {
    type: String,
    enum: ['release', 'snapshot', 'pre-release', 'beta', 'alpha'],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  changelogUrl: {
    type: String,
    trim: true
  },
  downloadUrl: {
    type: String,
    trim: true
  },
  isDataComplete: {
    type: Boolean,
    default: false
  },
  features: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isAddition: {
      type: Boolean,
      default: true
    }
  }],
  metadata: {
    gameVersion: String,
    protocol: Number,
    dataVersion: Number,
    javaVersion: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexer pour les recherches fréquentes
versionSchema.index({ releaseDate: -1 });
versionSchema.index({ 'features.name': 1 });
versionSchema.index({ 'type': 1, 'releaseDate': -1 });

// Méthode pour comparer deux versions
versionSchema.methods.compareWith = function(otherVersionId) {
  // Logique pour comparer les caractéristiques entre deux versions
  // À implémenter
};

// Méthode statique pour trouver la dernière version
versionSchema.statics.findLatestRelease = function() {
  return this.findOne({ type: 'release' }).sort({ releaseDate: -1 });
};

// Pre-save hook pour valider le format de version
versionSchema.pre('save', function(next) {
  // Validation du format de la version (ex: 1.19.2)
  const versionPattern = /^(\d+\.\d+(\.\d+)?)(-[a-z0-9]+)?$/;
  if (!versionPattern.test(this.version)) {
    return next(new Error('Format de version invalide'));
  }
  next();
});

module.exports = mongoose.model('Version', versionSchema);
