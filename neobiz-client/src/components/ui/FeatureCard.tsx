
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <div className="inline-flex items-center justify-center bg-accent/10 rounded-xl p-3 mb-4">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-text">{description}</p>
    </div>
  );
};

export default FeatureCard;
