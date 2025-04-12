/**
 * Utilitaires pour la gestion des versions de Minecraft
 */

/**
 * Compare deux versions de Minecraft au format "1.19.2", "1.20", etc.
 * @param {string} versionA - Première version (ex: "1.19.2")
 * @param {string} versionB - Deuxième version (ex: "1.20.1")
 * @returns {number} - -1 si versionA < versionB, 0 si égales, 1 si versionA > versionB
 */
const compareVersions = (versionA, versionB) => {
  if (versionA === 'latest') return 1;
  if (versionB === 'latest') return -1;
  
  // Extraire les composants de version
  const partsA = versionA.split('.').map(Number);
  const partsB = versionB.split('.').map(Number);
  
  // S'assurer que les deux tableaux ont la même longueur
  while (partsA.length < partsB.length) partsA.push(0);
  while (partsB.length < partsA.length) partsB.push(0);
  
  // Comparer chaque partie
  for (let i = 0; i < partsA.length; i++) {
    if (partsA[i] > partsB[i]) return 1;
    if (partsA[i] < partsB[i]) return -1;
  }
  
  return 0; // Versions égales
};

/**
 * Vérifie si une version est compatible avec une plage de versions
 * @param {string} version - Version à vérifier
 * @param {string} minVersion - Version minimale
 * @param {string} maxVersion - Version maximale (ou "latest")
 * @returns {boolean} - Vrai si la version est compatible
 */
const isVersionCompatible = (version, minVersion, maxVersion = 'latest') => {
  return (compareVersions(version, minVersion) >= 0) && 
         (maxVersion === 'latest' || compareVersions(version, maxVersion) <= 0);
};

/**
 * Extrait le numéro de version majeure
 * @param {string} version - Version complète (ex: "1.19.2")
 * @returns {string} - Version majeure (ex: "1.19")
 */
const getMajorVersion = (version) => {
  const parts = version.split('.');
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}` : version;
};

/**
 * Génère un tableau de toutes les versions majeures entre min et max
 * @param {string} minVersion - Version minimale (ex: "1.16")
 * @param {string} maxVersion - Version maximale (ex: "1.20")
 * @returns {Array<string>} - Tableau des versions majeures
 */
const getMajorVersionRange = (minVersion, maxVersion) => {
  const min = getMajorVersion(minVersion);
  const max = getMajorVersion(maxVersion);
  
  const [majorMin, minorMin] = min.split('.').map(Number);
  const [majorMax, minorMax] = max.split('.').map(Number);
  
  const versions = [];
  
  // Cas simple où la version majeure est la même
  if (majorMin === majorMax) {
    for (let i = minorMin; i <= minorMax; i++) {
      versions.push(`${majorMin}.${i}`);
    }
  } else {
    // Cas où les versions majeures sont différentes
    for (let major = majorMin; major <= majorMax; major++) {
      const startMinor = major === majorMin ? minorMin : 0;
      const endMinor = major === majorMax ? minorMax : 20; // Limite arbitraire
      
      for (let minor = startMinor; minor <= endMinor; minor++) {
        versions.push(`${major}.${minor}`);
      }
    }
  }
  
  return versions;
};

/**
 * Valide si une chaîne est un format de version valide
 * @param {string} version - Version à valider
 * @returns {boolean} - Vrai si le format est valide
 */
const isValidVersionFormat = (version) => {
  // Format standard Minecraft: "1.19.2", "1.20", etc.
  const standardPattern = /^(\d+)\.(\d+)(\.(\d+))?$/;
  
  // Format de snapshot: "1.19_pre1", "21w44a", etc.
  const snapshotPattern = /^(\d+)\.(\d+)_(pre|rc)(\d+)$|^\d{2}w\d{2}[a-z]$/;
  
  return standardPattern.test(version) || snapshotPattern.test(version) || version === 'latest';
};

/**
 * Détermine si une version est une version mineure ou un patch
 * @param {string} versionA - Version de base
 * @param {string} versionB - Version à comparer
 * @returns {string} - 'major', 'minor', 'patch' ou 'same'
 */
const getVersionDifference = (versionA, versionB) => {
  const partsA = versionA.split('.').map(Number);
  const partsB = versionB.split('.').map(Number);
  
  // Compléter avec des 0 si nécessaire
  while (partsA.length < 3) partsA.push(0);
  while (partsB.length < 3) partsB.push(0);
  
  if (partsA[0] !== partsB[0]) return 'major';
  if (partsA[1] !== partsB[1]) return 'minor';
  if (partsA[2] !== partsB[2]) return 'patch';
  return 'same';
};

module.exports = {
  compareVersions,
  isVersionCompatible,
  getMajorVersion,
  getMajorVersionRange,
  isValidVersionFormat,
  getVersionDifference
};