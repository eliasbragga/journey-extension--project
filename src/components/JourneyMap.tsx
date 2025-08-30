import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Code, MapPin, Briefcase, Plane, Calendar, BookOpen } from "lucide-react";


interface JourneyEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "music" | "tech" | "travel" | "growth";
  icon: React.ReactNode;
  location?: string;
  skills?: string[];
  x: number;
  y: number;
}

const journeyData: JourneyEvent[] = [
  {
    id: "music-start",
    year: 2007,
    title: "Primeiros Acordes",
    description: "Comecei a tocar música como hobby, desenvolvendo paixão pela arte musical.",
    category: "music",
    icon: <Music className="w-4 h-4" />,
    skills: ["Criatividade", "Disciplina", "Expressão artística"],
    x: 10,
    y: 80
  },
  {
    id: "music-professional",
    year: 2015,
    title: "Entrada no Mundo Musical",
    description: "Iniciei profissionalmente na música, transformando paixão em profissão.",
    category: "music",
    icon: <Music className="w-4 h-4" />,
    skills: ["Performance", "Produção musical", "Networking"],
    x: 20,
    y: 70
  },
  {
    id: "tech-freelancer",
    year: 2021,
    title: "Primeiro Freelancer",
    description: "Entrada no mundo da programação como freelancer, descobrindo nova paixão.",
    category: "tech",
    icon: <Code className="w-4 h-4" />,
    skills: ["JavaScript", "Vue.js", "React", "Angular", "Desenvolvimento web", "UX/UI"],
    x: 35,
    y: 60
  },
  {
    id: "startup-frontend",
    year: 2022,
    title: "Startup - Frontend Developer",
    description: "Entrei em uma startup desenvolvendo sistema ERP, com contato direto com clientes.",
    category: "tech",
    icon: <Briefcase className="w-4 h-4" />,
    skills: ["ERP Systems", "Frontend", "Atendimento ao cliente", "Product Management"],
    x: 50,
    y: 45
  },
  {
    id: "az-tech",
    year: 2023,
    title: "AZ Tecnologia - Full Stack",
    description: "Evolução para full stack, mentoria de novos devs, migrações tecnológicas.",
    category: "tech",
    icon: <Code className="w-4 h-4" />,
    skills: ["Java", "Spring Boot", "Mentoria", "Arquitetura", "Migrações"],
    x: 65,
    y: 35
  },
  {
    id: "world-travel",
    year: 2024,
    title: "Jornada Internacional",
    description: "Viagem por 10 países com flexibilidade geográfica, construindo aplicações e expandindo horizontes.",
    category: "travel",
    icon: <Plane className="w-4 h-4" />,
    location: "Brasil, Portugal, França, Holanda, Alemanha, Rep. Tcheca, Áustria, Itália, Argentina",
    skills: ["Time Management", "Resolução de problemas", "Adaptabilidade", "Multiculturalismo", "Remote Work"],
    x: 85,
    y: 25
  }
];

const categoryColors = {
  music: "journey-music",
  tech: "journey-tech", 
  travel: "journey-travel",
  growth: "journey-growth"
};

const JourneyMap = () => {
  const [selectedEvent, setSelectedEvent] = useState<JourneyEvent | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const handleEventClick = (event: JourneyEvent) => {
    setSelectedEvent(event);
    setActiveYear(event.year);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Minha Jornada
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um mapa interativo da minha evolução profissional, desde a música até a tecnologia e pelo mundo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Timeline
              </h2>
              <div className="space-y-4">
                {journeyData.map((event) => (
                  <Button
                    key={event.id}
                    variant={activeYear === event.year ? "default" : "ghost"}
                    className="w-full justify-start text-left h-auto p-4"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-${categoryColors[event.category]}/20`}>
                        {event.icon}
                      </div>
                      <div>
                        <div className="font-medium">{event.year}</div>
                        <div className="text-sm text-muted-foreground">{event.title}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-background to-secondary/20">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Connection lines */}
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--journey-music))" />
                      <stop offset="33%" stopColor="hsl(var(--journey-tech))" />
                      <stop offset="66%" stopColor="hsl(var(--journey-travel))" />
                      <stop offset="100%" stopColor="hsl(var(--journey-growth))" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d={`M ${journeyData.map(event => `${event.x},${event.y}`).join(' L ')}`}
                    stroke="url(#pathGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-path-draw"
                    style={{
                      strokeDasharray: '1000',
                      strokeDashoffset: '1000'
                    }}
                  />

                  {/* Event markers */}
                  {journeyData.map((event) => (
                    <g key={event.id}>
                      <circle
                        cx={event.x}
                        cy={event.y}
                        r="3"
                        className={`fill-${categoryColors[event.category]} cursor-pointer transition-all duration-300 hover:r-4 ${
                          activeYear === event.year ? 'animate-pulse-glow' : ''
                        }`}
                        onClick={() => handleEventClick(event)}
                      />
                      <circle
                        cx={event.x}
                        cy={event.y}
                        r="6"
                        className={`fill-${categoryColors[event.category]}/30 cursor-pointer transition-all duration-300`}
                        onClick={() => handleEventClick(event)}
                      />
                    </g>
                  ))}
                </svg>

                {/* Event labels */}
                {journeyData.map((event) => (
                  <div
                    key={`label-${event.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
                    style={{
                      left: `${event.x}%`,
                      top: `${event.y}%`,
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={`bg-${categoryColors[event.category]}/90 text-${categoryColors[event.category]}-foreground px-2 py-1 rounded text-xs font-medium mb-2 backdrop-blur-sm ${
                      activeYear === event.year ? 'scale-110' : 'scale-95'
                    } transition-transform duration-300`}>
                      {event.year}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Event Detail Card */}
        {selectedEvent && (
          <Card className="mt-8 p-6 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full bg-${categoryColors[selectedEvent.category]}/20 flex-shrink-0`}>
                {selectedEvent.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                  <Badge variant="secondary">{selectedEvent.year}</Badge>
                  <Badge className={`bg-${categoryColors[selectedEvent.category]}/20 text-${categoryColors[selectedEvent.category]} border-${categoryColors[selectedEvent.category]}/30`}>
                    {selectedEvent.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{selectedEvent.description}</p>
                
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-journey-travel" />
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.skills && (
                  <div>
                    <h4 className="font-medium mb-2">Skills Desenvolvidas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JourneyMap;