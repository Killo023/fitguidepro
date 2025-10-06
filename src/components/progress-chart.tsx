'use client';

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { ProgressEntry } from '@/types';
import { kgToLbs } from '@/lib/utils';

interface ProgressChartProps {
  data: ProgressEntry[];
  targetWeight: number;
  units: 'metric' | 'imperial';
}

const getChartConfig = (units: 'metric' | 'imperial') => {
    const weightLabel = units === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';
    const targetLabel = units === 'metric' ? 'Target (kg)' : 'Target (lbs)';
    return {
        weight: {
            label: weightLabel,
            color: 'hsl(var(--primary))',
        },
        target: {
            label: targetLabel,
            color: 'hsl(var(--muted-foreground))',
        }
    } satisfies ChartConfig;
}

export default function ProgressChart({ data, targetWeight, units }: ProgressChartProps) {
  const chartConfig = getChartConfig(units);
  const weightUnit = units === 'metric' ? 'kg' : 'lbs';

  const formattedData = data.map(entry => {
    const weight = units === 'imperial' ? kgToLbs(entry.weight) : entry.weight;
    const target = units === 'imperial' ? kgToLbs(targetWeight) : targetWeight;
    return {
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: parseFloat(weight.toFixed(1)),
        target: parseFloat(target.toFixed(1)),
    }
  });

  const allWeights = formattedData.flatMap(d => [d.weight, d.target]);
  const yDomain = [
    Math.min(...allWeights) - 2,
    Math.max(...allWeights) + 2
  ];

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer>
        <LineChart
          accessibilityLayer
          data={formattedData}
          className="glow-line"
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tickFormatter={(value) => value.slice(0, 6)}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
              domain={yDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}${weightUnit}`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
          />
          <ChartTooltip
            cursor={{stroke: 'hsl(var(--accent))', strokeWidth: 1, strokeDasharray: "3 3"}}
            content={
                <ChartTooltipContent 
                    indicator="dot"
                    labelClassName='font-bold text-lg'
                    className='bg-popover/80 backdrop-blur-sm border-accent/50'
                />
            }
          />
          <Line
            dataKey="weight"
            type="monotone"
            stroke="var(--color-weight)"
            strokeWidth={2.5}
            dot={{
              fill: 'hsl(var(--primary))',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
              r: 5,
            }}
            activeDot={{
              r: 8,
              strokeWidth: 2,
              stroke: 'hsl(var(--primary))',
              fill: 'hsl(var(--background))',
            }}
          />
           <Line
            dataKey="target"
            type="monotone"
            stroke="var(--color-target)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
