import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  return <section className="pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Tweet Screenshot Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Create beautiful, customizable screenshots of tweets for your blog, presentations, or social media content.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button size="lg" className="bg-brand-pink hover:bg-brand-pink/90">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            View Examples
          </Button>
        </div>
        
        
      </div>
    </section>;
};
export default Hero;