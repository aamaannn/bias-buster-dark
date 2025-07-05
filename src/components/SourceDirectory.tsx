import React, { useState } from 'react';
import { Search, Filter, Building, Shield, AlertTriangle, ExternalLink } from 'lucide-react';
import { useBias } from '../context/BiasContext';
import { useLanguage } from '../context/LanguageContext';

export const SourceDirectory: React.FC = () => {
  const { darkMode } = useBias();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBias, setSelectedBias] = useState('all');

  const sources = [
    { name: 'Reuters', bias: 'center', factuality: 9.2, country: 'UK', category: 'International' },
    { name: 'Associated Press', bias: 'center', factuality: 9.1, country: 'US', category: 'International' },
    { name: 'BBC News', bias: 'center-left', factuality: 8.8, country: 'UK', category: 'International' },
    { name: 'NPR', bias: 'center-left', factuality: 8.9, country: 'US', category: 'National' },
    { name: 'Wall Street Journal', bias: 'center-right', factuality: 8.7, country: 'US', category: 'Business' },
    { name: 'The Guardian', bias: 'center-left', factuality: 8.3, country: 'UK', category: 'International' },
    { name: 'Fox News', bias: 'right', factuality: 6.8, country: 'US', category: 'National' },
    { name: 'CNN', bias: 'center-left', factuality: 7.4, country: 'US', category: 'National' },
    { name: 'The New York Times', bias: 'center-left', factuality: 8.1, country: 'US', category: 'National' },
    { name: 'Financial Times', bias: 'center-right', factuality: 8.6, country: 'UK', category: 'Business' },
  ];

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBias = selectedBias === 'all' || source.bias === selectedBias;
    return matchesSearch && matchesBias;
  });

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'left': return 'bg-blue-500';
      case 'center-left': return 'bg-blue-400';
      case 'center': return 'bg-gray-500';
      case 'center-right': return 'bg-red-400';
      case 'right': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getFactualityColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {t('sources.title')}
        </h2>
        <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('sources.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className={`backdrop-blur-md rounded-2xl p-6 border mb-6 ${
          darkMode 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('sources.search.placeholder')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedBias}
                onChange={(e) => setSelectedBias(e.target.value)}
                className={`pl-10 pr-8 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-[150px] transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">{t('sources.filter.all')}</option>
                <option value="left">{t('bias.left')}</option>
                <option value="center-left">{t('bias.centerLeft')}</option>
                <option value="center">{t('bias.center')}</option>
                <option value="center-right">{t('bias.centerRight')}</option>
                <option value="right">{t('bias.right')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source, index) => (
            <div key={index} className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-200 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{source.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{source.country}</p>
                  </div>
                </div>
                <ExternalLink className={`w-4 h-4 transition-colors cursor-pointer ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('sources.political')}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getBiasColor(source.bias)}`}></div>
                    <span className={`text-sm capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t(`bias.${source.bias.replace('-', '')}`)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('bias.factuality')}</span>
                  <span className={`text-sm font-medium ${getFactualityColor(source.factuality)}`}>
                    {source.factuality}/10
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('sources.category')}</span>
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{source.category}</span>
                </div>
              </div>

              <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div className={`flex items-center space-x-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Shield className="w-3 h-3" />
                  <span>{t('sources.verified')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};