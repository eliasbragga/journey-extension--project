import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Users, Clock, Zap, Globe, Star, Heart, Trophy, Plane, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface CountryExperience {
  id: string;
  country: string;
  flag: string;
  duration: string;
  highlights: string[];
  skills: string[];
  projects: number;
  culturalInsights: string;
  workStyle: string;
  businessTips: string;
  coordinates: { x: number; y: number };
  year: string,
  code: string,
}

const countryExperiences: CountryExperience[] = [
  {
    id: "brasil",
    country: "Brasil",
    flag: "br",
    code: "br",
    duration: "Base de origem",
    year: "Base de origem",
    highlights: ["Mentalidade empreendedora", "Networking local", "Inovação tech nacional"],
    skills: ["Português Nativo", "Cultura de Negócios Brasileira", "Conhecimento do Mercado Local"],
    projects: 15,
    culturalInsights: "Criatividade e jeitinho brasileiro na resolução de problemas",
    workStyle: "Colaborativo e orientado a relacionamentos",
    businessTips: "Relacionamentos pessoais são fundamentais",
    coordinates: { x: 10, y: 76 }
  },
  {
    id: "portugal",
    country: "Portugal",
    flag: "pt",
    code: "",
    duration: "3 meses",
    year: "2024 | 2025",
    highlights: ["Porta de entrada para a Europa", "Cultura tech emergente", "Qualidade de vida"],
    skills: ["Padrões Europeus de Trabalho", "Adaptação Intercultural", "Práticas de Negócios da UE"],
    projects: 8,
    culturalInsights: "Equilíbrio perfeito entre tradição e inovação",
    workStyle: "Estruturado mas flexível",
    businessTips: "Pontualidade e profissionalismo são essenciais",
    coordinates: { x: 15, y: 35 }
  },
  {
    id: "espanha",
    country: "Espanha",
    flag: "es",
    code: "",
    duration: "3 meses",
    year: "2024",
    highlights: ["Colaboração", "Criatividade", "Flexibilidade"],
    skills: ["Colaboração em Equipe", "Resolução Criativa de Problemas"],
    projects: 5,
    culturalInsights: "Valorização das relações pessoais e equilíbrio entre vida e trabalho",
    workStyle: "Dinâmico e colaborativo",
    businessTips: "Invista tempo em criar confiança antes de fechar negócios",
    coordinates: { x: 35, y: 35 }
  },
  {
    id: "franca",
    country: "França",
    flag: "fr",
    code: "",
    duration: "2 meses",
    year: "2024",
    highlights: ["Excelência técnica", "Design thinking", "Luxo e qualidade"],
    skills: ["Comunicação Intercultural", "Excelência em Design", "Desenvolvimento Front-end"],
    projects: 6,
    culturalInsights: "Attention aux détails e perfectionnisme élevé",
    workStyle: "Formal e orientado à qualidade",
    businessTips: "Preparação e apresentação impecáveis",
    coordinates: { x: 38, y: 23 }
  },
  {
    id: "holanda",
    country: "Holanda",
    flag: "nl",
    code: "",
    duration: "2 meses",
    year: "2024",
    highlights: ["Inovação sustentável", "Trabalho remoto avançado", "Eficiência máxima"],
    skills: ["Tecnologia Sustentável", "Domínio do Trabalho Remoto", "Otimização da Eficiência"],
    projects: 7,
    culturalInsights: "Diretos, honestos e incrivelmente eficientes",
    workStyle: "Horizontal e orientado a resultados",
    businessTips: "Seja direto e vá direto ao ponto",
    coordinates: { x: 55, y: 16}
  },
  {
    id: "alemanha",
    country: "Alemanha",
    flag: "de",
    code: "",
    duration: "2 meses",
    year: "2024",
    highlights: ["Engenharia de software", "Processos robustos", "Indústria 4.0"],
    skills: ["Arquitetura de Software", "Performance Web", "Desenvolvimento Full-Stack"],
    projects: 9,
    culturalInsights: "Precisão, planejamento e execução perfeita",
    workStyle: "Estruturado e orientado a processos",
    businessTips: "Planejamento detalhado é fundamental",
    coordinates: {  x: 75, y: 25 }
  },
  {
    id: "republica-tcheca",
    country: "República Tcheca",
    flag: "cz",
    code: "",
    duration: "1.5 meses",
    year: "2024",
    highlights: ["Hub tech emergente", "Custo-benefício", "História rica"],
    skills: ["Segurança Web", "Soluções Custo-Efetivas", "Construção de Pontes Culturais"],
    projects: 5,
    culturalInsights: "Resiliência histórica aplicada à inovação",
    workStyle: "Pragmático e focado em valor",
    businessTips: "O custo-benefício é muito valorizado",
    coordinates: { x: 85, y: 40 }
  },
  {
    id: "austria",
    country: "Áustria",
    flag: "at",
    code: "",
    duration: "1 mês",
    year: "2024",
    highlights: ["Precisão suíça", "Qualidade premium", "Estabilidade em primeiro lugar"],
    skills: ["Entrega de Serviço Premium", "Garantia de Qualidade", "Desenvolvimento focado em Estabilidade"],
    projects: 4,
    culturalInsights: "Qualidade sobre quantidade, sempre",
    workStyle: "Conservador mas premium",
    businessTips: "Qualidade e confiabilidade são inegociáveis",
    coordinates: {  x: 85, y: 55 }
  },
  {
    id: "italia",
    country: "Itália",
    flag: "it",
    code: "",
    duration: "1.5 meses",
    year: "2024 | 2025",
    highlights: ["Design excepcional", "Criatividade", "Fluxo de trabalho la dolce vita"],
    skills: ["Princípios do Design Italiano", "Resolução Criativa de Problemas", "Integração ao Estilo de Vida"],
    projects: 6,
    culturalInsights: "Beleza e funcionalidade podem coexistir",
    workStyle: "Criativo e orientado a relacionamentos",
    businessTips: "Relacionamentos e estética importam muito",
    coordinates: {  x: 65, y: 70  }
  },
  {
    id: "argentina",
    country: "Argentina",
    flag: "ar",
    code: "",
    duration: "2 meses",
    year: "2025",
    highlights: ["Paixão latina", "Resiliência econômica", "Criatividade cultural"],
    skills: ["Mercados Latino-Americanos", "Adaptabilidade Econômica", "Liderança Apaixonada"],
    projects: 8,
    culturalInsights: "Paixão e adaptabilidade em constante mudança",
    workStyle: "Apaixonado e adaptável",
    businessTips: "Flexibilidade e relacionamentos calorosos",
    coordinates: { x: 30, y: 93 }
  }

];

interface GlobalJourneySectionProps {
  isVisible: boolean;
  activeInteraction: string | null;
  onInteraction: (id: string) => void;
}

const GlobalJourneySection: React.FC<GlobalJourneySectionProps> = ({
  isVisible,
  activeInteraction,
  onInteraction
}) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<CountryExperience | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const totalProjects = countryExperiences.reduce((sum, country) => sum + country.projects, 0);
  const uniqueSkills = [...new Set(countryExperiences.flatMap(c => c.skills))];

  const handleCountryClick = (country: CountryExperience) => {
    setSelectedCountry(country);
    onInteraction(country.id);
  };

  return (
    <div className="space-y-8">
      {/* Main Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center" >
          <h2 className="text-6xl font-bold from-journey-travel mb-5 mr-3">
            🌍
          </h2>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-journey-travel to-journey-growth bg-clip-text text-transparent mb-4">
            {t('global.title')}
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {t('global.subtitle')}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center bg-gradient-to-br from-journey-travel/10 to-journey-travel/5">
          <div className="text-2xl font-bold text-journey-travel">{countryExperiences.length}</div>
          <div className="text-sm text-muted-foreground">{t('global.stats.countries')}</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-growth/10 to-journey-growth/5">
          <div className="text-2xl font-bold text-journey-growth">+ 90%</div>
          <div className="text-sm text-muted-foreground">De Cobertura de testes</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-tech/10 to-journey-tech/5">
          <div className="text-2xl font-bold text-journey-tech">{uniqueSkills.length}</div>
          <div className="text-sm text-muted-foreground">{t('global.stats.skills')}</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-music/10 to-journey-music/5">
          <div className="text-2xl font-bold text-journey-music">15+</div>
          <div className="text-sm text-muted-foreground">{t('global.stats.cultures')}</div>
        </Card>
      </div>

      {/* Interactive World Map */}
      <Card className="p-8 bg-gradient-to-br from-journey-travel/10 to-background border-journey-travel/20 relative overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <Globe className="w-6 h-6 text-journey-travel" />
            {t('global.map.title')}
          </h3>
          <p className="text-muted-foreground">{t('global.map.subtitle')}</p>
        </div>

        <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            <path
              d={`M ${countryExperiences.map(country => `${country.coordinates.x},${country.coordinates.y}`).join(' L ')}`}
              stroke="hsl(var(--journey-travel))"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2,2"
              className="opacity-40"
            />

            {/* Country markers */}
            {countryExperiences.map((country, index) => (
              <g key={country.id}>
                {/* Pulse animation for active country */}
                {(hoveredCountry === country.id || selectedCountry?.id === country.id) && (
                  <circle
                    cx={country.coordinates.x}
                    cy={country.coordinates.y}
                    r="4"
                    fill="hsl(var(--journey-travel))"
                    className="animate-ping opacity-75"
                  />
                )}
                
                {/* Main marker */}
                <circle
                  cx={country.coordinates.x}
                  cy={country.coordinates.y}
                  r="2.5"
                  fill="hsl(var(--journey-travel))"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredCountry === country.id ? 'r-4' : ''
                  }`}
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
                
                {/* Country label */}
                <image
                className="rounded-sm"
                  href={`/folder/${country.flag}.svg`}
                  x={country.coordinates.x - 5}
                  y={country.coordinates.y - 13}
                  width="10"
                  height="10"
                />
              </g>
            ))}
          </svg>

          {/* Country tooltips */}
          {hoveredCountry && (
            <div
              className="absolute bg-black/80 text-white px-3 py-2 rounded-lg text-sm top-0 pointer-events-none z-10 backdrop-blur-sm"
              style={{
                left: `${countryExperiences.find(c => c.id === hoveredCountry)?.coordinates.x + 10}%`,
                top: `${(countryExperiences.find(c => c.id === hoveredCountry)?.coordinates.y || 0) - 10}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="font-medium">{countryExperiences.find(c => c.id === hoveredCountry)?.country}</div>
            </div>
          )}
        </div>
      </Card>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countryExperiences.map((country, index) => (
          <Card
            key={country.id}
            className={`p-6 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl border-journey-travel/20 ${
              selectedCountry?.id === country.id 
                ? 'ring-2 ring-journey-travel bg-journey-travel/10 shadow-lg shadow-journey-travel/20' 
                : 'hover:border-journey-travel/40'
            } ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleCountryClick(country)}
          >
            <div className="flex items-center gap-3 mb-4">
                <img
                  src={`/folder/${country.flag}.svg`}
                  alt={country.country}
                    className="w-6 h-6 object-contain rounded-sm shadow-sm"
                />
              <div>
                <h4 className="font-semibold text-lg">{country.country}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {country.year}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-journey-tech" />
                <span className="text-sm font-medium">Cultura Local</span>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Highlights:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {country.highlights.slice(0, 2).map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                  {country.highlights.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{country.highlights.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Skills:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {country.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} className="text-xs bg-journey-travel/20 text-journey-travel border-journey-travel/30">
                      {skill}
                    </Badge>
                  ))}
                  {country.skills.length > 2 && (
                    <Badge className="text-xs bg-journey-travel/20 text-journey-travel border-journey-travel/30">
                      +{country.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Country Detail */}
      {selectedCountry && (
        <Card className="p-8 bg-gradient-to-br from-journey-travel/20 to-journey-travel/5 border-journey-travel/30 animate-slide-in-up">
          <div className="flex items-center gap-4 mb-6">
          <img
              src={`/folder/${selectedCountry.flag}.svg`}
              alt={selectedCountry.country}
                className="w-9 h-9 object-contain rounded-sm shadow-sm"
            />
            <div>
              <h3 className="text-3xl font-bold">{selectedCountry.country}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setSelectedCountry(null)}
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t('global.insights.cultural')}
                </h4>
                <p className="text-muted-foreground italic">"{selectedCountry.culturalInsights}"</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {t('global.insights.workStyle')}
                </h4>
                <p className="text-muted-foreground">{selectedCountry.workStyle}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  {t('global.insights.businessTips')}
                </h4>
                <p className="text-muted-foreground">💡 {selectedCountry.businessTips}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  {t('global.highlights')}
                </h4>
                <div className="space-y-2">
                  {selectedCountry.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-journey-travel rounded-full" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t('global.skills')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="bg-journey-travel/20 text-journey-travel border-journey-travel/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* <div className="flex items-center gap-4 p-4 bg-journey-travel/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-journey-travel" />
                <div>
                  <div className="font-semibold">{selectedCountry.projects} Projetos Desenvolvidos</div>
                  <div className="text-sm text-muted-foreground">Durante {selectedCountry.duration}</div>
                </div>
              </div> */}
            </div>
          </div>
        </Card>
      )}

      {/* Core Skills Acquired */}
      <Card className="p-8 bg-gradient-to-br from-journey-growth/10 to-journey-growth/5 border-journey-growth/20">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-journey-growth" />
          Core Skills da Jornada Global
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uniqueSkills.map((skill, index) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className={`p-3 text-center justify-center transition-all duration-300 hover:scale-105 hover:bg-journey-growth/10 ${
                isVisible ? 'animate-slide-in-up' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Impact Summary */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
        <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          O Impacto da Jornada Global
        </h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
          Mais que skills técnicas, essa jornada transformou minha perspectiva sobre trabalho, vida e conexões humanas. 
          Cada país contribuiu para uma visão global única, preparando-me para desafios internacionais e liderança multicultural.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Badge className="bg-gradient-to-r from-journey-travel to-journey-growth text-white px-4 py-2 text-sm">
            🌍 Mentalidade Global
          </Badge>
          <Badge className="bg-gradient-to-r from-journey-tech to-journey-music text-white px-4 py-2 text-sm">
            🤝 Liderança Multicultural
          </Badge>
          <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 text-sm">
            🚀 Visão Internacional
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default GlobalJourneySection;