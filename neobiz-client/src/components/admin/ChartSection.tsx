
import React from 'react';
import ChartCard, { ChartDataPoint } from '@/components/dashboard/ChartCard';
import { formatCurrency, getCurrencySymbol } from '@/utils/currencyUtils';

const ChartSection = () => {
  const userGrowthData: ChartDataPoint[] = [
    { name: 'Jan', value: 150 },
    { name: 'Fév', value: 220 },
    { name: 'Mar', value: 310 },
    { name: 'Avr', value: 420 },
    { name: 'Mai', value: 560 },
    { name: 'Juin', value: 680 },
    { name: 'Juil', value: 790 },
  ];

  const revenueData: ChartDataPoint[] = [
    { name: 'Jan', value: 15000 },
    { name: 'Fév', value: 22000 },
    { name: 'Mar', value: 21000 },
    { name: 'Avr', value: 32000 },
    { name: 'Mai', value: 37000 },
    { name: 'Juin', value: 45000 },
    { name: 'Juil', value: 52000 },
  ];

  const currencySymbol = getCurrencySymbol();

  const formatRevenueTooltip = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ChartCard 
        title="Croissance des utilisateurs" 
        data={userGrowthData} 
        type="bar"
        colors={{ fill: "rgba(59, 130, 246, 0.6)", stroke: "#3B82F6" }}
      />
      <ChartCard 
        title={`Revenus mensuels (${currencySymbol})`} 
        data={revenueData}
        colors={{ stroke: "#10B981", fill: "rgba(16, 185, 129, 0.1)" }}
        tooltipFormatter={formatRevenueTooltip}
      />
    </div>
  );
};

export default ChartSection;
