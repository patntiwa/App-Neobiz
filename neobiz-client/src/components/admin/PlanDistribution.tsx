
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-sm">
        <p className="font-medium" style={{ color: payload[0].payload.fill }}>
          {payload[0].name}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">{payload[0].value}</span> utilisateurs
        </p>
      </div>
    );
  }
  return null;
};

const PlanDistribution = () => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">Distribution par forfait</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <ChartContainer 
              config={{
                freelance: { theme: { light: "#3B82F6", dark: "#3B82F6" } },
                business: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                enterprise: { theme: { light: "#10B981", dark: "#10B981" } },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Freelance", value: 520, fill: "#3B82F6" },
                      { name: "Business", value: 1580, fill: "#8B5CF6" },
                      { name: "Enterprise", value: 358, fill: "#10B981" },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex flex-row md:flex-col justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Freelance: 520 (21%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Business: 1580 (64%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm">Enterprise: 358 (15%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanDistribution;
