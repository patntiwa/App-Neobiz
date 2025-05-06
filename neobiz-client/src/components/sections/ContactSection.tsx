import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-primary">Contactez-nous</h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            Des questions? Besoin d'aide? Notre équipe est là pour vous accompagner 
            dans votre utilisation de NeoBiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="heading-sm mb-6 text-primary">Envoyez-nous un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Sujet de votre message" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Comment pouvons-nous vous aider?" className="h-32" required />
              </div>
              
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-[#1A1F2C] rounded-xl p-8 text-white shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-[#8E9196]">123 Avenue des Affaires, 75001 Paris, France</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Téléphone</p>
                    <p className="text-[#8E9196]">+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-[#8E9196]">contact@neobiz.fr</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Horaires d'ouverture</h4>
              <p className="text-[#8E9196]">Du lundi au vendredi, 9h - 18h</p>
              <p className="text-[#8E9196]">Weekend: Fermé</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="heading-md mb-6 text-primary">Rejoignez NeoBiz aujourd'hui et passez au niveau supérieur</h3>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
            Créer mon compte gratuitement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
