"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
//   type: "donut-chart",
//   title: "Visitors Growth",
//   description: "January - June 2024",
//   donutTitle: 1125,
//   donutSubtitle: "Visitors",
//   dataKey: "visitors",
//   nameKey: "browser",
//   chartData: [
//     { browser: "chrome", visitors: 275, donutLabel: "Chrome" },
//     { browser: "safari", visitors: 200, donutLabel: "Safari" },
//     { browser: "firefox", visitors: 287, donutLabel: "Firefox" },
//     { browser: "edge", visitors: 173, donutLabel: "Edge" },
//     { browser: "other", visitors: 190, donutLabel: "Other" },
//   ],
// };

interface DonutChartProps {
  title: string;
  description: string;
  donutTitle: number;
  donutSubtitle: string;
  dataKey: string;
  nameKey: string;
  chartData: Record<string, any>[];
}

export default function DonutChart({
  title,
  description,
  donutTitle,
  donutSubtitle,
  dataKey,
  nameKey,
  chartData,
}: DonutChartProps) {
  const chartConfig = chartData.reduce(
    (acc, curr, i) => ({
      ...acc,
      [curr[nameKey]]: {
        label: curr?.donutLabel,
        color: `hsl(var(--chart-${(i % 5) + 1}))`,
      },
    }),
    {},
  ) satisfies ChartConfig;

  const updatedChartData = chartData.map((curr) => ({
    ...curr,
    fill: `var(--color-${curr[nameKey]})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={updatedChartData}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {donutTitle}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {donutSubtitle}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
