import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { useBias } from '../context/BiasContext';
import { useLanguage } from '../context/LanguageContext';

interface SocialReaction {
  platform: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  topComments: string[];
  url: string;
}

interface SocialReactionsProps {
  reactions: SocialReaction[];
}

export const SocialReactions: React.FC<SocialReactionsProps> = ({ reactions }) => {
  const { darkMode } = useBias();
  const { t } = useLanguage();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return ThumbsUp;
      case 'negative': return ThumbsDown;
      default: return MessageCircle;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
      
      <div className="relative p-8">
        <h3 className={`text-2xl font-bold mb-6 flex items-center space-x-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span>{t('social.title')}</span>
        </h3>
        
        <div className="space-y-6">
          {reactions.map((reaction, index) => {
            const SentimentIcon = getSentimentIcon(reaction.sentiment);
            return (
              <div
                key={index}
                className={`rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/60 border-gray-200/50 hover:bg-white/80'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {reaction.platform.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {reaction.platform}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm">
                          <SentimentIcon className={`w-4 h-4 ${getSentimentColor(reaction.sentiment)}`} />
                          <span className={`capitalize font-medium ${getSentimentColor(reaction.sentiment)}`}>
                            {t(`social.${reaction.sentiment}`)}
                          </span>
                          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {reaction.engagement} {t('social.interactions')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {reaction.url && (
                      <a
                        href={reaction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {reaction.topComments.length > 0 && (
                    <div className="space-y-3">
                      <h5 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('social.comments')}
                      </h5>
                      {reaction.topComments.slice(0, 3).map((comment, commentIndex) => (
                        <div
                          key={commentIndex}
                          className={`text-sm p-4 rounded-xl border-l-4 border-blue-500/30 ${
                            darkMode 
                              ? 'bg-white/5 text-gray-300' 
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          "{comment.length > 150 ? comment.substring(0, 150) + '...' : comment}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};