
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Download, Share, Camera, Link, Copy, Text } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { copyScreenshotToClipboard } from "@/utils/screenshotUtils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ScreenshotControlsProps {
  onBackgroundChange: (color: string) => void;
  onScreenshot: () => void;
  canScreenshot: boolean;
  elementId: string;
  onTweetStyleChange?: (style: any) => void;
}

const ScreenshotControls = ({
  onBackgroundChange,
  onScreenshot,
  canScreenshot,
  elementId,
  onTweetStyleChange = () => {}
}: ScreenshotControlsProps) => {
  const [paddingSize, setPaddingSize] = useState(10);
  const [fontSizeValue, setFontSizeValue] = useState(16);
  const [tweetSizeValue, setTweetSizeValue] = useState(100);
  const [widthValue, setWidthValue] = useState(100);
  const [roundnessValue, setRoundnessValue] = useState(12);
  const [shadowValue, setShadowValue] = useState(10);
  const [tiltValue, setTiltValue] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#82d2ff");
  const [textColor, setTextColor] = useState("#000000");
  
  const { toast } = useToast();
  
  const backgroundOptions = [
    { value: "#82d2ff", label: "Blue" },
    { value: "#f24fbc", label: "Pink" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#f3f4f6", label: "Light Gray" },
    { value: "#ffffff", label: "White" },
    { value: "#000000", label: "Black" },
  ];

  const handleCopyToClipboard = async () => {
    if (!canScreenshot) return;
    
    try {
      const success = await copyScreenshotToClipboard(elementId);
      
      if (success) {
        toast({
          title: "Screenshot copied",
          description: "The screenshot has been copied to your clipboard."
        });
      } else {
        throw new Error("Failed to copy screenshot to clipboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy screenshot to clipboard",
        variant: "destructive",
      });
    }
  };

  // Update padding when the slider changes
  const handlePaddingChange = (value: number[]) => {
    setPaddingSize(value[0]);
    const element = document.getElementById(elementId);
    if (element) {
      element.style.padding = `${value[0]}px`;
    }
  };

  // Update font size
  const handleFontSizeChange = (value: number[]) => {
    setFontSizeValue(value[0]);
    onTweetStyleChange({ fontSize: value[0] });
    updateTweetStyle('font-size', `${value[0]}px`);
  };

  // Update tweet size
  const handleTweetSizeChange = (value: number[]) => {
    setTweetSizeValue(value[0]);
    onTweetStyleChange({ tweetSize: value[0] });
    updateTweetStyle('transform', `scale(${value[0]/100})`);
  };

  // Update tweet width
  const handleWidthChange = (value: number[]) => {
    setWidthValue(value[0]);
    onTweetStyleChange({ width: value[0] });
    updateTweetStyle('width', `${value[0]}%`);
  };

  // Update roundness
  const handleRoundnessChange = (value: number[]) => {
    setRoundnessValue(value[0]);
    onTweetStyleChange({ borderRadius: value[0] });
    updateTweetStyle('border-radius', `${value[0]}px`);
  };

  // Update shadow
  const handleShadowChange = (value: number[]) => {
    setShadowValue(value[0]);
    onTweetStyleChange({ boxShadow: value[0] });
    updateTweetStyle('box-shadow', `0 ${value[0]}px ${value[0]*2}px rgba(0,0,0,0.1)`);
  };

  // Update tilt
  const handleTiltChange = (value: number[]) => {
    setTiltValue(value[0]);
    onTweetStyleChange({ rotate: value[0] });
    updateTweetStyle('transform', `rotate(${value[0]}deg)`);
  };

  // Update text color
  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    onTweetStyleChange({ color });
    updateTweetStyle('color', color);
  };

  // Helper function to update tweet style
  const updateTweetStyle = (property: string, value: string) => {
    const tweetCard = document.querySelector('.tweet-preview');
    if (tweetCard && tweetCard instanceof HTMLElement) {
      tweetCard.style[property as any] = value;
    }
  };

  // Helper function to update background color
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    onBackgroundChange(color);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="appearance">Tweet Options</TabsTrigger>
            <TabsTrigger value="canvas">Canvas Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-sm text-muted-foreground">{fontSizeValue}px</span>
              </div>
              <Slider
                value={[fontSizeValue]}
                min={12}
                max={24}
                step={1}
                onValueChange={handleFontSizeChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tweet Size</Label>
                <span className="text-sm text-muted-foreground">{tweetSizeValue}%</span>
              </div>
              <Slider
                value={[tweetSizeValue]}
                min={50}
                max={150}
                step={5}
                onValueChange={handleTweetSizeChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tweet Width</Label>
                <span className="text-sm text-muted-foreground">{widthValue}%</span>
              </div>
              <Slider
                value={[widthValue]}
                min={50}
                max={100}
                step={5}
                onValueChange={handleWidthChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Roundness</Label>
                <span className="text-sm text-muted-foreground">{roundnessValue}px</span>
              </div>
              <Slider
                value={[roundnessValue]}
                min={0}
                max={24}
                step={1}
                onValueChange={handleRoundnessChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Shadow</Label>
                <span className="text-sm text-muted-foreground">{shadowValue}px</span>
              </div>
              <Slider
                value={[shadowValue]}
                min={0}
                max={30}
                step={1}
                onValueChange={handleShadowChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tilt</Label>
                <span className="text-sm text-muted-foreground">{tiltValue}°</span>
              </div>
              <Slider
                value={[tiltValue]}
                min={-10}
                max={10}
                step={1}
                onValueChange={handleTiltChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Text Color</Label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-300" 
                    style={{ backgroundColor: textColor }}
                  />
                  <Input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => handleTextColorChange(e.target.value)} 
                    className="w-8 h-8 p-0 border-0"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="canvas" className="space-y-6">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <RadioGroup 
                defaultValue={backgroundColor} 
                className="flex flex-wrap gap-2"
                onValueChange={handleBackgroundColorChange}
              >
                {backgroundOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value} 
                      id={option.value}
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex items-center justify-center p-2 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:border-2"
                    >
                      <div 
                        className="w-8 h-8 rounded-full mr-2" 
                        style={{ backgroundColor: option.value }}
                      />
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-4 flex items-center gap-2">
                <Label htmlFor="custom-background">Custom</Label>
                <Input 
                  id="custom-background"
                  type="color" 
                  value={backgroundColor} 
                  onChange={(e) => handleBackgroundColorChange(e.target.value)} 
                  className="w-8 h-8 p-0 border-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Padding Size</Label>
                <span className="text-sm text-muted-foreground">{paddingSize}px</span>
              </div>
              <Slider
                value={[paddingSize]}
                min={0}
                max={50}
                step={1}
                onValueChange={handlePaddingChange}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-4 gap-3 mt-6">
          <Button variant="outline" className="w-full" onClick={onScreenshot} disabled={!canScreenshot}>
            <Camera className="mr-2 h-4 w-4" />
            Capture
          </Button>
          <Button variant="outline" className="w-full" onClick={handleCopyToClipboard} disabled={!canScreenshot}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="w-full" onClick={handleCopyToClipboard} disabled={!canScreenshot}>
            <Link className="mr-2 h-4 w-4" />
            Link
          </Button>
          <Button className="w-full bg-brand-pink hover:bg-brand-pink/90" onClick={onScreenshot} disabled={!canScreenshot}>
            <Download className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenshotControls;
