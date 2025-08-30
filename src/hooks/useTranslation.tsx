import { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    'header.language': 'Idioma',
    'header.theme': 'Tema',
    'header.light': 'Claro',
    'header.dark': 'Escuro',
    
    // Hero Section
    'hero.title': 'Minha Jornada',
    'hero.subtitle': 'Uma história de paixão, crescimento e descobertas - da música à tecnologia, passando pelo mundo',
    'hero.scrollPrompt': 'Role para começar a jornada ↓',
    
    // Journey Events
    'journey.musicStart.title': 'Primeiros Acordes',
    'journey.musicStart.description': 'O início de uma paixão que duraria para sempre.',
    'journey.musicStart.details': 'Aos primeiros toques no instrumento, descobri um mundo de possibilidades. A música se tornou minha linguagem universal, ensinando disciplina, criatividade e expressão.',
    'journey.musicStart.achievement': 'Primeiros acordes dominados',
    'journey.musicStart.interactive': 'Toque para ouvir os primeiros acordes!',
    
    'journey.musicProfessional.title': 'Música Profissional',
    'journey.musicProfessional.description': 'Transformando paixão em profissão.',
    'journey.musicProfessional.details': '8 anos de prática levaram à profissionalização. Comecei a entender a música não apenas como arte, mas como negócio, networking e forma de conexão humana.',
    'journey.musicProfessional.achievement': 'Primeira apresentação profissional',
    'journey.musicProfessional.interactive': 'Passe o mouse para ver o setlist!',
    
    'journey.techDiscovery.title': 'Descoberta Tech',
    'journey.techDiscovery.description': 'O mundo digital me chamou.',
    'journey.techDiscovery.details': 'Uma nova paixão surge: programação. Como na música, encontrei na tecnologia uma forma de criar, de resolver problemas e de impactar vidas. O freelancer nascia.',
    'journey.techDiscovery.achievement': 'Primeiro projeto freelancer entregue',
    'journey.techDiscovery.interactive': 'Clique para ver o primeiro código!',
    
    'journey.startupEra.title': 'Era Startup',
    'journey.startupEra.description': 'ERP, clientes, crescimento acelerado.',
    'journey.startupEra.details': 'Mergulhei no mundo das startups. Desenvolvimento de ERP, contato direto com clientes, aprendendo que tecnologia é sobre pessoas, não apenas código.',
    'journey.startupEra.achievement': 'Sistema ERP usado por 100+ empresas',
    'journey.startupEra.interactive': 'Role para ver métricas de impacto!',
    
    'journey.fullstackEvolution.title': 'Evolução Full Stack',
    'journey.fullstackEvolution.description': 'Backend, mentoria, liderança técnica.',
    'journey.fullstackEvolution.details': 'Na AZ Tecnologia, evoluí para full stack. Java, Spring Boot, arquitetura, e mais importante: comecei a mentorar outros desenvolvedores. Liderança técnica nasceu.',
    'journey.fullstackEvolution.achievement': 'Mentorei 5+ desenvolvedores junior',
    'journey.fullstackEvolution.interactive': 'Clique para ver projetos desenvolvidos!',
    
    'journey.globalJourney.title': 'Jornada Global - O Core da Transformação',
    'journey.globalJourney.description': '10 países, infinitas lições, transformação completa.',
    'journey.globalJourney.details': 'A flexibilidade do trabalho remoto me permitiu uma experiência única: trabalhar enquanto explorava culturas, mentalidades e formas de viver completamente diferentes. Cada país trouxe uma lição única, moldando não apenas minhas skills técnicas, mas principalmente minha visão de mundo e capacidade de adaptação.',
    'journey.globalJourney.achievement': '10 países, 50+ projetos, 15+ culturas experienciadas',
    'journey.globalJourney.interactive': 'Explore cada país da jornada!',
    
    // Global Journey Section
    'global.title': '🌍 Jornada Global 2024',
    'global.subtitle': 'Uma transformação completa através de culturas, mentalidades e formas de trabalhar',
    'global.stats.countries': 'Países Explorados',
    'global.stats.projects': 'Projetos Desenvolvidos',
    'global.stats.skills': 'Skills Únicas',
    'global.stats.cultures': 'Culturas',
    'global.map.title': 'Mapa Interativo da Jornada',
    'global.map.subtitle': 'Clique em cada país para explorar as experiências',
    'global.insights.cultural': 'Insights Culturais',
    'global.insights.workStyle': 'Estilo de Trabalho',
    'global.insights.businessTips': 'Dica de Negócios',
    'global.highlights': 'Principais Highlights',
    'global.skills': 'Skills Específicas',
    
    // Skills
    'skills.developed': 'Skills Desenvolvidas:',
    'skills.interaction': '✨ Interação ativada!',
    
    // Final Section
    'final.title': 'A Jornada Continua...',
    'final.description': 'Cada passo foi uma lição, cada desafio uma oportunidade de crescimento. A jornada global especialmente moldou uma visão de mundo única.',
    'final.milestones': 'marcos alcançados',
    'final.countries': 'países explorados',
    'final.possibilities': '∞ possibilidades à frente'
  },
  en: {
    // Header
    'header.language': 'Language',
    'header.theme': 'Theme',
    'header.light': 'Light',
    'header.dark': 'Dark',
    
    // Hero Section
    'hero.title': 'My Journey',
    'hero.subtitle': 'A story of passion, growth and discoveries - from music to technology, around the world',
    'hero.scrollPrompt': 'Scroll to start the journey ↓',
    
    // Journey Events
    'journey.musicStart.title': 'First Chords',
    'journey.musicStart.description': 'The beginning of a lifelong passion.',
    'journey.musicStart.details': 'With the first touches on the instrument, I discovered a world of possibilities. Music became my universal language, teaching discipline, creativity and expression.',
    'journey.musicStart.achievement': 'First chords mastered',
    'journey.musicStart.interactive': 'Click to hear the first chords!',
    
    'journey.musicProfessional.title': 'Professional Music',
    'journey.musicProfessional.description': 'Turning passion into profession.',
    'journey.musicProfessional.details': '8 years of practice led to professionalization. I began to understand music not just as art, but as business, networking and a form of human connection.',
    'journey.musicProfessional.achievement': 'First professional performance',
    'journey.musicProfessional.interactive': 'Hover to see the setlist!',
    
    'journey.techDiscovery.title': 'Tech Discovery',
    'journey.techDiscovery.description': 'The digital world called me.',
    'journey.techDiscovery.details': 'A new passion emerged: programming. Like music, I found in technology a way to create, solve problems and impact lives. The freelancer was born.',
    'journey.techDiscovery.achievement': 'First freelance project delivered',
    'journey.techDiscovery.interactive': 'Click to see the first code!',
    
    'journey.startupEra.title': 'Startup Era',
    'journey.startupEra.description': 'ERP, clients, accelerated growth.',
    'journey.startupEra.details': 'I dove into the startup world. ERP development, direct client contact, learning that technology is about people, not just code.',
    'journey.startupEra.achievement': 'ERP system used by 100+ companies',
    'journey.startupEra.interactive': 'Scroll to see impact metrics!',
    
    'journey.fullstackEvolution.title': 'Full Stack Evolution',
    'journey.fullstackEvolution.description': 'Backend, mentorship, technical leadership.',
    'journey.fullstackEvolution.details': 'At AZ Technology, I evolved to full stack. Java, Spring Boot, architecture, and most importantly: I started mentoring other developers. Technical leadership was born.',
    'journey.fullstackEvolution.achievement': 'Mentored 5+ junior developers',
    'journey.fullstackEvolution.interactive': 'Click to see developed projects!',
    
    'journey.globalJourney.title': 'Global Journey - The Core of Transformation',
    'journey.globalJourney.description': '10 countries, infinite lessons, complete transformation.',
    'journey.globalJourney.details': 'Remote work flexibility allowed me a unique experience: working while exploring completely different cultures, mindsets and ways of living. Each country brought a unique lesson, shaping not only my technical skills, but mainly my worldview and adaptability.',
    'journey.globalJourney.achievement': '10 countries, 50+ projects, 15+ cultures experienced',
    'journey.globalJourney.interactive': 'Explore each country of the journey!',
    
    // Global Journey Section
    'global.title': '🌍 Global Journey 2024',
    'global.subtitle': 'A complete transformation through cultures, mindsets and ways of working',
    'global.stats.countries': 'Countries Explored',
    'global.stats.projects': 'Projects Developed',
    'global.stats.skills': 'Unique Skills',
    'global.stats.cultures': 'Cultures',
    'global.map.title': 'Interactive Journey Map',
    'global.map.subtitle': 'Click on each country to explore the experiences',
    'global.insights.cultural': 'Cultural Insights',
    'global.insights.workStyle': 'Work Style',
    'global.insights.businessTips': 'Business Tips',
    'global.highlights': 'Main Highlights',
    'global.skills': 'Specific Skills',
    
    // Skills
    'skills.developed': 'Skills Developed:',
    'skills.interaction': '✨ Interaction activated!',
    
    // Final Section
    'final.title': 'The Journey Continues...',
    'final.description': 'Each step was a lesson, each challenge an opportunity for growth. The global journey especially shaped a unique worldview.',
    'final.milestones': 'milestones achieved',
    'final.countries': 'countries explored',
    'final.possibilities': '∞ possibilities ahead'
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};