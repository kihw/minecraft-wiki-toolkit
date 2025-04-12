/**
 * Modèle pour les versions de Minecraft
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
  entities: [{
    id: String,
    name: String,
    addedIn: String,
    removedIn: String
  }],
  blocks: [{
    id: String,
    name: String,
    properties: mongoose.Schema.Types.Mixed,
    addedIn: String,
    removedIn: String
  }],
  items: [{
    id: String,
    name: String,
    properties: mongoose.Schema.Types.Mixed,
    addedIn: String,
    removedIn: String
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
versionSchema.index({ 'blocks.id': 1 });
versionSchema.index({ 'items.id': 1 });
versionSchema.index({ 'entities.id': 1 });

// Méthode pour comparer deux versions
versionSchema.methods.compareWith = function(otherVersionId) {
  // Logique pour comparer les caractéristiques entre deux versions
  return new Promise(async (resolve, reject) => {
    try {
      const Version = this.constructor;
      const otherVersion = await Version.findOne({ version: otherVersionId });
      
      if (!otherVersion) {
        return resolve({
          success: false,
          error: 'Version de comparaison non trouvée'
        });
      }
      
      // Comparaison des blocs ajoutés/supprimés
      const blocksAdded = this.blocks.filter(block => 
        !otherVersion.blocks.find(b => b.id === block.id)
      );
      
      const blocksRemoved = otherVersion.blocks.filter(block => 
        !this.blocks.find(b => b.id === block.id)
      );
      
      // Comparaison des items ajoutés/supprimés
      const itemsAdded = this.items.filter(item => 
        !otherVersion.items.find(i => i.id === item.id)
      );
      
      const itemsRemoved = otherVersion.items.filter(item => 
        !this.items.find(i => i.id === item.id)
      );
      
      // Comparaison des entités ajoutées/supprimées
      const entitiesAdded = this.entities.filter(entity => 
        !otherVersion.entities.find(e => e.id === entity.id)
      );
      
      const entitiesRemoved = otherVersion.entities.filter(entity => 
        !this.entities.find(e => e.id === entity.id)
      );
      
      resolve({
        success: true,
        data: {
          blocks: {
            added: blocksAdded,
            removed: blocksRemoved
          },
          items: {
            added: itemsAdded,
            removed: itemsRemoved
          },
          entities: {
            added: entitiesAdded,
            removed: entitiesRemoved
          },
          features: this.features.filter(f => f.isAddition)
        }
      });
    } catch (err) {
      reject(err);
    }
  });
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