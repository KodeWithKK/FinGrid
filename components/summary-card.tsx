import { TrendingUp } from "lucide-react";

import { IconProps } from "@/components/icons";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";

interface SummaryCard {
  title: string;
  amount: number;
  percentage: number;
  Icon: React.FC<IconProps>;
}

function SummaryCard({ title, amount, percentage, Icon }: SummaryCard) {
  return (
    <div className="bg-card border-border/60 hover:border-border w-full space-y-2 rounded-md border p-6 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          {title}
        </span>
        <Icon className="text-muted-foreground h-4" />
      </div>

      <h2 className="text-2xl font-semibold">{formatPrice(amount)}</h2>
      <div
        className={cn(
          "text-primary flex items-center text-xs",
          percentage >= 0 ? "text-primary" : "text-destructive",
        )}
      >
        <TrendingUp className="h-3.5" />
        <span>
          {percentage >= 0 ? "+" : "-"}
          {Math.abs(percentage).toFixed(2)}%
        </span>
        <span className="text-muted-foreground ml-1">from last month</span>
      </div>
    </div>
  );
}

export default SummaryCard;
