
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary/50 -z-10" />
      
      {/* Circle decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col max-w-2xl mx-auto lg:mx-0 text-center lg:text-left animate-fade-up">
            <h1 className="heading-xl mb-6 text-primary leading-tight">
              Gérez et développez votre activité en toute simplicité avec <span className="text-accent">NeoBiz</span>.
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-text">
              Automatisez votre facturation, optimisez votre suivi client et boostez votre productivité grâce à notre IA intégrée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium px-6">
                Créer un compte gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 font-medium px-6">
                Demander une démo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 animate-fade-in">
            {/* Mock-up image */}
            <div className="relative">
              <div className="absolute inset-0 scale-[0.8] bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl rounded-full -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="NeoBiz Dashboard Mockup" 
                className="rounded-xl shadow-2xl border border-gray-200"
              />

              {/* Mobile mockup floating */}
              <div className="absolute -bottom-6 -right-6 md:-right-12 w-1/3 rotate-6">
                <div className="rounded-xl overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="NeoBiz Mobile App" 
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by section */}
        <div className="mt-16 md:mt-24">
          <p className="text-center text-text mb-6 font-medium">Adopté par des entreprises de toutes tailles</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, index) => (
              <div key={index} className="flex items-center">
                <span className="font-heading font-bold text-xl text-primary">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
