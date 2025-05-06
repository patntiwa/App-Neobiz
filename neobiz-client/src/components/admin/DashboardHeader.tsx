
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardHeaderProps {
  title: string;
  defaultTab?: string;
  className?: string;
}

const DashboardHeader = ({ title, defaultTab = "overview", className }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start sticky top-0 bg-background z-10 pb-2 pt-2">
      <h2 className="text-3xl font-bold tracking-tight flex-1">
        {title}
      </h2>
      <Tabs defaultValue={defaultTab} className="w-full md:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Vue générale</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DashboardHeader;
