"use client";

import {
  Area,
  CartesianGrid,
  AreaChart as RCAreaChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AreaCharProps {
  title: string;
  description?: string;
  xAxisDataKey: string;
  yAxisDataKey: string;
  yAxisDataLabel: string;
  yAxisTickFormatter?: (value: number) => string;
  chartData: Record<string, any>[];
}

export default function AreaChart({
  title,
  description,
  xAxisDataKey,
  yAxisDataKey,
  yAxisDataLabel,
  yAxisTickFormatter,
  chartData,
}: AreaCharProps) {
  const chartConfig = {
    [yAxisDataKey]: {
      label: yAxisDataLabel,
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="mb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="max-md:pl-0">
        <ChartContainer config={chartConfig}>
          <RCAreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              tickFormatter={yAxisTickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={yAxisDataKey}
              type="natural"
              fill={`var(--color-${yAxisDataKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${yAxisDataKey})`}
            />
          </RCAreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
