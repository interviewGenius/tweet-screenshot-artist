
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface TweetFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const TweetForm = ({ onSubmit, isLoading }: TweetFormProps) => {
  const [tweetUrl, setTweetUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tweetUrl) {
      toast({
        title: "Please enter a tweet URL",
        variant: "destructive",
      });
      return;
    }

    onSubmit(tweetUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="url">Tweet URL</TabsTrigger>
          <TabsTrigger value="text">Sample Tweet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Paste Twitter/X URL here..."
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-brand-pink hover:bg-brand-pink/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Generate"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Enter a link to any tweet to create a beautiful screenshot
            </p>
          </form>
        </TabsContent>
        
        <TabsContent value="text">
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => onSubmit("sample")}
                className="bg-brand-pink hover:bg-brand-pink/90 text-white w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Use Sample Tweet"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Don't have a tweet? Try our sample tweet to test the features
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TweetForm;
