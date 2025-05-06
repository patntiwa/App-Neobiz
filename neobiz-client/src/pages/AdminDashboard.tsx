
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import StatsOverview from '@/components/admin/StatsOverview';
import ChartSection from '@/components/admin/ChartSection';
import RecentSection from '@/components/admin/RecentSection';
import PlanDistribution from '@/components/admin/PlanDistribution';
import DashboardHeader from '@/components/admin/DashboardHeader';

const AdminDashboard = () => {
  return (
    <DashboardLayout isAdmin>
      <div className="grid gap-6 animate-fade-in">
        <DashboardHeader title="Tableau de bord administrateur" />
        <Tabs defaultValue="overview">
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview />
            <RecentSection />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <ChartSection />
            <PlanDistribution />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
