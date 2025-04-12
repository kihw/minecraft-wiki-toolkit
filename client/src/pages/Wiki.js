import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Wiki = () => {
  const { version } = useParams();
  const [selectedVersion, setSelectedVersion] = useState(version || 'latest');
  const [category, setCategory] = useState('blocks');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [versions, setVersions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Catégories disponibles
  const categories = [
    { id: 'blocks', name: 'Blocs' },
    { id: 'items', name: 'Items' },
    { id: 'entities', name: 'Entités' },
    { id: 'enchantments', name: 'Enchantements' },
    { id: 'biomes', name: 'Biomes' }
  ];

  // Simuler le chargement des données
  useEffect(() => {
    setLoading(true);
    
    // Dans une implémentation réelle, on ferait un appel API ici
    setTimeout(() => {
      // Versions (exemple)
      setVersions([
        { version: '1.20.6', releaseDate: '2024-08-15', type: 'release' },
        { version: '1.20.4', releaseDate: '2023-12-07', type: 'release' },
        { version: '1.20.2', releaseDate: '2023-09-26', type: 'release' },
        { version: '1.19.4', releaseDate: '2023-03-14', type: 'release' },
        { version: '1.19.3', releaseDate: '2022-12-07', type: 'release' },
        { version: '1.18.2', releaseDate: '2022-02-28', type: 'release' }
      ]);
      
      // Générer des données d'exemple selon la catégorie
      if (category === 'blocks') {
        setData(generateBlocksData());
      } else if (category === 'items') {
        setData(generateItemsData());
      } else {
        setData([]);
      }
      
      setLoading(false);
    }, 500);
  }, [selectedVersion, category]);

  // Générer des données d'exemple pour les blocs
  const generateBlocksData = () => {
    const blocks = [
      { id: 'stone', name: 'Pierre', hardness: 1.5, resistance: 6.0, tool: 'pickaxe', addedIn: '1.0.0' },
      { id: 'oak_planks', name: 'Planches de chêne', hardness: 2.0, resistance: 3.0, tool: 'axe', addedIn: '1.0.0' },
      { id: 'cobblestone', name: 'Pierre taillée', hardness: 2.0, resistance: 6.0, tool: 'pickaxe', addedIn: '1.0.0' },
      { id: 'dirt', name: 'Terre', hardness: 0.5, resistance: 0.5, tool: 'shovel', addedIn: '1.0.0' },
      { id: 'grass_block', name: 'Bloc d\'herbe', hardness: 0.6, resistance: 0.6, tool: 'shovel', addedIn: '1.0.0' },
      { id: 'deepslate', name: 'Ardoise des profondeurs', hardness: 3.0, resistance: 6.0, tool: 'pickaxe', addedIn: '1.17.0' },
      { id: 'copper_block', name: 'Bloc de cuivre', hardness: 3.0, resistance: 6.0, tool: 'pickaxe', addedIn: '1.17.0' },
      { id: 'amethyst_block', name: 'Bloc d\'améthyste', hardness: 1.5, resistance: 1.5, tool: 'pickaxe', addedIn: '1.17.0' },
      { id: 'calcite', name: 'Calcite', hardness: 0.75, resistance: 0.75, tool: 'pickaxe', addedIn: '1.17.0' },
      { id: 'mud_bricks', name: 'Briques de boue', hardness: 1.5, resistance: 3.0, tool: 'pickaxe', addedIn: '1.19.0' }
    ];
    
    // Filtrer par version (dans une implémentation réelle)
    return blocks;
  };

  // Générer des données d'exemple pour les items
  const generateItemsData = () => {
    const items = [
      { id: 'apple', name: 'Pomme', stackSize: 64, foodPoints: 4, addedIn: '1.0.0' },
      { id: 'wheat_seeds', name: 'Graines de blé', stackSize: 64, addedIn: '1.0.0' },
      { id: 'diamond', name: 'Diamant', stackSize: 64, addedIn: '1.0.0' },
      { id: 'iron_ingot', name: 'Lingot de fer', stackSize: 64, addedIn: '1.0.0' },
      { id: 'gold_ingot', name: 'Lingot d\'or', stackSize: 64, addedIn: '1.0.0' },
      { id: 'netherite_ingot', name: 'Lingot de Netherite', stackSize: 64, addedIn: '1.16.0' },
      { id: 'copper_ingot', name: 'Lingot de cuivre', stackSize: 64, addedIn: '1.17.0' },
      { id: 'amethyst_shard', name: 'Éclat d\'améthyste', stackSize: 64, addedIn: '1.17.0' },
      { id: 'brush', name: 'Brosse', stackSize: 1, durability: 64, addedIn: '1.20.0' },
      { id: 'goat_horn', name: 'Corne de chèvre', stackSize: 1, addedIn: '1.19.0' }
    ];
    
    // Filtrer par version (dans une implémentation réelle)
    return items;
  };

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Wiki Minecraft</h1>
      
      {/* Sélecteur de version */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Version:
        </label>
        <div className="relative">
          <select 
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="latest">Dernière version</option>
            {versions.map(v => (
              <option key={v.version} value={v.version}>
                {v.version} ({new Date(v.releaseDate).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Navigation des catégories */}
      <div className="mb-6">
        <div className="tab-container">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`tab ${category === cat.id ? 'tab-active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Rechercher dans les ${categories.find(c => c.id === category)?.name.toLowerCase() || 'données'}...`}
            className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tableau de données */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Chargement des données...</p>
          </div>
        ) : (
          <>
            {filteredData.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    {category === 'blocks' && (
                      <>
                        <th>Dureté</th>
                        <th>Résistance</th>
                        <th>Outil</th>
                      </>
                    )}
                    {category === 'items' && (
                      <>
                        <th>Stack Max</th>
                        {filteredData.some(item => item.foodPoints) && <th>Points de nourriture</th>}
                        {filteredData.some(item => item.durability) && <th>Durabilité</th>}
                      </>
                    )}
                    <th>Ajouté en</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.id}>
                      <td className="font-mono">{item.id}</td>
                      <td>{item.name}</td>
                      {category === 'blocks' && (
                        <>
                          <td>{item.hardness}</td>
                          <td>{item.resistance}</td>
                          <td>{item.tool}</td>
                        </>
                      )}
                      {category === 'items' && (
                        <>
                          <td>{item.stackSize}</td>
                          {filteredData.some(i => i.foodPoints) && <td>{item.foodPoints || '-'}</td>}
                          {filteredData.some(i => i.durability) && <td>{item.durability || '-'}</td>}
                        </>
                      )}
                      <td>{item.addedIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">Aucun résultat trouvé pour "{searchTerm}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wiki;
