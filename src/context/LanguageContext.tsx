import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'ja' | 'de' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLanguageName: (lang: Language) => string;
  getLanguageFlag: (lang: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language metadata
const languageMetadata = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  ja: { name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' }
};

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
  },
  ja: {
    // Header
    'header.title': 'バイアス・バスター',
    'header.analyzer': '記事分析器',
    'header.dashboard': 'ダッシュボード',
    'header.sources': 'ソース・ディレクトリ',
    'header.settings': 'API設定',
    'header.darkMode': 'ダークモードに切り替え',
    'header.lightMode': 'ライトモードに切り替え',
    
    // Article Analyzer
    'analyzer.hero.badge': 'AI搭載バイアス検出',
    'analyzer.hero.title1': '隠れた',
    'analyzer.hero.title2': 'メディアバイアスを発見',
    'analyzer.hero.subtitle': '高度なAIを使用して、政治的バイアス、感情的言語、事実性を検出し、任意のニュース記事を瞬時に分析します。異なるソースが同じストーリーをどのように枠組み化するかを確認してください。',
    'analyzer.input.placeholder': 'ニュース記事のURLをここに貼り付けてください...',
    'analyzer.button.analyze': '今すぐ分析',
    'analyzer.button.analyzing': '分析中...',
    'analyzer.examples.title': 'これらのサンプル記事を試してください：',
    'analyzer.results.title': '分析完了',
    'analyzer.results.subtitle': 'AI搭載バイアス検出結果',
    'analyzer.results.source': 'ソース：',
    'analyzer.results.author': '著者：',
    'analyzer.results.published': '公開日：',
    'analyzer.results.viewOriginal': '元記事を表示',
    'analyzer.error.title': '分析エラー',
    
    // Bias Visualization
    'bias.political': '政治的バイアス',
    'bias.factuality': '事実性',
    'bias.emotional': '感情的言語',
    'bias.political.desc': 'コンテンツで検出された政治的傾向',
    'bias.factuality.desc': '信頼性と正確性の評価',
    'bias.emotional.desc': '言語の感情的強度',
    'bias.left': '左派',
    'bias.centerLeft': '中道左派',
    'bias.center': '中道',
    'bias.centerRight': '中道右派',
    'bias.right': '右派',
    'bias.factuality.high': '高',
    'bias.factuality.medium': '中',
    'bias.factuality.low': '低',
    'bias.emotional.high': '高',
    'bias.emotional.medium': '中',
    'bias.emotional.low': '低',
    
    // Comparative Coverage
    'coverage.title': '比較報道',
    'coverage.subtitle': '異なるソースがこのストーリーをどのように枠組み化するか',
    'coverage.factuality': '事実性：',
    'coverage.tone': 'トーン：',
    'coverage.noResults': '比較報道が見つかりません',
    'coverage.noResults.subtitle': 'より最近の、または人気のある記事を分析してみてください',
    
    // Article Highlights
    'highlights.title': 'コンテンツ分析',
    'highlights.emotional': '感情的言語',
    'highlights.bias': '潜在的バイアス',
    
    // Social Reactions
    'social.title': 'ソーシャルメディアの反応',
    'social.interactions': 'インタラクション',
    'social.comments': 'トップコメント：',
    'social.positive': 'ポジティブ',
    'social.negative': 'ネガティブ',
    'social.neutral': 'ニュートラル',
    
    // Dashboard
    'dashboard.hero.badge': '個人分析',
    'dashboard.hero.title1': 'あなたの読書',
    'dashboard.hero.title2': '分析',
    'dashboard.hero.subtitle': 'ニュース消費パターン、バイアス露出、読書習慣を時間の経過とともに追跡します。',
    'dashboard.stats.analyzed': '分析された記事',
    'dashboard.stats.alerts': 'バイアスアラート',
    'dashboard.stats.sources': '追跡されたソース',
    'dashboard.stats.streak': '読書ストリーク',
    'dashboard.stats.days': '日',
    'dashboard.bias.title': 'バイアス露出履歴',
    'dashboard.bias.subtitle': '過去5日間の読書パターン',
    'dashboard.bias.articles': '記事',
    'dashboard.sources.title': 'トップソース',
    'dashboard.sources.subtitle': '最も読まれたニュースソース',
    'dashboard.sources.articles': '記事',
    'dashboard.sources.factuality': '事実性',
    
    // Source Directory
    'sources.title': 'ニュースソース・ディレクトリ',
    'sources.subtitle': '世界の主要ニュース組織のバイアス評価と事実性スコアを探索します。',
    'sources.search.placeholder': 'ニュースソースを検索...',
    'sources.filter.all': 'すべてのバイアスタイプ',
    'sources.political': '政治的バイアス',
    'sources.category': 'カテゴリ',
    'sources.verified': '検証済みソース',
    
    // API Settings
    'api.title': 'API設定',
    'api.configured.title': 'APIキーが設定されました！',
    'api.configured.subtitle': 'NewsAPIとGNewsキーはすでに設定され、使用準備が整っています。',
    'api.newsapi.label': 'NewsAPIキー',
    'api.newsapi.placeholder': 'newsapi.orgから取得',
    'api.gnews.label': 'GNews APIキー',
    'api.gnews.placeholder': 'gnews.ioから取得',
    'api.info.title': 'API情報：',
    'api.info.newsapi': 'NewsAPI：100リクエスト/日（無料プラン）',
    'api.info.gnews': 'GNews：100リクエスト/日（無料プラン）',
    'api.storage.note': 'APIキーはブラウザにローカルに保存されます',
    'api.button.update': 'キーを更新',
    'api.button.saved': '保存されました！',
    
    // Common
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.close': '閉じる',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.new': '新着！',
    'common.unknown': '不明',
  },
  de: {
    // Header
    'header.title': 'Bias Buster',
    'header.analyzer': 'Artikel-Analysator',
    'header.dashboard': 'Dashboard',
    'header.sources': 'Quellen-Verzeichnis',
    'header.settings': 'API-Einstellungen',
    'header.darkMode': 'Zu dunklem Modus wechseln',
    'header.lightMode': 'Zu hellem Modus wechseln',
    
    // Article Analyzer
    'analyzer.hero.badge': 'KI-gestützte Bias-Erkennung',
    'analyzer.hero.title1': 'Versteckte',
    'analyzer.hero.title2': 'Medien-Bias aufdecken',
    'analyzer.hero.subtitle': 'Analysieren Sie jeden Nachrichtenartikel sofort mit unserer fortschrittlichen KI, um politische Voreingenommenheit, emotionale Sprache und Faktizität zu erkennen. Sehen Sie, wie verschiedene Quellen dieselbe Geschichte rahmen.',
    'analyzer.input.placeholder': 'Fügen Sie hier eine beliebige Nachrichtenartikel-URL ein...',
    'analyzer.button.analyze': 'Jetzt analysieren',
    'analyzer.button.analyzing': 'Analysiere...',
    'analyzer.examples.title': 'Probieren Sie diese Beispielartikel aus:',
    'analyzer.results.title': 'Analyse abgeschlossen',
    'analyzer.results.subtitle': 'KI-gestützte Bias-Erkennungsergebnisse',
    'analyzer.results.source': 'Quelle:',
    'analyzer.results.author': 'Autor:',
    'analyzer.results.published': 'Veröffentlicht:',
    'analyzer.results.viewOriginal': 'Originalartikel anzeigen',
    'analyzer.error.title': 'Analyse-Fehler',
    
    // Bias Visualization
    'bias.political': 'Politische Voreingenommenheit',
    'bias.factuality': 'Faktizität',
    'bias.emotional': 'Emotionale Sprache',
    'bias.political.desc': 'Im Inhalt erkannte politische Neigung',
    'bias.factuality.desc': 'Zuverlässigkeits- und Genauigkeitsbewertung',
    'bias.emotional.desc': 'Emotionale Intensität in der Sprache',
    'bias.left': 'Links',
    'bias.centerLeft': 'Mitte-Links',
    'bias.center': 'Mitte',
    'bias.centerRight': 'Mitte-Rechts',
    'bias.right': 'Rechts',
    'bias.factuality.high': 'Hoch',
    'bias.factuality.medium': 'Mittel',
    'bias.factuality.low': 'Niedrig',
    'bias.emotional.high': 'Hoch',
    'bias.emotional.medium': 'Mittel',
    'bias.emotional.low': 'Niedrig',
    
    // Comparative Coverage
    'coverage.title': 'Vergleichende Berichterstattung',
    'coverage.subtitle': 'Wie verschiedene Quellen diese Geschichte rahmen',
    'coverage.factuality': 'Faktizität:',
    'coverage.tone': 'Ton:',
    'coverage.noResults': 'Keine vergleichende Berichterstattung gefunden',
    'coverage.noResults.subtitle': 'Versuchen Sie, einen aktuelleren oder beliebteren Artikel zu analysieren',
    
    // Article Highlights
    'highlights.title': 'Inhaltsanalyse',
    'highlights.emotional': 'Emotionale Sprache',
    'highlights.bias': 'Potenzielle Voreingenommenheit',
    
    // Social Reactions
    'social.title': 'Social Media Reaktionen',
    'social.interactions': 'Interaktionen',
    'social.comments': 'Top-Kommentare:',
    'social.positive': 'positiv',
    'social.negative': 'negativ',
    'social.neutral': 'neutral',
    
    // Dashboard
    'dashboard.hero.badge': 'Persönliche Analytik',
    'dashboard.hero.title1': 'Ihre Lese-',
    'dashboard.hero.title2': 'Analytik',
    'dashboard.hero.subtitle': 'Verfolgen Sie Ihre Nachrichtenkonsummuster, Bias-Exposition und Lesegewohnheiten im Laufe der Zeit.',
    'dashboard.stats.analyzed': 'Analysierte Artikel',
    'dashboard.stats.alerts': 'Bias-Warnungen',
    'dashboard.stats.sources': 'Verfolgte Quellen',
    'dashboard.stats.streak': 'Lese-Serie',
    'dashboard.stats.days': 'Tage',
    'dashboard.bias.title': 'Bias-Expositionsverlauf',
    'dashboard.bias.subtitle': 'Lesemuster der letzten 5 Tage',
    'dashboard.bias.articles': 'Artikel',
    'dashboard.sources.title': 'Top-Quellen',
    'dashboard.sources.subtitle': 'Meistgelesene Nachrichtenquellen',
    'dashboard.sources.articles': 'Artikel',
    'dashboard.sources.factuality': 'Faktizität',
    
    // Source Directory
    'sources.title': 'Nachrichtenquellen-Verzeichnis',
    'sources.subtitle': 'Erkunden Sie Bias-Bewertungen und Faktizitätswerte für große Nachrichtenorganisationen weltweit.',
    'sources.search.placeholder': 'Nachrichtenquellen suchen...',
    'sources.filter.all': 'Alle Bias-Typen',
    'sources.political': 'Politische Voreingenommenheit',
    'sources.category': 'Kategorie',
    'sources.verified': 'Verifizierte Quelle',
    
    // API Settings
    'api.title': 'API-Konfiguration',
    'api.configured.title': 'API-Schlüssel konfiguriert!',
    'api.configured.subtitle': 'Ihre NewsAPI- und GNews-Schlüssel sind bereits eingerichtet und einsatzbereit.',
    'api.newsapi.label': 'NewsAPI-Schlüssel',
    'api.newsapi.placeholder': 'Von newsapi.org erhalten',
    'api.gnews.label': 'GNews API-Schlüssel',
    'api.gnews.placeholder': 'Von gnews.io erhalten',
    'api.info.title': 'API-Informationen:',
    'api.info.newsapi': 'NewsAPI: 100 Anfragen/Tag (kostenloser Tarif)',
    'api.info.gnews': 'GNews: 100 Anfragen/Tag (kostenloser Tarif)',
    'api.storage.note': 'API-Schlüssel werden lokal in Ihrem Browser gespeichert',
    'api.button.update': 'Schlüssel aktualisieren',
    'api.button.saved': 'Gespeichert!',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.close': 'Schließen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.new': 'Neu!',
    'common.unknown': 'Unbekannt',
  },
  fr: {
    // Header
    'header.title': 'Détecteur de Biais',
    'header.analyzer': 'Analyseur d\'Articles',
    'header.dashboard': 'Tableau de Bord',
    'header.sources': 'Répertoire des Sources',
    'header.settings': 'Paramètres API',
    'header.darkMode': 'Passer en mode sombre',
    'header.lightMode': 'Passer en mode clair',
    
    // Article Analyzer
    'analyzer.hero.badge': 'Détection de Biais par IA',
    'analyzer.hero.title1': 'Découvrez les',
    'analyzer.hero.title2': 'Biais Médiatiques Cachés',
    'analyzer.hero.subtitle': 'Analysez instantanément tout article de presse avec notre IA avancée pour détecter les biais politiques, le langage émotionnel et la factualité. Voyez comment différentes sources encadrent la même histoire.',
    'analyzer.input.placeholder': 'Collez ici l\'URL de n\'importe quel article de presse...',
    'analyzer.button.analyze': 'Analyser Maintenant',
    'analyzer.button.analyzing': 'Analyse en cours...',
    'analyzer.examples.title': 'Essayez ces articles d\'exemple :',
    'analyzer.results.title': 'Analyse Terminée',
    'analyzer.results.subtitle': 'Résultats de détection de biais par IA',
    'analyzer.results.source': 'Source :',
    'analyzer.results.author': 'Auteur :',
    'analyzer.results.published': 'Publié :',
    'analyzer.results.viewOriginal': 'Voir l\'Article Original',
    'analyzer.error.title': 'Erreur d\'Analyse',
    
    // Bias Visualization
    'bias.political': 'Biais Politique',
    'bias.factuality': 'Factualité',
    'bias.emotional': 'Langage Émotionnel',
    'bias.political.desc': 'Tendance politique détectée dans le contenu',
    'bias.factuality.desc': 'Évaluation de la fiabilité et de la précision',
    'bias.emotional.desc': 'Intensité émotionnelle dans le langage',
    'bias.left': 'Gauche',
    'bias.centerLeft': 'Centre-Gauche',
    'bias.center': 'Centre',
    'bias.centerRight': 'Centre-Droite',
    'bias.right': 'Droite',
    'bias.factuality.high': 'Élevée',
    'bias.factuality.medium': 'Moyenne',
    'bias.factuality.low': 'Faible',
    'bias.emotional.high': 'Élevé',
    'bias.emotional.medium': 'Moyen',
    'bias.emotional.low': 'Faible',
    
    // Comparative Coverage
    'coverage.title': 'Couverture Comparative',
    'coverage.subtitle': 'Comment différentes sources encadrent cette histoire',
    'coverage.factuality': 'Factualité :',
    'coverage.tone': 'Ton :',
    'coverage.noResults': 'Aucune couverture comparative trouvée',
    'coverage.noResults.subtitle': 'Essayez d\'analyser un article plus récent ou populaire',
    
    // Article Highlights
    'highlights.title': 'Analyse du Contenu',
    'highlights.emotional': 'Langage Émotionnel',
    'highlights.bias': 'Biais Potentiel',
    
    // Social Reactions
    'social.title': 'Réactions des Réseaux Sociaux',
    'social.interactions': 'interactions',
    'social.comments': 'Commentaires Principaux :',
    'social.positive': 'positif',
    'social.negative': 'négatif',
    'social.neutral': 'neutre',
    
    // Dashboard
    'dashboard.hero.badge': 'Analytiques Personnelles',
    'dashboard.hero.title1': 'Vos Analytiques',
    'dashboard.hero.title2': 'de Lecture',
    'dashboard.hero.subtitle': 'Suivez vos habitudes de consommation d\'actualités, l\'exposition aux biais et les habitudes de lecture au fil du temps.',
    'dashboard.stats.analyzed': 'Articles Analysés',
    'dashboard.stats.alerts': 'Alertes de Biais',
    'dashboard.stats.sources': 'Sources Suivies',
    'dashboard.stats.streak': 'Série de Lecture',
    'dashboard.stats.days': 'jours',
    'dashboard.bias.title': 'Historique d\'Exposition aux Biais',
    'dashboard.bias.subtitle': 'Modèles de lecture des 5 derniers jours',
    'dashboard.bias.articles': 'articles',
    'dashboard.sources.title': 'Sources Principales',
    'dashboard.sources.subtitle': 'Sources d\'actualités les plus lues',
    'dashboard.sources.articles': 'articles',
    'dashboard.sources.factuality': 'factualité',
    
    // Source Directory
    'sources.title': 'Répertoire des Sources d\'Actualités',
    'sources.subtitle': 'Explorez les évaluations de biais et les scores de factualité pour les principales organisations de presse mondiales.',
    'sources.search.placeholder': 'Rechercher des sources d\'actualités...',
    'sources.filter.all': 'Tous les Types de Biais',
    'sources.political': 'Biais Politique',
    'sources.category': 'Catégorie',
    'sources.verified': 'Source Vérifiée',
    
    // API Settings
    'api.title': 'Configuration API',
    'api.configured.title': 'Clés API Configurées !',
    'api.configured.subtitle': 'Vos clés NewsAPI et GNews sont déjà configurées et prêtes à utiliser.',
    'api.newsapi.label': 'Clé NewsAPI',
    'api.newsapi.placeholder': 'Obtenir de newsapi.org',
    'api.gnews.label': 'Clé API GNews',
    'api.gnews.placeholder': 'Obtenir de gnews.io',
    'api.info.title': 'Informations API :',
    'api.info.newsapi': 'NewsAPI : 100 requêtes/jour (niveau gratuit)',
    'api.info.gnews': 'GNews : 100 requêtes/jour (niveau gratuit)',
    'api.storage.note': 'Les clés API sont stockées localement dans votre navigateur',
    'api.button.update': 'Mettre à Jour les Clés',
    'api.button.saved': 'Sauvegardé !',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.close': 'Fermer',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.new': 'Nouveau !',
    'common.unknown': 'Inconnu',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first, then browser language, then default to English
    const saved = localStorage.getItem('language') as Language;
    if (saved && Object.keys(languageMetadata).includes(saved)) {
      return saved;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    
    return 'en';
  });

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Get language display name
  const getLanguageName = (lang: Language): string => {
    return languageMetadata[lang].name;
  };

  // Get language flag emoji
  const getLanguageFlag = (lang: Language): string => {
    return languageMetadata[lang].flag;
  };

  // Save language preference and update document language
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    
    // Update document direction
    document.documentElement.dir = languageMetadata[language].dir;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      getLanguageName,
      getLanguageFlag
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