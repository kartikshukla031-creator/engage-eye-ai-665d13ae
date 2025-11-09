import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EmotionDetector from '@/components/EmotionDetector';
import StudentCard from '@/components/StudentCard';
import EngagementChart from '@/components/EngagementChart';
import InsightsPanel from '@/components/InsightsPanel';
import EngagementMetrics from '@/components/EngagementMetrics';
import { EmotionData, StudentData } from '@/types/emotion';
import { Play, Pause, GraduationCap } from 'lucide-react';

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [student, setStudent] = useState<StudentData>({
    id: '1',
    name: 'Demo Student',
    currentEmotion: 'neutral',
    engagement: 'Attentive',
    confidence: 0,
    history: [],
  });

  const handleEmotionDetected = (data: EmotionData) => {
    setEmotionHistory(prev => [...prev, data]);
    setStudent(prev => ({
      ...prev,
      currentEmotion: data.emotion,
      engagement: data.engagement,
      confidence: data.confidence,
      history: [...prev.history, data],
    }));
  };

  const toggleTracking = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EduVision</h1>
                <p className="text-sm text-muted-foreground">AI Classroom Engagement Tracker</p>
              </div>
            </div>
            <Button 
              onClick={toggleTracking}
              variant={isActive ? "destructive" : "default"}
              size="lg"
              className="gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause Tracking
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Tracking
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Camera Feed */}
          <section>
            <EmotionDetector 
              onEmotionDetected={handleEmotionDetected}
              isActive={isActive}
            />
          </section>

          {/* Metrics Overview */}
          {emotionHistory.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Class Engagement Overview</h2>
              <EngagementMetrics data={emotionHistory} />
            </section>
          )}

          {/* Student Status */}
          {emotionHistory.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Student Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StudentCard student={student} />
              </div>
            </section>
          )}

          {/* Charts and Insights */}
          {emotionHistory.length > 5 && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementChart data={emotionHistory} />
              <InsightsPanel data={emotionHistory} />
            </section>
          )}

          {/* Getting Started Message */}
          {emotionHistory.length === 0 && (
            <section className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Welcome to EduVision</h2>
                <p className="text-muted-foreground">
                  Click "Start Tracking" to begin monitoring student engagement in real-time using AI-powered emotion detection.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
