
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const DemoSection = () => {
  return (
    <section id="demo" className="section-padding bg-gradient-to-b from-secondary to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-primary">Voyez NeoBiz en action</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Découvrez comment notre solution peut transformer votre façon de travailler au quotidien
            et vous faire gagner des heures chaque semaine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Interactive Mockup */}
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            {/* Image placeholder for video */}
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="NeoBiz Demo" 
              className="w-full rounded-xl"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                className="h-20 w-20 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center shadow-lg"
              >
                <Play className="h-10 w-10 ml-1" />
              </Button>
            </div>
          </div>

          {/* Demo Description */}
          <div className="space-y-6 max-w-lg">
            <h3 className="heading-md text-primary">Interface intuitive et puissante</h3>
            <p className="text-text text-lg">
              Nous avons conçu NeoBiz pour qu'il soit à la fois puissant et simple à utiliser. 
              Tous les outils dont vous avez besoin sont accessibles en quelques clics.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text">
                  <span className="font-semibold">Navigation intuitive</span> - Retrouvez rapidement ce dont vous avez besoin
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text">
                  <span className="font-semibold">Personnalisation totale</span> - Adaptez l'interface à vos besoins
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text">
                  <span className="font-semibold">Accessibilité mobile</span> - Accédez à tout, partout, à tout moment
                </p>
              </div>
            </div>

            <Button 
              className="bg-accent hover:bg-accent/90 text-white mt-6" 
              size="lg"
            >
              Demander une démo personnalisée
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
