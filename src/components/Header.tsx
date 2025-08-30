import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Languages, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "next-themes";

const Header = () => {
  const { language, setLanguage, t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-primary text-primary-foreground">
            Journey Map
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'pt' ? 'EN' : 'PT'}
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {theme === 'dark' ? t('header.light') : t('header.dark')}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;