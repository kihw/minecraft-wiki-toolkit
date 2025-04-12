/**
 * Modèle pour les blueprints
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blueprintSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom du blueprint est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description du blueprint est requise'],
    trim: true,
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdForVersion: {
    type: String,
    required: [true, 'La version est requise'],
    trim: true
  },
  dimensions: {
    x: {
      type: Number,
      required: true,
      min: [1, 'La dimension X doit être d\'au moins 1'],
      max: [512, 'La dimension X ne peut pas dépasser 512']
    },
    y: {
      type: Number,
      required: true,
      min: [1, 'La dimension Y doit être d\'au moins 1'],
      max: [512, 'La dimension Y ne peut pas dépasser 512']
    },
    z: {
      type: Number,
      required: true,
      min: [1, 'La dimension Z doit être d\'au moins 1'],
      max: [512, 'La dimension Z ne peut pas dépasser 512']
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['buildings', 'redstone', 'farms', 'decoration', 'transportation', 'other']
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  thumbnailUrl: String,
  // Structure des blocs, stockée de manière compressée
  blocksData: {
    type: Schema.Types.Mixed,
    required: true
  },
  // Matériaux nécessaires (calculés automatiquement)
  materials: {
    type: Map,
    of: Number
  },
  // Compabilité entre versions
  compatibility: {
    minVersion: {
      type: String,
      required: true
    },
    maxVersion: {
      type: String,
      default: 'latest'
    },
    issues: [{
      version: String,
      reason: String
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexage pour les recherches
blueprintSchema.index({ name: 'text', description: 'text', tags: 'text' });
blueprintSchema.index({ 'creator': 1 });
blueprintSchema.index({ 'category': 1 });
blueprintSchema.index({ 'createdForVersion': 1 });
blueprintSchema.index({ 'visibility': 1 });
blueprintSchema.index({ 'likes': -1 });
blueprintSchema.index({ 'downloads': -1 });
blueprintSchema.index({ 'views': -1 });
blueprintSchema.index({ 'createdAt': -1 });

// Middleware pre-save pour calculer les matériaux
blueprintSchema.pre('save', function(next) {
  if (this.isModified('blocksData')) {
    this.calculateMaterials();
  }
  next();
});

// Méthode pour calculer les matériaux nécessaires
blueprintSchema.methods.calculateMaterials = function() {
  const materials = new Map();
  
  // Dans une implémentation réelle, cette méthode analyserait blocksData
  // et compterait tous les types de blocs utilisés
  
  // Exemple simple (à remplacer par une vraie implémentation)
  if (this.blocksData && typeof this.blocksData === 'object') {
    // Logique d'analyse des blocs
  }
  
  this.materials = materials;
};

// Méthode pour vérifier la compatibilité avec une version spécifique
blueprintSchema.methods.checkCompatibility = function(version) {
  // Vérifier si la version est dans la plage de compatibilité
  if (this.compatibility.minVersion <= version) {
    if (this.compatibility.maxVersion === 'latest' || version <= this.compatibility.maxVersion) {
      // Vérifier les problèmes connus pour cette version
      const issues = this.compatibility.issues.filter(issue => issue.version === version);
      return {
        compatible: issues.length === 0,
        issues
      };
    }
  }
  
  return { compatible: false, issues: [] };
};

module.exports = mongoose.model('Blueprint', blueprintSchema);