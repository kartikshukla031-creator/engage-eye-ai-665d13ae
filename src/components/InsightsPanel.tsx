import { Card } from '@/components/ui/card';
import { EmotionData, EmotionType } from '@/types/emotion';
import { AlertCircle, TrendingUp, Clock } from 'lucide-react';

interface InsightsPanelProps {
  data: EmotionData[];
}

const InsightsPanel = ({ data }: InsightsPanelProps) => {
  const attentiveCount = data.filter(d => d.engagement === 'Attentive').length;
  const engagementPercentage = data.length > 0 ? (attentiveCount / data.length) * 100 : 0;

  const emotionCounts: Record<EmotionType, number> = {
    happy: 0,
    neutral: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    fearful: 0,
    disgust: 0,
  };

  data.forEach(d => {
    emotionCounts[d.emotion]++;
  });

  const mostCommon = Object.entries(emotionCounts)
    .sort(([, a], [, b]) => b - a)[0];

  const totalMinutes = Math.floor((data.length * 2) / 60); // Each detection is ~2 seconds

  const getSuggestion = () => {
    if (engagementPercentage < 60) {
      return 'Consider increasing class interaction or taking a short break.';
    } else if (engagementPercentage < 80) {
      return 'Good engagement! Try varying teaching methods to maintain interest.';
    }
    return 'Excellent engagement! Students are highly focused.';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-card-foreground">
        <TrendingUp className="w-5 h-5 text-primary" />
        Insights & Suggestions
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
          <Clock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground">Session Duration</p>
            <p className="text-sm text-muted-foreground">
              {totalMinutes} minute{totalMinutes !== 1 ? 's' : ''} of tracking
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground">Most Common Emotion</p>
            <p className="text-sm text-muted-foreground capitalize">
              {mostCommon ? mostCommon[0] : 'Not enough data'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <p className="font-medium text-card-foreground">Suggestion</p>
            <p className="text-sm text-muted-foreground">
              {getSuggestion()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InsightsPanel;
