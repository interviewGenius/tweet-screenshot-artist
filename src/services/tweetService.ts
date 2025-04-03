
import { useToast } from "@/components/ui/use-toast";

// Mock sample tweet data
const sampleTweet = {
  avatar: "",
  name: "John Doe",
  username: "johndoe",
  verified: true,
  content: "Just tried this amazing Tweet Screenshot Generator! It's a game-changer for creating professional social media content. Check it out!",
  date: "10:30 AM · Apr 3, 2025",
};

// Mock function to fetch tweet data from a URL
export const fetchTweetData = async (tweetUrl: string) => {
  // In a real implementation, this would call an API to fetch the actual tweet data
  // For this demo, we're returning either sample data or mocked data based on input
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (tweetUrl === "sample") {
      return { ...sampleTweet, success: true };
    }
    
    // Extract tweet ID from URL (this is a simplified version)
    const tweetId = extractTweetId(tweetUrl);
    
    if (!tweetId) {
      return { 
        success: false, 
        error: "Could not extract tweet ID from URL" 
      };
    }
    
    // This would normally call a backend API
    // For now, return mock data based on the tweet ID
    return {
      avatar: "",
      name: "Twitter User",
      username: "user" + tweetId.substring(0, 4),
      verified: Math.random() > 0.5,
      content: `This is a tweet with ID ${tweetId}. In a real implementation, this would show the actual tweet content.`,
      date: "10:30 AM · Apr 3, 2025",
      success: true
    };
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return {
      success: false,
      error: "Failed to fetch tweet data"
    };
  }
};

// Helper function to extract tweet ID from URL
const extractTweetId = (url: string): string | null => {
  // Very simple regex to extract tweet ID from Twitter URLs
  // Real implementation would need to be more robust
  const match = url.match(/twitter\.com\/\w+\/status\/(\d+)/);
  if (match && match[1]) {
    return match[1];
  }
  
  // Also try X.com URLs
  const xMatch = url.match(/x\.com\/\w+\/status\/(\d+)/);
  if (xMatch && xMatch[1]) {
    return xMatch[1];
  }
  
  return null;
};

// Function to generate and download a screenshot
export const generateScreenshot = (elementId: string, filename: string = "tweet-screenshot.png") => {
  // In a real implementation, this would use html2canvas or a similar library
  // For this demo, we'll just log to console
  console.log(`Generating screenshot of element with ID: ${elementId}`);
  
  // Mock functionality - in reality would trigger download
  const toast = useToast();
  toast.toast({
    title: "Screenshot Generated",
    description: "Your screenshot has been created and is ready to download.",
  });
  
  return true;
};
