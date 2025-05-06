
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi à une API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section id="newsletter" className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Restez informé des dernières tendances</h2>
          <p className="text-xl text-gray-700 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir des conseils, des ressources et des actualités sur le monde des affaires.
          </p>
          
          {isSubscribed ? (
            <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-white/80 backdrop-blur shadow-sm">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-2xl font-semibold">Merci pour votre inscription !</h3>
              <p className="text-gray-600">
                Vous recevrez bientôt nos prochaines communications par email.
              </p>
              <Button 
                variant="outline"
                onClick={() => setIsSubscribed(false)}
                className="mt-2"
              >
                S'inscrire avec une autre adresse
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email" 
                className="flex-grow"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Inscription..." : "S'abonner"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            Nous respectons votre vie privée et ne partageons pas vos informations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
