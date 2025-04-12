import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Wiki from './pages/Wiki';
import Blueprints from './pages/Blueprints';
import BlueprintEditor from './pages/BlueprintEditor';
import Calculators from './pages/Calculators';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:version" element={<Wiki />} />
          <Route path="/blueprints" element={<Blueprints />} />
          <Route path="/blueprints/editor" element={<BlueprintEditor />} />
          <Route path="/blueprints/editor/:id" element={<BlueprintEditor />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
