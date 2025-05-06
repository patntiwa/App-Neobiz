
import React from 'react';
import { FileText, Clock, FileCheck, Users, BarChart } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Génération de factures",
      description: "Créez et envoyez des factures professionnelles en quelques clics. Personnalisez vos modèles selon vos besoins."
    },
    {
      icon: Clock,
      title: "Rappels automatiques",
      description: "Ne perdez plus de temps avec des relances manuelles. NeoBiz envoie automatiquement des rappels aux clients en retard de paiement."
    },
    {
      icon: FileCheck,
      title: "Création d'offres et devis",
      description: "Générez rapidement des devis professionnels et convertissez-les en factures en un clic après acceptation."
    },
    {
      icon: Users,
      title: "Gestion des clients",
      description: "Centralisez toutes les informations clients, leurs historiques et suivez facilement toutes vos interactions."
    },
    {
      icon: BarChart,
      title: "Tableau de bord financier",
      description: "Visualisez en temps réel vos revenus, dépenses et prévisions pour une prise de décision éclairée."
    }
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-white to-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-accent/10 rounded-full p-3 mb-4">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="heading-lg mb-4 text-primary">Fonctionnalités clés</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Des outils puissants mais simples à utiliser pour gérer votre activité quotidienne 
            et vous concentrer sur ce qui compte vraiment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              className={`opacity-0 animate-fade-up`}
              data-aos-delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-primary font-medium mb-2">Et bien plus encore...</p>
          <p className="text-text">
            Découvrez toutes nos fonctionnalités lors d'une démonstration personnalisée.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
