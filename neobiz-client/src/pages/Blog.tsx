
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Calendar, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Comment optimiser votre pitch pour attirer des investisseurs",
      excerpt: "Découvrez les techniques éprouvées pour créer un pitch captivant qui attirera l'attention des investisseurs potentiels.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      author: "Marie Dubois",
      date: "15 avril 2023",
      category: "Pitch",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Les erreurs à éviter lors du lancement de votre startup",
      excerpt: "Évitez ces pièges courants qui peuvent compromettre le succès de votre startup dès les premières étapes de son développement.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      author: "Thomas Martin",
      date: "3 mars 2023",
      category: "Startup",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Comment l'IA transforme la gestion d'entreprise en 2023",
      excerpt: "L'intelligence artificielle révolutionne la façon dont les entreprises opèrent. Voici comment vous pouvez l'utiliser à votre avantage.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      author: "Julie Legrand",
      date: "21 mai 2023",
      category: "Technologie",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "Stratégies de financement pour les petites entreprises",
      excerpt: "Explorez différentes options de financement adaptées aux besoins spécifiques des petites entreprises et des startups.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      author: "Marc Dupont",
      date: "9 juin 2023",
      category: "Financement",
      readTime: "8 min",
    },
  ];

  const categories = ["Tous", "Startup", "Pitch", "Financement", "Marketing", "Technologie"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/20 to-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog NeoBiz</h1>
              <p className="text-xl text-gray-700 mb-8">
                Conseils, stratégies et insights pour développer votre entreprise et réussir vos projets
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text"
                  placeholder="Rechercher un article..."
                  className="pl-10 pr-4 py-6 rounded-full"
                />
                <Button 
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 h-10 bg-accent hover:bg-accent/90"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Rechercher</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === "Tous" ? "default" : "outline"}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.readTime} de lecture</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90">
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Voir plus d'articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
              <p className="text-gray-600 mb-6">
                Recevez nos derniers articles, conseils et ressources directement dans votre boîte mail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="flex-grow"
                />
                <Button className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                  S'abonner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Nous respectons votre vie privée. Désabonnez-vous à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
