
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartCardProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  type?: 'line' | 'bar';
  className?: string;
  height?: number | string;
  colors?: {
    stroke?: string;
    fill?: string;
  };
  showGrid?: boolean;
  tooltipFormatter?: (value: number) => string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  description, 
  data, 
  type = 'line',
  className, 
  height = 250,
  colors = { stroke: "#8B5CF6", fill: "rgba(139, 92, 246, 0.1)" },
  showGrid = true,
  tooltipFormatter
}) => {
  const renderChart = () => {
    if (type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {showGrid && <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />}
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              width={30}
            />
            <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke} 
              strokeWidth={2}
              dot={{ r: 3, fill: "white", stroke: colors.stroke, strokeWidth: 2 }}
              activeDot={{ r: 5, fill: colors.stroke }}
              fill={colors.fill}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          {showGrid && <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />}
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#888' }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#888' }}
            width={30}
          />
          <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
          <Bar 
            dataKey="value" 
            fill={colors.fill || "rgba(139, 92, 246, 0.6)"} 
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  const CustomTooltip = ({ active, payload, label, formatter }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-sm">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-accent font-bold">
            {formatter ? formatter(value) : value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("h-full hover:shadow-md transition-shadow duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
