
import React from 'react';
import { Clock, FileWarning, PieChart, CheckCircle } from 'lucide-react';

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: <FileWarning className="h-8 w-8 text-red-500" />,
      title: "Factures manuelles, pertes de temps",
      description: "Créer manuellement des factures est chronophage et source d'erreurs qui peuvent coûter cher à votre entreprise."
    },
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      title: "Suivi client compliqué, relances oubliées",
      description: "Sans système centralisé, le suivi des clients devient un casse-tête et les relances sont souvent oubliées."
    },
    {
      icon: <PieChart className="h-8 w-8 text-red-500" />,
      title: "Absence de vision claire sur les finances",
      description: "Difficile de prendre des décisions éclairées sans vision claire et en temps réel de vos finances."
    }
  ];

  const solutions = [
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: "Automatisation complète de la facturation",
      description: "NeoBiz automatise l'ensemble du processus de facturation, de la création à l'envoi, jusqu'aux rappels de paiement."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: "Gestion intuitive des clients",
      description: "Suivez facilement l'historique de vos clients, leurs préférences et interactions dans une interface centralisée."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-accent" />,
      title: "Analyse financière pour décisions rapides",
      description: "Obtenez des tableaux de bord clairs et des analyses en temps réel pour prendre des décisions avisées rapidement."
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-primary">Le Problème & La Solution</h2>
          <p className="text-lg text-text mx-auto max-w-3xl">
            Les entrepreneurs font face à de nombreux défis dans la gestion de leur activité. 
            NeoBiz propose des solutions simples et efficaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Problems Column */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-3 mb-6">
              <FileWarning className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="heading-md mb-8 text-text-dark">Les défis quotidiens</h3>
            
            <div className="space-y-8">
              {problems.map((problem, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-dark">{problem.title}</h4>
                    <p className="text-text">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-6">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="heading-md mb-8 text-text-dark">Notre solution</h3>
            
            <div className="space-y-8">
              {solutions.map((solution, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-text-dark">{solution.title}</h4>
                    <p className="text-text">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
