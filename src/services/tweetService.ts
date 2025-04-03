
// Improved tweet service
const sampleTweet = {
  avatar: "",
  name: "John Doe",
  username: "johndoe",
  verified: true,
  content: "Just tried this amazing Tweet Screenshot Generator! It's a game-changer for creating professional social media content. Check it out!",
  date: "10:30 AM · Apr 3, 2025",
  likes: 42,
  retweets: 9,
  comments: 3,
  views: 1240
};

// Better function to fetch tweet data from a URL
export const fetchTweetData = async (tweetUrl: string) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (tweetUrl === "sample") {
      return { ...sampleTweet, success: true };
    }
    
    // Extract tweet ID from URL (improved version)
    const tweetId = extractTweetId(tweetUrl);
    
    if (!tweetId) {
      return { 
        success: false, 
        error: "Could not extract tweet ID from URL" 
      };
    }
    
    // In a real implementation, this would call a backend API to fetch the tweet
    // For this demo, we're returning mock data based on the tweet ID
    return {
      avatar: "",
      name: "Twitter User",
      username: "user" + tweetId.substring(0, 4),
      verified: Math.random() > 0.5,
      content: `This is tweet #${tweetId}. In a real implementation, this would show the actual tweet content pulled from the Twitter API.`,
      date: "10:30 AM · Apr 3, 2025",
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 10000),
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

// Improved function to extract tweet ID from URL
const extractTweetId = (url: string): string | null => {
  // Support for both twitter.com and x.com URLs with better regex
  const twitterRegex = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/i;
  const match = url.match(twitterRegex);
  
  if (match && match[2]) {
    return match[2];
  }
  
  // If it doesn't match the standard format, attempt to be more lenient
  const numbersOnly = /(\d{10,20})/;
  const numMatch = url.match(numbersOnly);
  
  if (numMatch && numMatch[1]) {
    return numMatch[1];
  }
  
  return null;
};
