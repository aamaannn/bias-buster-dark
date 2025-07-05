import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and values
const translations = {
  en: {
    // Header
    'header.title': 'Bias Buster',
    'header.analyzer': 'Article Analyzer',
    'header.dashboard': 'Dashboard',
    'header.sources': 'Source Directory',
    'header.settings': 'API Settings',
    'header.darkMode': 'Switch to dark mode',
    'header.lightMode': 'Switch to light mode',
    
    // Article Analyzer
    'analyzer.hero.badge': 'AI-Powered Bias Detection',
    'analyzer.hero.title1': 'Uncover Hidden',
    'analyzer.hero.title2': 'Media Bias',
    'analyzer.hero.subtitle': 'Analyze any news article instantly with our advanced AI to detect political bias, emotional language, and factuality. See how different sources frame the same story.',
    'analyzer.input.placeholder': 'Paste any news article URL here...',
    'analyzer.button.analyze': 'Analyze Now',
    'analyzer.button.analyzing': 'Analyzing...',
    'analyzer.examples.title': 'Try these example articles:',
    'analyzer.results.title': 'Analysis Complete',
    'analyzer.results.subtitle': 'AI-powered bias detection results',
    'analyzer.results.source': 'Source:',
    'analyzer.results.author': 'Author:',
    'analyzer.results.published': 'Published:',
    'analyzer.results.viewOriginal': 'View Original Article',
    'analyzer.error.title': 'Analysis Error',
    
    // Bias Visualization
    'bias.political': 'Political Bias',
    'bias.factuality': 'Factuality',
    'bias.emotional': 'Emotional Language',
    'bias.political.desc': 'Political leaning detected in content',
    'bias.factuality.desc': 'Reliability and accuracy assessment',
    'bias.emotional.desc': 'Emotional intensity in language',
    'bias.left': 'Left',
    'bias.centerLeft': 'Center-Left',
    'bias.center': 'Center',
    'bias.centerRight': 'Center-Right',
    'bias.right': 'Right',
    'bias.factuality.high': 'High',
    'bias.factuality.medium': 'Medium',
    'bias.factuality.low': 'Low',
    'bias.emotional.high': 'High',
    'bias.emotional.medium': 'Medium',
    'bias.emotional.low': 'Low',
    
    // Comparative Coverage
    'coverage.title': 'Comparative Coverage',
    'coverage.subtitle': 'How different sources frame this story',
    'coverage.factuality': 'Factuality:',
    'coverage.tone': 'Tone:',
    'coverage.noResults': 'No comparative coverage found',
    'coverage.noResults.subtitle': 'Try analyzing a more recent or popular article',
    
    // Article Highlights
    'highlights.title': 'Content Analysis',
    'highlights.emotional': 'Emotional Language',
    'highlights.bias': 'Potential Bias',
    
    // Social Reactions
    'social.title': 'Social Media Reactions',
    'social.interactions': 'interactions',
    'social.comments': 'Top Comments:',
    'social.positive': 'positive',
    'social.negative': 'negative',
    'social.neutral': 'neutral',
    
    // Dashboard
    'dashboard.hero.badge': 'Personal Analytics',
    'dashboard.hero.title1': 'Your Reading',
    'dashboard.hero.title2': 'Analytics',
    'dashboard.hero.subtitle': 'Track your news consumption patterns, bias exposure, and reading habits over time.',
    'dashboard.stats.analyzed': 'Articles Analyzed',
    'dashboard.stats.alerts': 'Bias Alerts',
    'dashboard.stats.sources': 'Sources Tracked',
    'dashboard.stats.streak': 'Reading Streak',
    'dashboard.stats.days': 'days',
    'dashboard.bias.title': 'Bias Exposure History',
    'dashboard.bias.subtitle': 'Last 5 days of reading patterns',
    'dashboard.bias.articles': 'articles',
    'dashboard.sources.title': 'Top Sources',
    'dashboard.sources.subtitle': 'Most read news sources',
    'dashboard.sources.articles': 'articles',
    'dashboard.sources.factuality': 'factuality',
    
    // Source Directory
    'sources.title': 'News Source Directory',
    'sources.subtitle': 'Explore bias ratings and factuality scores for major news organizations worldwide.',
    'sources.search.placeholder': 'Search news sources...',
    'sources.filter.all': 'All Bias Types',
    'sources.political': 'Political Bias',
    'sources.category': 'Category',
    'sources.verified': 'Verified Source',
    
    // API Settings
    'api.title': 'API Configuration',
    'api.configured.title': 'API Keys Configured!',
    'api.configured.subtitle': 'Your NewsAPI and GNews keys are already set up and ready to use.',
    'api.newsapi.label': 'NewsAPI Key',
    'api.newsapi.placeholder': 'Get from newsapi.org',
    'api.gnews.label': 'GNews API Key',
    'api.gnews.placeholder': 'Get from gnews.io',
    'api.info.title': 'API Information:',
    'api.info.newsapi': 'NewsAPI: 100 requests/day (free tier)',
    'api.info.gnews': 'GNews: 100 requests/day (free tier)',
    'api.storage.note': 'API keys are stored locally in your browser',
    'api.button.update': 'Update Keys',
    'api.button.saved': 'Saved!',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.new': 'New!',
    'common.unknown': 'Unknown',
  },
  es: {
    // Header
    'header.title': 'Detector de Sesgos',
    'header.analyzer': 'Analizador de Artículos',
    'header.dashboard': 'Panel de Control',
    'header.sources': 'Directorio de Fuentes',
    'header.settings': 'Configuración API',
    'header.darkMode': 'Cambiar a modo oscuro',
    'header.lightMode': 'Cambiar a modo claro',
    
    // Article Analyzer
    'analyzer.hero.badge': 'Detección de Sesgos con IA',
    'analyzer.hero.title1': 'Descubre Sesgos',
    'analyzer.hero.title2': 'Mediáticos Ocultos',
    'analyzer.hero.subtitle': 'Analiza cualquier artículo de noticias al instante con nuestra IA avanzada para detectar sesgos políticos, lenguaje emocional y veracidad. Ve cómo diferentes fuentes enmarcan la misma historia.',
    'analyzer.input.placeholder': 'Pega aquí cualquier URL de artículo de noticias...',
    'analyzer.button.analyze': 'Analizar Ahora',
    'analyzer.button.analyzing': 'Analizando...',
    'analyzer.examples.title': 'Prueba estos artículos de ejemplo:',
    'analyzer.results.title': 'Análisis Completo',
    'analyzer.results.subtitle': 'Resultados de detección de sesgos con IA',
    'analyzer.results.source': 'Fuente:',
    'analyzer.results.author': 'Autor:',
    'analyzer.results.published': 'Publicado:',
    'analyzer.results.viewOriginal': 'Ver Artículo Original',
    'analyzer.error.title': 'Error de Análisis',
    
    // Bias Visualization
    'bias.political': 'Sesgo Político',
    'bias.factuality': 'Veracidad',
    'bias.emotional': 'Lenguaje Emocional',
    'bias.political.desc': 'Inclinación política detectada en el contenido',
    'bias.factuality.desc': 'Evaluación de confiabilidad y precisión',
    'bias.emotional.desc': 'Intensidad emocional en el lenguaje',
    'bias.left': 'Izquierda',
    'bias.centerLeft': 'Centro-Izquierda',
    'bias.center': 'Centro',
    'bias.centerRight': 'Centro-Derecha',
    'bias.right': 'Derecha',
    'bias.factuality.high': 'Alta',
    'bias.factuality.medium': 'Media',
    'bias.factuality.low': 'Baja',
    'bias.emotional.high': 'Alto',
    'bias.emotional.medium': 'Medio',
    'bias.emotional.low': 'Bajo',
    
    // Comparative Coverage
    'coverage.title': 'Cobertura Comparativa',
    'coverage.subtitle': 'Cómo diferentes fuentes enmarcan esta historia',
    'coverage.factuality': 'Veracidad:',
    'coverage.tone': 'Tono:',
    'coverage.noResults': 'No se encontró cobertura comparativa',
    'coverage.noResults.subtitle': 'Intenta analizar un artículo más reciente o popular',
    
    // Article Highlights
    'highlights.title': 'Análisis de Contenido',
    'highlights.emotional': 'Lenguaje Emocional',
    'highlights.bias': 'Sesgo Potencial',
    
    // Social Reactions
    'social.title': 'Reacciones en Redes Sociales',
    'social.interactions': 'interacciones',
    'social.comments': 'Comentarios Principales:',
    'social.positive': 'positivo',
    'social.negative': 'negativo',
    'social.neutral': 'neutral',
    
    // Dashboard
    'dashboard.hero.badge': 'Análisis Personal',
    'dashboard.hero.title1': 'Tus Análisis',
    'dashboard.hero.title2': 'de Lectura',
    'dashboard.hero.subtitle': 'Rastrea tus patrones de consumo de noticias, exposición a sesgos y hábitos de lectura a lo largo del tiempo.',
    'dashboard.stats.analyzed': 'Artículos Analizados',
    'dashboard.stats.alerts': 'Alertas de Sesgo',
    'dashboard.stats.sources': 'Fuentes Rastreadas',
    'dashboard.stats.streak': 'Racha de Lectura',
    'dashboard.stats.days': 'días',
    'dashboard.bias.title': 'Historial de Exposición a Sesgos',
    'dashboard.bias.subtitle': 'Últimos 5 días de patrones de lectura',
    'dashboard.bias.articles': 'artículos',
    'dashboard.sources.title': 'Fuentes Principales',
    'dashboard.sources.subtitle': 'Fuentes de noticias más leídas',
    'dashboard.sources.articles': 'artículos',
    'dashboard.sources.factuality': 'veracidad',
    
    // Source Directory
    'sources.title': 'Directorio de Fuentes de Noticias',
    'sources.subtitle': 'Explora calificaciones de sesgo y puntuaciones de veracidad para las principales organizaciones de noticias del mundo.',
    'sources.search.placeholder': 'Buscar fuentes de noticias...',
    'sources.filter.all': 'Todos los Tipos de Sesgo',
    'sources.political': 'Sesgo Político',
    'sources.category': 'Categoría',
    'sources.verified': 'Fuente Verificada',
    
    // API Settings
    'api.title': 'Configuración de API',
    'api.configured.title': '¡Claves API Configuradas!',
    'api.configured.subtitle': 'Tus claves de NewsAPI y GNews ya están configuradas y listas para usar.',
    'api.newsapi.label': 'Clave NewsAPI',
    'api.newsapi.placeholder': 'Obtener de newsapi.org',
    'api.gnews.label': 'Clave API GNews',
    'api.gnews.placeholder': 'Obtener de gnews.io',
    'api.info.title': 'Información de API:',
    'api.info.newsapi': 'NewsAPI: 100 solicitudes/día (nivel gratuito)',
    'api.info.gnews': 'GNews: 100 solicitudes/día (nivel gratuito)',
    'api.storage.note': 'Las claves API se almacenan localmente en tu navegador',
    'api.button.update': 'Actualizar Claves',
    'api.button.saved': '¡Guardado!',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.new': '¡Nuevo!',
    'common.unknown': 'Desconocido',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first, then browser language, then default to English
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'es')) {
      return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    
    return 'en';
  });

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Save language preference and update document language
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    
    // Update document direction (though both English and Spanish are LTR)
    document.documentElement.dir = 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};