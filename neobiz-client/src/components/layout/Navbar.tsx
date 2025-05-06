
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboard = () => {
    if (currentUser?.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-primary font-heading text-2xl font-bold animate-fade-in">
              Neo<span className="text-accent">Biz</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-text hover:text-accent transition-colors">Fonctionnalités</a>
            <a href="/#pricing" className="text-text hover:text-accent transition-colors">Tarifs</a>
            <a href="/#testimonials" className="text-text hover:text-accent transition-colors">Témoignages</a>
            <Link to="/blog" className="text-text hover:text-accent transition-colors">Blog</Link>
            
            {!isLoading && (
              <>
                {currentUser ? (
                  <>
                    <Button variant="outline" className="ml-2 animate-fade-in" onClick={handleDashboard}>
                      Tableau de bord
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-white animate-fade-in" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="ml-2 animate-fade-in" onClick={handleLogin}>
                      Se connecter
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-white animate-fade-in" onClick={handleSignup}>
                      Créer un compte
                    </Button>
                  </>
                )}
              </>
            )}
          </nav>

          <button 
            className="md:hidden text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pt-5 pb-6 flex flex-col gap-4 animate-fade-in bg-white/95 backdrop-blur-sm mt-2 rounded-lg shadow-lg">
            <a 
              href="/#features" 
              className="text-text py-2 px-4 hover:bg-accent/5 hover:text-accent transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Fonctionnalités
            </a>
            <a 
              href="/#pricing" 
              className="text-text py-2 px-4 hover:bg-accent/5 hover:text-accent transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </a>
            <a 
              href="/#testimonials" 
              className="text-text py-2 px-4 hover:bg-accent/5 hover:text-accent transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Témoignages
            </a>
            <Link 
              to="/blog" 
              className="text-text py-2 px-4 hover:bg-accent/5 hover:text-accent transition-colors rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            {!isLoading && (
              <div className="flex flex-col gap-3 px-4 mt-2">
                {currentUser ? (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => { handleDashboard(); setIsMenuOpen(false); }}>
                      Tableau de bord
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-white w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Se connecter</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="bg-accent hover:bg-accent/90 text-white w-full">
                        Créer un compte
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
