
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const PricingSection = () => {
  const plans = [
    {
      name: "Freelance",
      price: "0",
      description: "Parfait pour démarrer",
      features: [
        "5 factures par mois",
        "Suivi des paiements",
        "1 modèle de facture",
        "Export PDF",
        "Support par email"
      ]
    },
    {
      name: "Business",
      price: "29",
      description: "Pour les entrepreneurs ambitieux",
      popular: true,
      features: [
        "Factures illimitées",
        "Rappels automatiques",
        "Modèles personnalisables",
        "Tableau de bord financier",
        "Support prioritaire",
        "Intégration comptable"
      ]
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Solution complète pour les PME",
      features: [
        "Tout Business +",
        "Multi-utilisateurs",
        "API complète",
        "Personnalisation avancée",
        "Support dédié 24/7",
        "Formation sur mesure"
      ]
    }
  ];

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary/50 -z-10" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container-custom relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg mb-4 text-primary">Tarifs simples et transparents</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-xl p-8 transition-all duration-300 hover:scale-105 animate-fade-up",
                plan.popular 
                  ? 'bg-gradient-to-b from-white to-accent/5 border-2 border-accent shadow-xl' 
                  : 'bg-white border border-gray-100 shadow-md hover:shadow-xl'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-medium px-4"
                >
                  Plus populaire
                </Badge>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">{plan.name}</h3>
                <p className="text-text mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-text text-lg">€/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="bg-accent/10 rounded-full p-1">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    </div>
                    <span className="text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={cn(
                  "w-full text-white font-medium transition-all",
                  plan.popular 
                    ? 'bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent' 
                    : 'bg-primary hover:bg-primary/90'
                )}
              >
                Commencer gratuitement
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-up">
          <p className="text-text text-lg">
            Besoin d'une solution personnalisée ?{' '}
            <a href="#contact" className="text-accent font-medium hover:underline">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
