
import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "NeoBiz a transformé la gestion administrative de mon entreprise. Je gagne au moins 5 heures par semaine que je peux désormais consacrer à développer mon activité.",
      author: "Sophie Martin",
      role: "Fondatrice",
      companyName: "Design Studio",
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "La simplicité d'utilisation combinée à la puissance des fonctionnalités fait de NeoBiz un outil indispensable. Les factures automatiques et les relances me font gagner un temps précieux.",
      author: "Thomas Dubois",
      role: "Consultant indépendant",
      companyName: "",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Depuis que nous utilisons NeoBiz, nos retards de paiement ont diminué de 60%. L'interface est intuitive et l'assistance client est exceptionnelle.",
      author: "Marie Leclerc",
      role: "Directrice financière",
      companyName: "Tech Solutions",
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&q=80&w=200&h=200&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-secondary/50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-primary">Ce que nos clients disent</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Découvrez comment NeoBiz aide des entrepreneurs et entreprises de toutes tailles 
            à simplifier leur gestion quotidienne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              className={`opacity-0 animate-fade-up`}
              data-aos-delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-20">
          <p className="text-center text-text mb-8 font-medium">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, index) => (
              <div 
                key={index} 
                className="flex items-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="font-heading font-bold text-xl text-primary">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
