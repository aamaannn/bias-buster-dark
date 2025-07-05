import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useBias } from '../context/BiasContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, getLanguageName, getLanguageFlag } = useLanguage();
  const { darkMode } = useBias();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = ['en', 'es', 'ja', 'de', 'fr'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          darkMode 
            ? 'bg-white/10 hover:bg-white/20 text-white' 
            : 'bg-black/10 hover:bg-black/20 text-gray-700'
        }`}
        title="Change Language / Cambiar Idioma / 言語を変更 / Sprache ändern / Changer de langue"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium flex items-center space-x-1">
          <span>{getLanguageFlag(language)}</span>
          <span>{language.toUpperCase()}</span>
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 py-2 w-48 rounded-2xl border backdrop-blur-xl shadow-2xl z-50 transition-all duration-200 ${
          darkMode 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/90 border-gray-200/50'
        }`}>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-all duration-200 ${
                language === lang
                  ? darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-black/10 text-gray-900'
                  : darkMode
                    ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                    : 'hover:bg-black/5 text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{getLanguageFlag(lang)}</span>
              <div className="flex-1">
                <div className="font-medium">{getLanguageName(lang)}</div>
                <div className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {lang.toUpperCase()}
                </div>
              </div>
              {language === lang && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};