
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string | number;
  title: string;
  timestamp: string;
  status?: 'completed' | 'pending' | 'failed';
  icon?: React.ReactNode;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Activité récente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <li 
              key={activity.id} 
              className="px-6 py-4 flex items-center gap-4 transition-colors hover:bg-gray-50/50"
            >
              {activity.icon ? (
                <div className="flex-shrink-0">{activity.icon}</div>
              ) : (
                <span 
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${getStatusColor(activity.status)}`}
                />
              )}
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
