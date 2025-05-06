
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { Users, ChartBar, PieChart } from 'lucide-react';

const StatsOverview = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Utilisateurs total"
        value="2,458"
        trend={{ value: 18.2, isPositive: true }}
        icon={<Users className="text-blue-500" />}
        gradientColors="from-blue-500/5 to-blue-500/10"
      />
      <StatCard 
        title="Revenu mensuel"
        value="85,240 €"
        trend={{ value: 24.3, isPositive: true }}
        icon={<PieChart className="text-green-500" />}
        gradientColors="from-green-500/5 to-green-500/10"
      />
      <StatCard 
        title="Taux de conversion"
        value="12.5%"
        trend={{ value: 3.1, isPositive: true }}
        icon={<ChartBar className="text-purple-500" />}
        gradientColors="from-purple-500/5 to-purple-500/10"
      />
      <StatCard 
        title="Tickets support"
        value="18"
        trend={{ value: 12.5, isPositive: false }}
        icon={<PieChart className="text-yellow-500" />}
        gradientColors="from-yellow-500/5 to-yellow-500/10"
      />
    </div>
  );
};

export default StatsOverview;
