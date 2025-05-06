
import React from 'react';
import { Zap, ArrowUpRight, LightbulbIcon } from 'lucide-react';

const VisionSection = () => {
  const futurePlans = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>,
      title: "Intégrations API",
      description: "Connectez NeoBiz à vos outils préférés : QuickBooks, Slack, et bien d'autres."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>,
      title: "IA avancée",
      description: "Prochainement: prédictions financières, suggestions automatisées et assistant virtuel."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>,
      title: "Marketing automatisé",
      description: "Des outils de fidélisation clients et d'acquisition intégrés directement à la plateforme."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-accent/10 rounded-full p-3 mb-4">
            <LightbulbIcon className="h-6 w-6 text-accent" />
          </div>
          <h2 className="heading-lg mb-4 text-primary">Une solution qui grandit avec vous</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Nous développons continuellement de nouvelles fonctionnalités pour répondre 
            aux besoins en constante évolution des entrepreneurs modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futurePlans.map((plan, index) => (
            <div 
              key={index}
              className="bg-secondary p-6 rounded-xl border border-gray-100 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-accent mb-4">
                {plan.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-dark">{plan.title}</h3>
              <p className="text-text">{plan.description}</p>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-accent hover:underline">
                  En savoir plus
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-text">
            <span className="font-semibold">NeoBiz évolue constamment.</span> Nos mises à jour régulières 
            garantissent que vous disposez toujours des meilleurs outils pour gérer votre entreprise.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
