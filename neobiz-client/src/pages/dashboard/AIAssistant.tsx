
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AIHeader } from '@/components/ai/AIHeader';
import { AIFeatures } from '@/components/ai/AIFeatures';

const AIAssistant = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <AIHeader />
        <AIFeatures />
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
