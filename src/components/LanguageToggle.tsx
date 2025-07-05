import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBias } from '../context/BiasContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { darkMode } = useBias();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        darkMode 
          ? 'bg-white/10 hover:bg-white/20 text-white' 
          : 'bg-black/10 hover:bg-black/20 text-gray-700'
      }`}
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  );
};