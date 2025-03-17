
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cva } from "class-variance-authority";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const iconVariants = cva(
  "h-5 w-5",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        success: "text-green-500",
        warning: "text-yellow-500",
        danger: "text-red-500",
        info: "text-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const cardVariants = cva(
  "overflow-hidden transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-l-4 border-l-green-500",
        warning: "border-l-4 border-l-yellow-500",
        danger: "border-l-4 border-l-red-500",
        info: "border-l-4 border-l-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  variant = "default"
}: StatCardProps) => {
  return (
    <Card className={cardVariants({ variant })}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-1.5 rounded-full bg-background border">
          <Icon className={iconVariants({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span 
              className={`text-xs px-1.5 py-0.5 rounded ${
                trend.isPositive 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {trend.isPositive ? 'Increase' : 'Decrease'} from previous period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
