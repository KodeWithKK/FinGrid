"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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

// const sampleProps = {
//   type: "bar-chart",
//   title: "Visitors Growth",
//   description: "January - June 2024",
//   xAxisDataKey: "month",
//   yAxisDataKey: "desktop",
//   yAxisDataLabel: "Desktop",
//   chartData: [
//     { month: "January", desktop: 186 },
//     { month: "February", desktop: 305 },
//     { month: "March", desktop: 237 },
//     { month: "April", desktop: 73 },
//     { month: "May", desktop: 209 },
//     { month: "June", desktop: 214 },
//   ],
// };

interface HZBarChartProps {
  title: string;
  description: string;
  xAxisDataKey: string;
  yAxisDataKey: string;
  yAxisDataLabel: string;
  chartData: Record<string, any>[];
}

export default function HZBarChart({
  title,
  description,
  xAxisDataKey,
  yAxisDataKey,
  yAxisDataLabel,
  chartData,
}: HZBarChartProps) {
  const chartConfig = {
    [yAxisDataKey]: {
      label: yAxisDataLabel,
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>J{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={xAxisDataKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey={yAxisDataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey={yAxisDataKey}
              fill={`var(--color-${yAxisDataKey})`}
              radius={4}
            >
              <LabelList
                dataKey={xAxisDataKey}
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
                formatter={(value: any) => {
                  return typeof value === "string"
                    ? value.length > 25
                      ? value.slice(0, 25) + "..."
                      : value
                    : value;
                }}
              />
              <LabelList
                dataKey={yAxisDataKey}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
