/**
 * Modèle pour les blueprints (plans de construction)
 * Ce schéma définit la structure des plans de construction créés par les utilisateurs
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blueprintSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  createdForVersion: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  dimensions: {
    x: {
      type: Number,
      required: true,
      min: 1,
      max: 512
    },
    y: {
      type: Number,
      required: true,
      min: 1,
      max: 512
    },
    z: {
      type: Number,
      required: true,
      min: 1,
      max: 512
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
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
  thumbnailUrl: {
    type: String
  },
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
  },
  // Propriétés avancées pour l'optimisation
  optimizationData: {
    suggestedChanges: [{
      original: {
        blockId: String,
        count: Number
      },
      suggested: {
        blockId: String,
        count: Number
      },
      reason: String,
      resourceSavings: Number
    }],
    buildOrder: [String], // Ordre suggéré pour la construction
    redstoneCircuits: [{
      name: String,
      blocks: [Schema.Types.Mixed], // Références aux blocs dans blocksData
      function: String,
      optimizable: Boolean
    }]
  },
  // Fichier source, si importé
  sourceFile: {
    type: {
      type: String,
      enum: ['schematic', 'nbt', 'litematic', 'manual']
    },
    originalName: String,
    fileSize: Number,
    uploadDate: Date
  }
}, {
  timestamps: true
});

// Indexer pour les recherches fréquentes
blueprintSchema.index({ name: 'text', description: 'text' });
blueprintSchema.index({ tags: 1 });
blueprintSchema.index({ createdForVersion: 1 });
blueprintSchema.index({ creator: 1 });
blueprintSchema.index({ likes: -1 });
blueprintSchema.index({ 'compatibility.minVersion': 1, 'compatibility.maxVersion': 1 });

// Méthodes spécifiques aux blueprints
blueprintSchema.methods.calculateMaterials = function() {
  // Logique pour calculer les matériaux nécessaires
  // À implémenter
};

blueprintSchema.methods.optimizeDesign = function(targetVersion) {
  // Logique pour suggérer des optimisations basées sur la version
  // À implémenter
};

blueprintSchema.methods.checkCompatibility = function(version) {
  // Vérifier la compatibilité avec une version spécifique
  // À implémenter
};

blueprintSchema.methods.exportToFormat = function(format) {
  // Exporter le blueprint dans différents formats (.schematic, .nbt, etc.)
  // À implémenter
};

// Pré-save hook pour valider la structure et calculer les matériaux
blueprintSchema.pre('save', function(next) {
  // Validation et calcul
  // À implémenter
  
  // Exemple simple de calcul de matériaux
  if (this.isModified('blocksData')) {
    const materials = new Map();
    
    // Logique pour parcourir blocksData et compter les matériaux
    // Cette implémentation dépendra du format exact de blocksData
    
    this.materials = materials;
  }
  
  next();
});

module.exports = mongoose.model('Blueprint', blueprintSchema);
