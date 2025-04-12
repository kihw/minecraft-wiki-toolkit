/**
 * Utilitaires pour la manipulation des blueprints
 */

const zlib = require('zlib');
const { isVersionCompatible } = require('./versionUtils');

/**
 * Calcule les matériaux nécessaires pour un blueprint
 * @param {Object} blocksData - Données des blocs du blueprint
 * @returns {Map<string, number>} - Map des matériaux et leurs quantités
 */
const calculateMaterials = (blocksData) => {
  const materials = new Map();
  
  // Vérifie le format des données des blocs
  if (!blocksData || typeof blocksData !== 'object') {
    return materials;
  }
  
  // Format 1: Liste d'objets avec ID et position
  if (Array.isArray(blocksData)) {
    blocksData.forEach(block => {
      if (block && block.id) {
        const count = materials.get(block.id) || 0;
        materials.set(block.id, count + 1);
      }
    });
  } 
  // Format 2: Matrice 3D
  else if (blocksData.matrix) {
    const matrix = blocksData.matrix;
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        for (let z = 0; z < matrix[x][y].length; z++) {
          const blockId = matrix[x][y][z];
          if (blockId && blockId !== 'minecraft:air') {
            const count = materials.get(blockId) || 0;
            materials.set(blockId, count + 1);
          }
        }
      }
    }
  }
  // Format 3: Format compressé
  else if (blocksData.compressed) {
    for (const [blockId, positions] of Object.entries(blocksData.compressed)) {
      if (blockId !== 'minecraft:air') {
        materials.set(blockId, positions.length);
      }
    }
  }
  
  return materials;
};

/**
 * Convertit les données de blocs en format compressé pour économiser de l'espace
 * @param {Array} blocks - Liste de blocs avec leurs positions
 * @returns {Object} - Format compressé des blocs
 */
const compressBlocksData = (blocks) => {
  if (!Array.isArray(blocks)) {
    return { compressed: {} };
  }
  
  const compressed = {};
  
  blocks.forEach(block => {
    if (!block.id || !block.pos) return;
    
    if (!compressed[block.id]) {
      compressed[block.id] = [];
    }
    
    compressed[block.id].push([block.pos.x, block.pos.y, block.pos.z]);
  });
  
  return { compressed };
};

/**
 * Décompresse les données de blocs pour revenir au format original
 * @param {Object} compressedData - Données compressées
 * @returns {Array} - Liste des blocs avec leurs positions
 */
const decompressBlocksData = (compressedData) => {
  if (!compressedData || !compressedData.compressed) {
    return [];
  }
  
  const blocks = [];
  
  for (const [blockId, positions] of Object.entries(compressedData.compressed)) {
    positions.forEach(pos => {
      blocks.push({
        id: blockId,
        pos: {
          x: pos[0],
          y: pos[1],
          z: pos[2]
        }
      });
    });
  }
  
  return blocks;
};

/**
 * Vérifie la compatibilité d'un blueprint avec une version spécifique de Minecraft
 * @param {Object} blueprint - Objet blueprint
 * @param {string} targetVersion - Version cible
 * @returns {Object} - Résultat de compatibilité
 */
const checkCompatibility = (blueprint, targetVersion) => {
  if (!blueprint || !blueprint.compatibility) {
    return { compatible: false, issues: ['Données de compatibilité manquantes'] };
  }
  
  const { minVersion, maxVersion = 'latest', issues = [] } = blueprint.compatibility;
  
  // Vérifier si la version cible est dans la plage compatible
  const isInRange = isVersionCompatible(targetVersion, minVersion, maxVersion);
  
  if (!isInRange) {
    return { 
      compatible: false, 
      issues: [`La version ${targetVersion} n'est pas supportée (min: ${minVersion}, max: ${maxVersion})`]
    };
  }
  
  // Vérifier les problèmes connus pour cette version
  const knownIssues = issues
    .filter(issue => issue.version === targetVersion || issue.version === '*')
    .map(issue => issue.reason);
  
  return {
    compatible: knownIssues.length === 0,
    issues: knownIssues
  };
};

/**
 * Compresse les données d'un blueprint pour le stockage
 * @param {Object} blueprintData - Données complètes du blueprint
 * @returns {Buffer} - Données compressées
 */
const compressBlueprintData = (blueprintData) => {
  if (!blueprintData) return null;
  
  const dataString = JSON.stringify(blueprintData);
  return zlib.deflateSync(dataString);
};

/**
 * Décompresse les données d'un blueprint
 * @param {Buffer} compressedData - Données compressées
 * @returns {Object} - Données du blueprint
 */
const decompressBlueprintData = (compressedData) => {
  if (!compressedData) return null;
  
  const dataString = zlib.inflateSync(compressedData).toString();
  return JSON.parse(dataString);
};

/**
 * Calcule les dimensions d'un blueprint à partir de ses blocs
 * @param {Array} blocks - Liste des blocs
 * @returns {Object} - Dimensions {x, y, z}
 */
const calculateDimensions = (blocks) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
  blocks.forEach(block => {
    if (!block.pos) return;
    
    const { x, y, z } = block.pos;
    
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  });
  
  return {
    x: maxX - minX + 1,
    y: maxY - minY + 1,
    z: maxZ - minZ + 1
  };
};

module.exports = {
  calculateMaterials,
  compressBlocksData,
  decompressBlocksData,
  checkCompatibility,
  compressBlueprintData,
  decompressBlueprintData,
  calculateDimensions
};