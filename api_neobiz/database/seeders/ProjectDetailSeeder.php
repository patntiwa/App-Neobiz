<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\ProjectDetail;

class ProjectDetailSeeder extends Seeder
{
    public function run()
    {
        // Exemple de données de projet
        $project1 = Project::find(1);
        $project1->details()->create([
            'objectives' => 'Concevoir une application mobile pour la gestion des stocks.',
            'deliverables' => 'Version 1 de l'application mobile et déploiement.',
            'milestones' => json_encode([
                ['libelle' => 'Phase de conception', 'date' => '2024-05-01'],
                ['libelle' => 'Phase de test', 'date' => '2024-06-10']
            ]),
            'stakeholders' => json_encode([
                ['nom' => 'Alice', 'role' => 'Chef de projet', 'email' => 'alice@exemple.com'],
                ['nom' => 'Bob', 'role' => 'Développeur', 'email' => 'bob@exemple.com']
            ]),
            'resource_breakdown' => json_encode([
                ['type' => 'Personnel', 'ressource' => 'Alice', 'quantite' => 60],
                ['type' => 'Matériel', 'ressource' => 'Serveur cloud', 'quantite' => 1]
            ]),
            'risk_assessment' => 'Risque de retards dus à des dépendances externes.',
            'estimated_hours' => 350,
            'actual_hours' => 120,
            'budget_spent' => 5000,
            'notes' => 'Le projet est en bonne voie pour la phase de test.',
            'attachments_url' => 'http://storage.example.com/docs/project/1'
        ]);

        // Exemple de projet 2
        $project2 = Project::find(2);
        $project2->details()->create([
            'objectives' => 'Création d'une plateforme de paiement en ligne pour le marché local.',
            'deliverables' => 'Plateforme déployée et entièrement fonctionnelle.',
            'milestones' => json_encode([
                ['libelle' => 'Phase d'analyse des besoins', 'date' => '2024-05-01'],
                ['libelle' => 'Phase de développement', 'date' => '2024-06-30']
            ]),
            'stakeholders' => json_encode([
                ['nom' => 'Jean', 'role' => 'Manager', 'email' => 'jean@exemple.com'],
                ['nom' => 'Claire', 'role' => 'Développeur backend', 'email' => 'claire@exemple.com']
            ]),
            'resource_breakdown' => json_encode([
                ['type' => 'Personnel', 'ressource' => 'Jean', 'quantite' => 80],
                ['type' => 'Matériel', 'ressource' => 'Serveur physique', 'quantite' => 2]
            ]),
            'risk_assessment' => 'Risque lié à l'intégration de systèmes de paiement tiers.',
            'estimated_hours' => 400,
            'actual_hours' => 180,
            'budget_spent' => 7000,
            'notes' => 'Progrès satisfaisants, en attente des tests de paiement.',
            'attachments_url' => 'http://storage.example.com/docs/project/2'
        ]);

        // Exemple de projet 3
        $project3 = Project::find(3);
        $project3->details()->create([
            'objectives' => 'Développement d'un logiciel de gestion de stock pour une entreprise agroalimentaire.',
            'deliverables' => 'Version finale du logiciel avec gestion des stocks et des commandes.',
            'milestones' => json_encode([
                ['libelle' => 'Phase de développement', 'date' => '2024-05-15'],
                ['libelle' => 'Phase de tests', 'date' => '2024-06-20']
            ]),
            'stakeholders' => json_encode([
                ['nom' => 'Mamadou', 'role' => 'Consultant', 'email' => 'mamadou@exemple.com'],
                ['nom' => 'Estelle', 'role' => 'Développeur frontend', 'email' => 'estelle@exemple.com']
            ]),
            'resource_breakdown' => json_encode([
                ['type' => 'Personnel', 'ressource' => 'Mamadou', 'quantite' => 100],
                ['type' => 'Matériel', 'ressource' => 'PC de développement', 'quantite' => 4]
            ]),
            'risk_assessment' => 'Risque de bugs majeurs lors de l'intégration des modules de gestion des stocks.',
            'estimated_hours' => 500,
            'actual_hours' => 220,
            'budget_spent' => 8000,
            'notes' => 'Le projet est dans les délais, tests à venir.',
            'attachments_url' => 'http://storage.example.com/docs/project/3'
        ]);
    }
}
