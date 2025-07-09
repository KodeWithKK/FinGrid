"use client";

import { Pie, PieChart as RCPieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartProps {
  title: string;
  description?: string;
  dataKey: string;
  nameKey: string;
  chartData: Record<string, any>[];
}

export default function PieChart({
  title,
  description,
  dataKey,
  nameKey,
  chartData,
}: PieChartProps) {
  const chartConfig = chartData.reduce(
    (acc, curr, i) => ({
      ...acc,
      [curr[nameKey]]: {
        label: curr[nameKey],
        color: `var(--chart-${(i % 6) + 1})`,
      },
    }),
    {},
  ) satisfies ChartConfig;

  const updatedChartData = chartData.map((curr) => ({
    ...curr,
    fill: `var(--color-${curr[nameKey]})`,
  }));

  return (
    <Card className="flex flex-col gap-0">
      <CardHeader className="items-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 px-[12%] md:px-[21%]">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square w-full"
        >
          <RCPieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
            />
            <Pie data={updatedChartData} dataKey={dataKey} />
            <ChartLegend
              content={<ChartLegendContent nameKey={nameKey} />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </RCPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
