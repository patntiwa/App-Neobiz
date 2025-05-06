
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChartCard, { ChartDataPoint } from '@/components/dashboard/ChartCard';
import StatCard from '@/components/dashboard/StatCard';
import { ChartBar, PieChart, Users } from 'lucide-react';

const StatisticsPage = () => {
  const monthlyUsersData: ChartDataPoint[] = [
    { name: 'Jan', value: 150 },
    { name: 'Fév', value: 220 },
    { name: 'Mar', value: 310 },
    { name: 'Avr', value: 420 },
    { name: 'Mai', value: 560 },
  ];

  const conversionData: ChartDataPoint[] = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 15 },
    { name: 'Mar', value: 18 },
    { name: 'Avr', value: 22 },
    { name: 'Mai', value: 25 },
  ];

  return (
    <DashboardLayout isAdmin>
      <div className="flex flex-col gap-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Statistiques</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Utilisateurs actifs"
            value="2,458"
            trend={{ value: 12.5, isPositive: true }}
            icon={<Users className="text-blue-500" />}
            gradientColors="from-blue-500/5 to-blue-500/10"
          />
          <StatCard
            title="Taux de conversion"
            value="25%"
            trend={{ value: 4.2, isPositive: true }}
            icon={<ChartBar className="text-green-500" />}
            gradientColors="from-green-500/5 to-green-500/10"
          />
          <StatCard
            title="Chiffre d'affaires"
            value="85,240 €"
            trend={{ value: 8.1, isPositive: true }}
            icon={<PieChart className="text-purple-500" />}
            gradientColors="from-purple-500/5 to-purple-500/10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="Croissance des utilisateurs"
            data={monthlyUsersData}
            type="bar"
            colors={{ fill: "rgba(59, 130, 246, 0.6)", stroke: "#3B82F6" }}
          />
          <ChartCard
            title="Taux de conversion (%)"
            data={conversionData}
            colors={{ stroke: "#10B981", fill: "rgba(16, 185, 129, 0.1)" }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StatisticsPage;
