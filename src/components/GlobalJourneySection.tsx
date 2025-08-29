import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Users, Clock, Zap, Globe, Star, Heart, Trophy, Plane } from "lucide-react";

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
}

const countryExperiences: CountryExperience[] = [
  {
    id: "brasil",
    country: "Brasil",
    flag: "🇧🇷",
    duration: "Base de origem",
    highlights: ["Mentalidade empreendedora", "Networking local", "Inovação tech nacional"],
    skills: ["Portuguese Native", "Brazilian Business Culture", "Local Market Knowledge"],
    projects: 15,
    culturalInsights: "Criatividade e jeitinho brasileiro na resolução de problemas",
    workStyle: "Colaborativo e relationship-driven",
    businessTips: "Relacionamentos pessoais são fundamentais",
    coordinates: { x: 25, y: 70 }
  },
  {
    id: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    duration: "3 meses",
    highlights: ["Gateway para Europa", "Cultura tech emergente", "Qualidade de vida"],
    skills: ["European Work Standards", "Cross-cultural Adaptation", "EU Business Practices"],
    projects: 8,
    culturalInsights: "Equilibrio perfeito entre tradição e inovação",
    workStyle: "Estruturado mas flexível",
    businessTips: "Pontualidade e profissionalismo são essenciais",
    coordinates: { x: 48, y: 35 }
  },
  {
    id: "franca",
    country: "França",
    flag: "🇫🇷",
    duration: "2 meses",
    highlights: ["Excelência técnica", "Design thinking", "Luxo e qualidade"],
    skills: ["French Business Etiquette", "Design Excellence", "Luxury Market Understanding"],
    projects: 6,
    culturalInsights: "Attention aux détails e perfectionnisme elevado",
    workStyle: "Formal e orientado à qualidade",
    businessTips: "Preparação e apresentação impecáveis",
    coordinates: { x: 50, y: 28 }
  },
  {
    id: "holanda",
    country: "Holanda",
    flag: "🇳🇱",
    duration: "2 meses",
    highlights: ["Inovação sustentável", "Trabalho remoto avançado", "Eficiência máxima"],
    skills: ["Sustainable Tech", "Remote Work Mastery", "Efficiency Optimization"],
    projects: 7,
    culturalInsights: "Diretos, honestos e incrivelmente eficientes",
    workStyle: "Horizontal e result-oriented",
    businessTips: "Seja direto e vá direto ao ponto",
    coordinates: { x: 52, y: 22 }
  },
  {
    id: "alemanha",
    country: "Alemanha",
    flag: "🇩🇪",
    duration: "2 meses",
    highlights: ["Engenharia de software", "Processos robustos", "Indústria 4.0"],
    skills: ["German Engineering Mindset", "Process Optimization", "Industrial Innovation"],
    projects: 9,
    culturalInsights: "Precisão, planejamento e execução perfeita",
    workStyle: "Estruturado e process-driven",
    businessTips: "Planejamento detalhado é fundamental",
    coordinates: { x: 54, y: 25 }
  },
  {
    id: "republica-tcheca",
    country: "República Tcheca",
    flag: "🇨🇿",
    duration: "1.5 meses",
    highlights: ["Hub tech emergente", "Custo-benefício", "História rica"],
    skills: ["Eastern European Markets", "Cost-Effective Solutions", "Cultural Bridge Building"],
    projects: 5,
    culturalInsights: "Resilência histórica aplicada à inovação",
    workStyle: "Pragmático e value-focused",
    businessTips: "Value for money é muito valorizado",
    coordinates: { x: 56, y: 30 }
  },
  {
    id: "austria",
    country: "Áustria",
    flag: "🇦🇹",
    duration: "1 mês",
    highlights: ["Precisão suíça", "Qualidade premium", "Stability-first"],
    skills: ["Premium Service Delivery", "Quality Assurance", "Stability-focused Development"],
    projects: 4,
    culturalInsights: "Qualidade sobre quantidade, sempre",
    workStyle: "Conservative mas premium",
    businessTips: "Qualidade e confiabilidade são inegociáveis",
    coordinates: { x: 56, y: 32 }
  },
  {
    id: "italia",
    country: "Itália",
    flag: "🇮🇹",
    duration: "1.5 meses",
    highlights: ["Design excepcional", "Criatividade", "La dolce vita workflow"],
    skills: ["Italian Design Principles", "Creative Problem Solving", "Lifestyle Integration"],
    projects: 6,
    culturalInsights: "Beleza e funcionalidade podem coexistir",
    workStyle: "Creative e relationship-centered",
    businessTips: "Relacionamentos e estética importam muito",
    coordinates: { x: 54, y: 38 }
  },
  {
    id: "argentina",
    country: "Argentina",
    flag: "🇦🇷",
    duration: "2 meses",
    highlights: ["Paixão latino", "Resilência econômica", "Tango mindset"],
    skills: ["Latin American Markets", "Economic Adaptability", "Passionate Leadership"],
    projects: 8,
    culturalInsights: "Paixão e adaptabilidade em constante mudança",
    workStyle: "Passionate e adaptable",
    businessTips: "Flexibilidade e relacionamentos calorosos",
    coordinates: { x: 30, y: 85 }
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
        <h2 className="text-6xl font-bold bg-gradient-to-r from-journey-travel to-journey-growth bg-clip-text text-transparent mb-4">
          🌍 Jornada Global 2024
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Uma transformação completa através de culturas, mentalidades e formas de trabalhar
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center bg-gradient-to-br from-journey-travel/10 to-journey-travel/5">
          <div className="text-2xl font-bold text-journey-travel">{countryExperiences.length}</div>
          <div className="text-sm text-muted-foreground">Países Explorados</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-growth/10 to-journey-growth/5">
          <div className="text-2xl font-bold text-journey-growth">{totalProjects}</div>
          <div className="text-sm text-muted-foreground">Projetos Desenvolvidos</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-tech/10 to-journey-tech/5">
          <div className="text-2xl font-bold text-journey-tech">{uniqueSkills.length}</div>
          <div className="text-sm text-muted-foreground">Skills Únicas</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-journey-music/10 to-journey-music/5">
          <div className="text-2xl font-bold text-journey-music">15+</div>
          <div className="text-sm text-muted-foreground">Culturas</div>
        </Card>
      </div>

      {/* Interactive World Map */}
      <Card className="p-8 bg-gradient-to-br from-journey-travel/10 to-background border-journey-travel/20 relative overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <Globe className="w-6 h-6 text-journey-travel" />
            Mapa Interativo da Jornada
          </h3>
          <p className="text-muted-foreground">Clique em cada país para explorar as experiências</p>
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
                <text
                  x={country.coordinates.x}
                  y={country.coordinates.y - 5}
                  fontSize="2"
                  fill="white"
                  textAnchor="middle"
                  className="pointer-events-none text-xs font-medium"
                >
                  {country.flag}
                </text>
              </g>
            ))}
          </svg>

          {/* Country tooltips */}
          {hoveredCountry && (
            <div
              className="absolute bg-black/80 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-10 backdrop-blur-sm"
              style={{
                left: `${countryExperiences.find(c => c.id === hoveredCountry)?.coordinates.x}%`,
                top: `${(countryExperiences.find(c => c.id === hoveredCountry)?.coordinates.y || 0) - 10}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="font-medium">{countryExperiences.find(c => c.id === hoveredCountry)?.country}</div>
              <div className="text-xs opacity-80">{countryExperiences.find(c => c.id === hoveredCountry)?.duration}</div>
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
              <div className="text-3xl">{country.flag}</div>
              <div>
                <h4 className="font-semibold text-lg">{country.country}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {country.duration}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-journey-tech" />
                <span className="text-sm font-medium">{country.projects} projetos</span>
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
            <div className="text-6xl">{selectedCountry.flag}</div>
            <div>
              <h3 className="text-3xl font-bold">{selectedCountry.country}</h3>
              <p className="text-journey-travel font-medium">{selectedCountry.duration}</p>
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
                  Insights Culturais
                </h4>
                <p className="text-muted-foreground italic">"{selectedCountry.culturalInsights}"</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Estilo de Trabalho
                </h4>
                <p className="text-muted-foreground">{selectedCountry.workStyle}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Dica de Negócios
                </h4>
                <p className="text-muted-foreground">💡 {selectedCountry.businessTips}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Principais Highlights
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
                  Skills Específicas
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

              <div className="flex items-center gap-4 p-4 bg-journey-travel/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-journey-travel" />
                <div>
                  <div className="font-semibold">{selectedCountry.projects} Projetos Desenvolvidos</div>
                  <div className="text-sm text-muted-foreground">Durante {selectedCountry.duration}</div>
                </div>
              </div>
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