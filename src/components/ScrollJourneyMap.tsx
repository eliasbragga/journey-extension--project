import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Code, MapPin, Briefcase, Plane, Calendar, Star, Heart, Zap, Globe, Award, Rocket, ArrowLeft } from "lucide-react";
import GlobalJourneySection from "./GlobalJourneySection";

interface JourneyEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "music" | "tech" | "travel" | "growth";
  icon: React.ReactNode;
  location?: string;
  skills?: string[];
  details?: string;
  achievement?: string;
  interactive?: {
    type: "click" | "hover" | "scroll";
    action: string;
  };
}

const journeyData: JourneyEvent[] = [
  {
    id: "music-start",
    year: 2007,
    title: "Primeiros Acordes",
    description: "O início de uma paixão que duraria para sempre.",
    details: "Aos primeiros toques no instrumento, descobri um mundo de possibilidades. A música se tornou minha linguagem universal, ensinando disciplina, criatividade e expressão.",
    category: "music",
    icon: <Music className="w-6 h-6" />,
    skills: ["Criatividade", "Disciplina", "Expressão artística", "Dedicação"],
    achievement: "Primeiros acordes dominados",
    interactive: {
      type: "click",
      action: "Toque para ouvir os primeiros acordes!"
    }
  },
  {
    id: "music-professional",
    year: 2015,
    title: "Música Profissional",
    description: "Transformando paixão em profissão.",
    details: "8 anos de prática levaram à profissionalização. Comecei a entender a música não apenas como arte, mas como negócio, networking e forma de conexão humana.",
    category: "music",
    icon: <Star className="w-6 h-6" />,
    skills: ["Performance", "Repasse de conhecimento", "Facilidade em aprender", "Produção musical", "Networking", "Business musical"],
    achievement: "Primeira apresentação profissional",
    interactive: {
      type: "hover",
      action: "Passe o mouse para ver o setlist!"
    }
  },
  {
    id: "tech-discovery",
    year: 2021,
    title: "Descoberta Tech",
    description: "O mundo digital me chamou.",
    details: "Uma nova paixão surge: programação. Como na música, encontrei na tecnologia uma forma de criar, de resolver problemas e de impactar vidas. O freelancer nascia.",
    category: "tech",
    icon: <Code className="w-6 h-6" />,
    skills: ["JavaScript", "Vue.js", "React", "Angular", "UI/UX", "Resolução de problema", "Autodidatismo"],
    achievement: "Primeiro projeto freelancer entregue",
    interactive: {
      type: "click",
      action: "Clique para ver o primeiro código!"
    }
  },
  {
    id: "startup-era",
    year: 2022,
    title: "Era Startup",
    description: "ERP, clientes, crescimento acelerado.",
    details: "Mergulhei no mundo das startups. Desenvolvimento de ERP, contato direto com clientes, aprendendo que tecnologia é sobre pessoas, não apenas código.",
    category: "tech",
    icon: <Rocket className="w-6 h-6" />,
    skills: ["Sistemas ERP", "Frontend", "Vue.js", "React", "Docker", "Entregas de qualidade", "Sucesso do Cliente", "Visão de Produto"],
    achievement: "Sistema ERP adotado no mercado e consolidado como solução de gestão empresarial",
    interactive: {
      type: "scroll",
      action: "Role para ver métricas de impacto!"
    }
  },
  {
    id: "fullstack-evolution",
    year: 2023,
    title: "Evolução Full Stack",
    description: "Backend, mentoria, liderança técnica, IA.",
    details: "Na AZ Tecnologia, evoluí para full stack. Java, Spring Boot, arquitetura, e mais importante: comecei a mentorar outros desenvolvedores e fiz a migração de tecnologia - vue2 para vue3. Liderança técnica nasceu.",
    category: "tech",
    icon: <Zap className="w-6 h-6" />,
    skills: ["Java", "Spring Boot","Vue.js", "Angular", "Docker", "Mensageria", "Micro-serviços", "Micro-frontends", "Mentoria", "Arquitetura", "Referência Técnica", "Migração de Tecnologia"],
    achievement: "Mentorei 5+ desenvolvedores junior",
    interactive: {
      type: "click",
      action: "Clique para ver projetos desenvolvidos!"
    }
  },
  {
    id: "global-journey",
    year: 2024,
    title: "Jornada Global - O Core da Transformação",
    description: "10 países, infinitas lições, transformação completa.",
    details: "A flexibilidade do trabalho remoto me permitiu uma experiência única: trabalhar enquanto explorava culturas, mentalidades e formas de viver completamente diferentes. Cada país trouxe uma lição única, moldando não apenas minhas skills técnicas, mas principalmente minha visão de mundo e capacidade de adaptação.",
    category: "travel",
    icon: <Globe className="w-6 h-6" />,
    location: "Brasil → Portugal → França → Holanda → Alemanha → Rep. Tcheca → Áustria → Itália → Argentina",
    skills: [
      "Remote Leadership", "Cultural Intelligence", "Global Mindset", "Cross-timezone Management", 
      "Multilingual Communication", "Agile Adaptation", "International Business", "Geo-distributed Teams",
      "European Work Culture", "Latin Mindset Integration", "Digital Nomad Workflow", "Global Networking"
    ],
    achievement: "10 países, 50+ projetos, 15+ culturas experienciadas",
    interactive: {
      type: "click",
      action: "Explore cada país da jornada!"
    }
  }
];

const ScrollJourneyMap = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeInteraction, setActiveInteraction] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);

      // Check which sections are visible
      const newVisibleSections = new Set<string>();
      sectionRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
          newVisibleSections.add(id);
        }
      });
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInteraction = (eventId: string) => {
    setActiveInteraction(eventId);
    setTimeout(() => setActiveInteraction(null), 3000);
  };

  const getParallaxStyle = (index: number) => {
    const offset = scrollProgress * 100 * (index + 1) * 0.1;
    return {
      transform: `translateY(${offset}px)`,
    };
  };

  const categoryColors = {
    music: "journey-music",
    tech: "journey-tech", 
    travel: "journey-travel",
    growth: "journey-growth"
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Journey Progress Line */}
      <div className="fixed left-8 top-0 h-screen w-1 bg-border/30 z-10">
     <Button
  variant="outline"
  size="lg"
  onClick={() => window.open("http://localhost:8081/", "_self")}
  className="ml-5 mt-3 text-blue-700 font-semibold rounded-lg
             border-2 border-blue-700 px-3 flex items-center gap-2
             transition-all duration-300 group"
>
  <ArrowLeft className="w-5 h-5" />
  <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300">
    Voltar para Portfólio
  </span>
</Button>

        <div 
          className="w-full bg-gradient-journey transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        <div 
          className="absolute w-4 h-4 bg-primary rounded-full border-4 border-background -left-1.5 transition-all duration-300"
          style={{ top: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-journey opacity-10" />
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 animate-slide-in-up">
            Minha Jornada
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            Uma história de paixão, crescimento e descobertas - da música à tecnologia, passando pelo mundo
          </p>
          <div className="animate-bounce-gentle">
            <Badge variant="outline" className="text-lg px-6 py-2 animate-glow-pulse">
              Role para começar a jornada ↓
            </Badge>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float opacity-20">
          <Music className="w-12 h-12 text-journey-music" />
        </div>
        <div className="absolute top-40 right-32 animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <Code className="w-12 h-12 text-journey-tech" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <Globe className="w-12 h-12 text-journey-travel" />
        </div>
      </section>

      {/* Journey Sections */}
      {journeyData.map((event, index) => (
        <section 
          key={event.id}
          ref={(el) => {
            if (el) sectionRefs.current.set(event.id, el as HTMLDivElement);
          }}
          className={`${event.id === 'global-journey' ? 'min-h-auto py-20' : 'min-h-screen'} flex items-center py-20 relative`}
          style={getParallaxStyle(index)}
        >
          <div className="container mx-auto px-4 pl-20">
            {/* Special Global Journey Section */}
            {event.id === 'global-journey' ? (
              <GlobalJourneySection 
                isVisible={visibleSections.has(event.id)}
                activeInteraction={activeInteraction}
                onInteraction={handleInteraction}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div 
                  className={`space-y-6 ${
                    visibleSections.has(event.id) ? 'animate-slide-in-left' : 'opacity-0'
                  } ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 rounded-full bg-${categoryColors[event.category]}/20 ${
                      activeInteraction === event.id ? 'animate-pulse-glow' : ''
                    }`}>
                      {event.icon}
                    </div>
                    <div>
                      <Badge className={`bg-${categoryColors[event.category]}/20 text-${categoryColors[event.category]} border-${categoryColors[event.category]}/30 mb-2`}>
                        {event.year}
                      </Badge>
                      <h2 className="text-4xl font-bold">{event.title}</h2>
                    </div>
                  </div>

                  <p className="text-xl text-muted-foreground">{event.description}</p>
                  
                  <p className="text-foreground leading-relaxed">{event.details}</p>

                  {event.location && (
                    <div className="flex items-start gap-2 p-4 bg-card/50 rounded-lg border">
                      <MapPin className="w-5 h-5 text-journey-travel mt-1 flex-shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}

                  {event.achievement && (
                    <div className="flex items-center gap-2 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="font-medium">{event.achievement}</span>
                    </div>
                  )}

                  {event.skills && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Skills Desenvolvidas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className={`transition-all duration-300 hover:scale-105 ${
                              visibleSections.has(event.id) ? 'animate-slide-in-up' : ''
                            }`}
                            style={{ animationDelay: `${skillIndex * 0.1}s` }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* {event.interactive && (
                    <Button
                      className={`mt-6 ${
                        activeInteraction === event.id ? 'animate-glow-pulse' : ''
                      }`}
                      onClick={() => handleInteraction(event.id)}
                      onMouseEnter={() => event.interactive?.type === 'hover' && handleInteraction(event.id)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {event.interactive.action}
                    </Button>
                  )} */}
                </div>

                {/* Interactive Visual Side */}
                <div 
                  className={`relative ${
                    visibleSections.has(event.id) ? 'animate-slide-in-right' : 'opacity-0'
                  } ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <Card className={`p-8 bg-gradient-to-br from-${categoryColors[event.category]}/10 to-${categoryColors[event.category]}/5 border-${categoryColors[event.category]}/20 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-radial from-transparent via-current to-transparent" />
                    </div>
                    
                    {/* Large Year Display */}
                    <div className="text-center relative z-10">
                      <div className={`text-8xl font-black text-${categoryColors[event.category]}/30 mb-4 group-hover:text-${categoryColors[event.category]}/50 transition-colors duration-300`}>
                        {event.year}
                      </div>
                      
                      {/* Interactive Element */}
                      <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-${categoryColors[event.category]} to-${categoryColors[event.category]}/60 flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300 ${
                        activeInteraction === event.id ? 'animate-bounce-gentle' : ''
                      }`}>
                        <div className="text-4xl">
                          {event.icon}
                        </div>
                      </div>

                      {activeInteraction === event.id && (
                        <div className="mt-4 animate-slide-in-up">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            ✨ Interação ativada!
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Enhanced Final Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-background relative">
        <div className="text-center z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            A Jornada Continua...
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cada passo foi uma lição, cada desafio uma oportunidade de crescimento. 
            A jornada global especialmente moldou uma visão de mundo única.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
          <Badge className="text-lg px-4 py-2 min-w-[200px] text-center" variant="outline">
            {journeyData.length} marcos alcançados
          </Badge>
          <Badge className="text-lg px-4 py-2 min-w-[200px] text-center bg-journey-travel/20 text-journey-travel border-journey-travel/30">
            10 países explorados
          </Badge>
          <Badge className="text-lg px-4 py-2 min-w-[200px] text-center" variant="outline">
            ∞ possibilidades à frente
          </Badge>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-5">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open("http://localhost:8081/", "_self")}
              className="ml-3 mt-3 text-blue-700 font-semibold rounded-lg
                        border-2 border-blue-700 px-3 flex items-center gap-2
                        transition-colors duration-300
                        hover:text-blue-900 hover:border-blue-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollJourneyMap;