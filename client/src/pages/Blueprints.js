import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blueprints = () => {
  const [blueprints, setBlueprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVersion, setSelectedVersion] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Categories de blueprints
  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'buildings', name: 'Bâtiments' },
    { id: 'redstone', name: 'Redstone' },
    { id: 'farms', name: 'Fermes' },
    { id: 'decoration', name: 'Décoration' },
    { id: 'transportation', name: 'Transport' }
  ];

  // Versions de Minecraft
  const versions = [
    { id: 'all', name: 'Toutes les versions' },
    { id: '1.20', name: '1.20+' },
    { id: '1.19', name: '1.19' },
    { id: '1.18', name: '1.18' },
    { id: '1.17', name: '1.17' },
    { id: '1.16', name: '1.16 et antérieur' }
  ];

  // Options de tri
  const sortOptions = [
    { id: 'newest', name: 'Plus récents' },
    { id: 'oldest', name: 'Plus anciens' },
    { id: 'likes', name: 'Plus populaires' },
    { id: 'downloads', name: 'Plus téléchargés' }
  ];

  // Chargement des blueprints (simulation)
  useEffect(() => {
    setLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      const dummyBlueprints = [
        {
          id: 1,
          name: 'Tour de guet médiévale',
          description: 'Une tour de guet avec une architecture médiévale, idéale pour surveiller les alentours.',
          author: 'CreativeBuilder',
          category: 'buildings',
          version: '1.20.2',
          likes: 142,
          downloads: 324,
          views: 1250,
          createdAt: '2024-06-15',
          tags: ['médiéval', 'défense', 'tour']
        },
        {
          id: 2,
          name: 'Ferme à villageois automatique',
          description: 'Système complet pour produire et gérer des villageois automatiquement.',
          author: 'RedstoneGuru',
          category: 'farms',
          version: '1.19.4',
          likes: 87,
          downloads: 156,
          views: 674,
          createdAt: '2024-03-22',
          tags: ['ferme', 'villageois', 'automatisation']
        },
        {
          id: 3,
          name: 'Base souterraine moderne',
          description: 'Une base souterraine avec un design moderne et fonctionnel.',
          author: 'CaveDweller',
          category: 'buildings',
          version: '1.20.1',
          likes: 63,
          downloads: 102,
          views: 533,
          createdAt: '2024-05-01',
          tags: ['base', 'souterrain', 'moderne']
        },
        {
          id: 4,
          name: 'Temple de l\'eau',
          description: 'Un temple inspiré des architectures asiatiques avec des éléments aquatiques.',
          author: 'OceanArchitect',
          category: 'decoration',
          version: '1.20.0',
          likes: 51,
          downloads: 88,
          views: 420,
          createdAt: '2024-02-12',
          tags: ['temple', 'eau', 'asiatique']
        },
        {
          id: 5,
          name: 'Système de tri automatique',
          description: 'Un système compact capable de trier automatiquement vos items dans des coffres.',
          author: 'RedstoneWizard',
          category: 'redstone',
          version: '1.18.2',
          likes: 214,
          downloads: 522,
          views: 1876,
          createdAt: '2023-12-05',
          tags: ['tri', 'stockage', 'redstone']
        },
        {
          id: 6,
          name: 'Train automatique',
          description: 'Un système de train complet qui fonctionne avec des rails alimentés.',
          author: 'RailEngineer',
          category: 'transportation',
          version: '1.19.2',
          likes: 79,
          downloads: 134,
          views: 602,
          createdAt: '2024-01-18',
          tags: ['train', 'rail', 'transport']
        },
        {
          id: 7,
          name: 'Ferme à XP automatique',
          description: 'Une ferme efficace pour accumuler de l\'expérience rapidement.',
          author: 'XPFarmer',
          category: 'farms',
          version: '1.17.1',
          likes: 168,
          downloads: 390,
          views: 1542,
          createdAt: '2023-11-29',
          tags: ['xp', 'ferme', 'efficace']
        },
        {
          id: 8,
          name: 'Jardin japonais',
          description: 'Un jardin zen dans le style japonais avec plusieurs éléments décoratifs.',
          author: 'GardenArtist',
          category: 'decoration',
          version: '1.20.4',
          likes: 92,
          downloads: 143,
          views: 467,
          createdAt: '2024-07-02',
          tags: ['jardin', 'zen', 'japonais']
        }
      ];
      
      setBlueprints(dummyBlueprints);
      setLoading(false);
    }, 800);
  }, []);

  // Filtrer les blueprints
  const filteredBlueprints = blueprints.filter(bp => {
    const matchesSearch = bp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || bp.category === selectedCategory;
    
    const matchesVersion = selectedVersion === 'all' || 
                          (selectedVersion === '1.16' && bp.version.startsWith('1.16')) ||
                          bp.version.startsWith(selectedVersion);
    
    return matchesSearch && matchesCategory && matchesVersion;
  });

  // Trier les blueprints
  const sortedBlueprints = [...filteredBlueprints].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'likes':
        return b.likes - a.likes;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blueprints</h1>
        <Link to="/blueprints/editor" className="minecraft-button-primary">
          Créer un Blueprint
        </Link>
      </div>
      
      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recherche */}
          <div className="col-span-1 md:col-span-4">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un blueprint..."
                className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Filtres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Version
            </label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {versions.map(version => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trier par
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedVersion('all');
                setSortBy('newest');
              }}
              className="minecraft-button-secondary w-full"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      
      {/* Liste des blueprints */}
      {loading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Chargement des blueprints...</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-4">
            {sortedBlueprints.length} résultat{sortedBlueprints.length !== 1 ? 's' : ''}
          </div>
          
          {sortedBlueprints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedBlueprints.map(blueprint => (
                <BlueprintCard key={blueprint.id} blueprint={blueprint} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Aucun blueprint ne correspond à votre recherche.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedVersion('all');
                }}
                className="minecraft-button-secondary mt-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Composant carte de blueprint
const BlueprintCard = ({ blueprint }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="blueprint-card">
      <div className="blueprint-thumbnail bg-gray-300 dark:bg-gray-700 mb-4"></div>
      <h3 className="font-bold text-lg mb-1 truncate">
        <Link to={`/blueprints/editor/${blueprint.id}`} className="hover:text-green-600">
          {blueprint.name}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
        {blueprint.description}
      </p>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>par {blueprint.author}</span>
        <span>v{blueprint.version}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {blueprint.tags.map(tag => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs rounded px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <span className="mr-1">❤️</span> {blueprint.likes}
        </div>
        <div className="flex items-center">
          <span className="mr-1">⬇️</span> {blueprint.downloads}
        </div>
        <div className="flex items-center">
          <span className="mr-1">👁️</span> {blueprint.views}
        </div>
        <div>
          {formatDate(blueprint.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Blueprints;
