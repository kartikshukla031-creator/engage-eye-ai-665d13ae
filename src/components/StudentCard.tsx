import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StudentData, emotionEmojis, engagementColors } from '@/types/emotion';
import { User } from 'lucide-react';

interface StudentCardProps {
  student: StudentData;
}

const StudentCard = ({ student }: StudentCardProps) => {
  const engagementColor = engagementColors[student.engagement];
  const emoji = emotionEmojis[student.currentEmotion];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{student.name}</h3>
            <p className="text-sm text-muted-foreground">
              {(student.confidence * 100).toFixed(0)}% confident
            </p>
          </div>
        </div>
        <Badge 
          className={`
            ${engagementColor === 'success' ? 'bg-success text-success-foreground' : ''}
            ${engagementColor === 'warning' ? 'bg-warning text-warning-foreground' : ''}
            ${engagementColor === 'danger' ? 'bg-danger text-danger-foreground' : ''}
          `}
        >
          {student.engagement}
        </Badge>
      </div>

      <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
        <span className="text-4xl">{emoji}</span>
        <div>
          <p className="text-sm text-muted-foreground">Current Emotion</p>
          <p className="font-medium capitalize text-card-foreground">{student.currentEmotion}</p>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;
