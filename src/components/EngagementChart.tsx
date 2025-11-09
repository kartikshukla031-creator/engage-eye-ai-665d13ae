import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EmotionData } from '@/types/emotion';

interface EngagementChartProps {
  data: EmotionData[];
}

const EngagementChart = ({ data }: EngagementChartProps) => {
  const chartData = data.slice(-20).map((item, index) => ({
    time: index,
    engagement: item.engagement === 'Attentive' ? 100 : item.engagement === 'Distracted' ? 50 : 0,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">Engagement Timeline</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            domain={[0, 100]}
            label={{ value: 'Engagement %', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="engagement" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EngagementChart;
