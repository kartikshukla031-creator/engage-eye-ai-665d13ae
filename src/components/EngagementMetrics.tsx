import { Card } from '@/components/ui/card';
import { EmotionData } from '@/types/emotion';
import { Activity, Users, Percent } from 'lucide-react';

interface EngagementMetricsProps {
  data: EmotionData[];
}

const EngagementMetrics = ({ data }: EngagementMetricsProps) => {
  const attentiveCount = data.filter(d => d.engagement === 'Attentive').length;
  const distractedCount = data.filter(d => d.engagement === 'Distracted').length;
  const drowsyCount = data.filter(d => d.engagement === 'Drowsy').length;
  
  const total = data.length || 1;
  const attentivePercent = Math.round((attentiveCount / total) * 100);
  const distractedPercent = Math.round((distractedCount / total) * 100);
  const drowsyPercent = Math.round((drowsyCount / total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-success" />
          </div>
          <span className="text-3xl font-bold text-success">{attentivePercent}%</span>
        </div>
        <h3 className="font-medium text-card-foreground">Attentive</h3>
        <p className="text-sm text-muted-foreground">Students are focused</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-warning" />
          </div>
          <span className="text-3xl font-bold text-warning">{distractedPercent}%</span>
        </div>
        <h3 className="font-medium text-card-foreground">Distracted</h3>
        <p className="text-sm text-muted-foreground">Need re-engagement</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
            <Percent className="w-5 h-5 text-danger" />
          </div>
          <span className="text-3xl font-bold text-danger">{drowsyPercent}%</span>
        </div>
        <h3 className="font-medium text-card-foreground">Drowsy</h3>
        <p className="text-sm text-muted-foreground">May need a break</p>
      </Card>
    </div>
  );
};

export default EngagementMetrics;
