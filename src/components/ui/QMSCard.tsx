
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QMSCardProps {
  title: string;
  description: string;
  features: string[];
  suitable: string[];
  icon: React.ReactNode;
  variant?: "default" | "highlighted";
  onSelect: () => void;
}

const QMSCard = ({ 
  title, 
  description, 
  features, 
  suitable, 
  icon, 
  variant = "default",
  onSelect 
}: QMSCardProps) => {
  const isHighlighted = variant === "highlighted";
  
  return (
    <Card 
      className={`overflow-hidden h-full flex flex-col card-hover transition-all duration-300 ${
        isHighlighted 
          ? 'border-primary shadow-md scale-[1.02]' 
          : 'border-border'
      }`}
    >
      {isHighlighted && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
          Recommended
        </div>
      )}
      <CardHeader className={`pb-4 ${isHighlighted ? 'bg-primary/5' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="text-primary h-10 w-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Key Features</h4>
            <ul className="text-sm space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Best For</h4>
            <div className="flex flex-wrap gap-2">
              {suitable.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button 
          onClick={onSelect} 
          className={`w-full ${isHighlighted ? 'bg-primary' : ''}`}
          variant={isHighlighted ? "default" : "outline"}
        >
          Select {title}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QMSCard;
