import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Minecraft Wiki Toolkit</h3>
            <p className="text-gray-400">
              Un outil avancé pour explorer, créer et optimiser dans l'univers de Minecraft.
            </p>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Accueil</FooterLink>
              <FooterLink to="/wiki">Wiki</FooterLink>
              <FooterLink to="/blueprints">Blueprints</FooterLink>
              <FooterLink to="/calculators">Calculateurs</FooterLink>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <FooterLink to="/docs">Documentation</FooterLink>
              <FooterLink to="/api-docs">API</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <FooterLink to="/terms">Conditions d'utilisation</FooterLink>
              <FooterLink to="/privacy">Politique de confidentialité</FooterLink>
              <FooterLink to="/licenses">Licences</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Minecraft Wiki Toolkit. Tous droits réservés.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Minecraft est une marque déposée de Mojang Studios. Ce site n'est pas affilié à Mojang Studios.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
