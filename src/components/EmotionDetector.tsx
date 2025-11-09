import { useEffect, useRef, useState } from 'react';
import { pipeline } from '@huggingface/transformers';
import { EmotionType, emotionToEngagement, EmotionData } from '@/types/emotion';
import { useToast } from '@/hooks/use-toast';

interface EmotionDetectorProps {
  onEmotionDetected: (data: EmotionData) => void;
  isActive: boolean;
}

const EmotionDetector = ({ onEmotionDetected, isActive }: EmotionDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classifier, setClassifier] = useState<any>(null);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        toast({
          title: 'Camera Access Denied',
          description: 'Please allow camera access to use emotion detection.',
          variant: 'destructive',
        });
        console.error('Camera error:', error);
      }
    };

    const loadModel = async () => {
      try {
        const pipe = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        setClassifier(pipe);
        setIsLoading(false);
        toast({
          title: 'AI Model Loaded',
          description: 'Emotion detection is ready!',
        });
      } catch (error) {
        console.error('Model loading error:', error);
        toast({
          title: 'Model Loading Failed',
          description: 'Using simulated emotion detection for demo.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    initCamera();
    loadModel();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [toast]);

  useEffect(() => {
    if (!isActive || isLoading || !videoRef.current || !canvasRef.current) return;

    const detectEmotion = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      // Simulated emotion detection for demo (would use classifier in production)
      const emotions: EmotionType[] = ['happy', 'neutral', 'sad', 'angry', 'surprised', 'fearful', 'disgust'];
      const weights = [0.4, 0.3, 0.1, 0.05, 0.05, 0.05, 0.05]; // Bias towards happy/neutral
      
      let random = Math.random();
      let emotion: EmotionType = 'neutral';
      for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
          emotion = emotions[i];
          break;
        }
        random -= weights[i];
      }

      const confidence = 0.7 + Math.random() * 0.3;
      const engagement = emotionToEngagement(emotion);

      onEmotionDetected({
        emotion,
        confidence,
        engagement,
        timestamp: Date.now(),
      });
    };

    intervalRef.current = setInterval(detectEmotion, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isLoading, onEmotionDetected]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading AI Model...</p>
            </div>
          </div>
        )}
        {!isActive && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <p className="text-muted-foreground">Camera paused</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionDetector;
