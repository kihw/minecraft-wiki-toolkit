import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Section Hero */}
      <section className="relative overflow-hidden rounded-xl bg-green-800 text-white p-8 md:p-12">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 minecraft-font">
            Minecraft Wiki Toolkit
          </h1>
          <p className="text-lg md:text-xl mb-6">
            La référence ultime pour explorer et créer dans l'univers de Minecraft, avec une documentation multi-versions, 
            des outils interactifs et un générateur de blueprints.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/wiki" 
              className="minecraft-button-primary"
            >
              Explorer le Wiki
            </Link>
            <Link 
              to="/blueprints" 
              className="minecraft-button-secondary"
            >
              Découvrir les Blueprints
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 md:opacity-30">
          <div className="w-64 h-64 float-animation delay-150">
            {/* Emplacement pour une image Minecraft décorative */}
          </div>
        </div>
      </section>
      
      {/* Section Fonctionnalités */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center minecraft-font">
          Découvrez nos Fonctionnalités
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wiki */}
          <FeatureCard 
            title="Wiki Multi-Versions" 
            description="Une documentation complète sur toutes les versions de Minecraft, avec comparaison entre les mises à jour."
            icon="📚"
            link="/wiki"
            color="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
          />
          
          {/* Blueprints */}
          <FeatureCard 
            title="Système de Blueprints" 
            description="Créez, partagez et analysez des plans de construction optimisés pour toutes les versions."
            icon="📐"
            link="/blueprints"
            color="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
          />
          
          {/* Calculateurs */}
          <FeatureCard 
            title="Calculateurs Interactifs" 
            description="Des outils pour optimiser vos enchantements, calculer les matériaux nécessaires et plus encore."
            icon="🧮"
            link="/calculators"
            color="bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
          />
        </div>
      </section>
      
      {/* Section Versions */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center minecraft-font">
          Versions Minecraft Populaires
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <VersionCard 
            version="1.20" 
            name="Trails & Tales" 
            date="2023-06-07" 
            features={["Archéologie", "Cerisier", "Sniffers"]}
          />
          <VersionCard 
            version="1.19" 
            name="The Wild Update" 
            date="2022-06-07" 
            features={["Mangroves", "Warden", "Cités antiques"]}
          />
          <VersionCard 
            version="1.18" 
            name="Caves & Cliffs P.2" 
            date="2021-11-30" 
            features={["Nouvelles grottes", "Génération de terrain", "Montagnes"]}
          />
          <VersionCard 
            version="1.17" 
            name="Caves & Cliffs P.1" 
            date="2021-06-08" 
            features={["Axolotls", "Chèvres", "Nouveaux blocs"]}
          />
        </div>
        
        <div className="text-center">
          <Link 
            to="/wiki" 
            className="inline-flex items-center minecraft-button-secondary"
          >
            Voir toutes les versions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Section Communauté */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center minecraft-font">
          Rejoignez la Communauté
        </h2>
        
        <p className="text-center max-w-2xl mx-auto">
          Partagez vos créations, collaborez sur des projets et apprenez des autres joueurs passionnés. 
          Notre communauté est ouverte à tous les niveaux d'expérience.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold minecraft-font">5000+</div>
            <div className="text-gray-600 dark:text-gray-400">Blueprints partagés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold minecraft-font">1200+</div>
            <div className="text-gray-600 dark:text-gray-400">Utilisateurs actifs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold minecraft-font">20+</div>
            <div className="text-gray-600 dark:text-gray-400">Versions documentées</div>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            to="/register" 
            className="minecraft-button-primary"
          >
            Créer un compte
          </Link>
        </div>
      </section>
    </div>
  );
};

// Composant pour les cartes de fonctionnalités
const FeatureCard = ({ title, description, icon, link, color }) => (
  <Link 
    to={link} 
    className={`block p-6 rounded-lg transition-transform hover:scale-105 ${color}`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 minecraft-font">{title}</h3>
    <p className="mb-4">{description}</p>
    <span className="inline-flex items-center font-medium">
      En savoir plus
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </span>
  </Link>
);

// Composant pour les cartes de versions
const VersionCard = ({ version, name, date, features }) => {
  // Formater la date
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  return (
    <div className="version-card">
      <div className="flex justify-between items-start mb-2">
        <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded font-bold minecraft-font">
          {version}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formattedDate}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
      <Link 
        to={`/wiki/${version}`} 
        className="mt-3 inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
      >
        Détails
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
};

export default Home;