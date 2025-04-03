
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TweetPreviewProps {
  avatar?: string;
  name?: string;
  username?: string;
  verified?: boolean;
  content?: string;
  date?: string;
  backgroundColor: string;
}

const TweetPreview = ({
  avatar = "",
  name = "User Name",
  username = "username",
  verified = true,
  content = "This is a sample tweet. Replace with your content to see how it looks!",
  date = "10:30 AM · Apr 3, 2025",
  backgroundColor = "#82d2ff"
}: TweetPreviewProps) => {
  return (
    <div className="p-10 rounded-xl flex items-center justify-center" style={{ backgroundColor }}>
      <Card className="w-full max-w-md p-4 bg-white shadow-lg rounded-xl tweet-preview">
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12 border">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 truncate">{name}</span>
              {verified && (
                <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center bg-blue-500 border-blue-500">
                  <Check className="h-3 w-3 text-white" />
                </Badge>
              )}
            </div>
            <div className="text-gray-500 text-sm">@{username}</div>
          </div>
        </div>
        
        <div className="mt-3 text-gray-900">{content}</div>
        
        <div className="mt-4 text-gray-500 text-sm">{date}</div>
      </Card>
    </div>
  );
};

export default TweetPreview;
