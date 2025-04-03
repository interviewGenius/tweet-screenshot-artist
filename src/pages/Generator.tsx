
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import TweetForm from "@/components/TweetForm";
import TweetPreview from "@/components/TweetPreview";
import ScreenshotControls from "@/components/ScreenshotControls";
import { fetchTweetData } from "@/services/tweetService";
import { downloadScreenshot } from "@/utils/screenshotUtils";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweetData, setTweetData] = useState<any | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#82d2ff");
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      const data = await fetchTweetData(url);
      
      if (data.success) {
        setTweetData(data);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch tweet data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleScreenshot = async () => {
    if (!previewRef.current) return;
    
    try {
      const success = await downloadScreenshot("tweet-preview-container", "tweet-screenshot.png");
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your screenshot has been downloaded",
        });
      } else {
        throw new Error("Failed to download screenshot");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate screenshot",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Generate Your Tweet Screenshot</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter a tweet URL below to create a beautiful screenshot that you can download and share.
          </p>
        </div>
        
        <TweetForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div id="tweet-preview-container" ref={previewRef}>
              <TweetPreview
                avatar={tweetData?.avatar || ""}
                name={tweetData?.name || "User Name"}
                username={tweetData?.username || "username"}
                verified={tweetData?.verified || true}
                content={tweetData?.content || "This is a sample tweet. Enter a tweet URL to see the actual content."}
                date={tweetData?.date || "10:30 AM · Apr 3, 2025"}
                backgroundColor={backgroundColor}
              />
            </div>
          </div>
          
          <div>
            <ScreenshotControls
              onBackgroundChange={setBackgroundColor}
              onScreenshot={handleScreenshot}
              canScreenshot={!!tweetData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
