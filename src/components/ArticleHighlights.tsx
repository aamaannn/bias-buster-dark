import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import { useBias } from '../context/BiasContext';
import { useLanguage } from '../context/LanguageContext';

interface Highlight {
  text: string;
  type: 'emotional' | 'bias';
  explanation: string;
}

interface ArticleHighlightsProps {
  highlights: Highlight[];
}

export const ArticleHighlights: React.FC<ArticleHighlightsProps> = ({ highlights }) => {
  const { darkMode } = useBias();
  const { t } = useLanguage();

  return (
    <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5"></div>
      
      <div className="relative p-8">
        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('highlights.title')}
        </h3>
        
        <div className="space-y-4">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/60 border-gray-200/50 hover:bg-white/80'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl ${
                    highlight.type === 'emotional' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                  }`}>
                    {highlight.type === 'emotional' ? (
                      <Zap className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        highlight.type === 'emotional' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {highlight.type === 'emotional' ? t('highlights.emotional') : t('highlights.bias')}
                      </span>
                    </div>
                    <p className={`font-medium mb-2 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      "{highlight.text}"
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {highlight.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};