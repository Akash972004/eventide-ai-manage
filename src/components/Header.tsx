
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Plus, LogIn, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCreateEvent: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateEvent }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Eventide
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onCreateEvent}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/signup')}
              className="hidden sm:inline-flex"
            >
              Sign Up
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
