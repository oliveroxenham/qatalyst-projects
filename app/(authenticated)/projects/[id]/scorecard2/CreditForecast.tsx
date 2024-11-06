import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, Text, XAxis, YAxis } from 'recharts';

function CreditForecast({ project = 1 }: { project?: number }) {
  const chartData =
    project === 1
      ? [
          { realisedCredits: 3854572, forecastCredits: 1400000, year: '2013' },
          { realisedCredits: 3079496, forecastCredits: 1400000, year: '2014' },
          { realisedCredits: 2168043, forecastCredits: 1400000, year: '2015' },
          { realisedCredits: 2267566, forecastCredits: 1400000, year: '2016' },
          { realisedCredits: 1804031, forecastCredits: 1400000, year: '2017' },
          { realisedCredits: 439129, forecastCredits: 1400000, year: '2018' },
          { realisedCredits: 955477, forecastCredits: 1400000, year: '2019' },
          { realisedCredits: 1868973, forecastCredits: 1400000, year: '2020' },
          { realisedCredits: 2437137, forecastCredits: 1400000, year: '2021' },
          { forecastCredits: 1400000, year: '2022' },
          { forecastCredits: 1400000, year: '2023' },
          { forecastCredits: 1400000, year: '2024' },
          { forecastCredits: 1400000, year: '2025' },
          { forecastCredits: 1400000, year: '2026' },
          { forecastCredits: 1400000, year: '2027' },
          { forecastCredits: 1400000, year: '2028' },
          { forecastCredits: 1400000, year: '2029' },
          { forecastCredits: 1400000, year: '2030' },
          { forecastCredits: 1400000, year: '2031' },
          { forecastCredits: 1400000, year: '2032' },
        ]
      : [
          { realisedCredits: 140450, forecastCredits: 120147, year: '2013' },
          { realisedCredits: 162177, forecastCredits: 120147, year: '2014' },
          { realisedCredits: 179634, forecastCredits: 120147, year: '2015' },
          { realisedCredits: 184219, forecastCredits: 120147, year: '2016' },
          { realisedCredits: 174227, forecastCredits: 120147, year: '2017' },
          { realisedCredits: 188983, forecastCredits: 120147, year: '2018' },
          { realisedCredits: 188983, forecastCredits: 120147, year: '2019' },
          { realisedCredits: 188984, forecastCredits: 120147, year: '2020' },
          { realisedCredits: 120147, forecastCredits: 120147, year: '2021' },
          { forecastCredits: 120147, year: '2022' },
          { forecastCredits: 120147, year: '2023' },
          { forecastCredits: 120147, year: '2024' },
          { forecastCredits: 120147, year: '2025' },
          { forecastCredits: 120147, year: '2026' },
          { forecastCredits: 120147, year: '2027' },
          { forecastCredits: 120147, year: '2028' },
          { forecastCredits: 120147, year: '2029' },
          { forecastCredits: 120147, year: '2030' },
          { forecastCredits: 120147, year: '2031' },
          { forecastCredits: 120147, year: '2032' },
        ];

  const chartConfig = {
    forecastCredits: {
      color: 'hsl(var(--chart-2))',
      label: 'Forecast Credits',
    },
    realisedCredits: {
      color: 'hsl(var(--chart-1))',
      label: 'Realised Credits',
    },
  } satisfies ChartConfig;

  return (
    <div className="h-[400px] rounded-lg border border-neutral-200 bg-white p-6 pb-20">
      <div className="pb-4">
        <span className="text-2xl font-semibold">
          Realised vs Forecast Credits
        </span>
      </div>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          // margin={{
          //   left: 12,
          //   right: 12,
          // }}
        >
          <CartesianGrid vertical={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            label={
              <Text
                x={0}
                y={0}
                dx={-150}
                dy={20}
                textAnchor="start"
                width={180}
                transform="rotate(-90)"
              >
                tCO2e
              </Text>
            }
          />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="realisedCredits"
            type="natural"
            stroke="var(--color-realisedCredits)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-realisedCredits)',
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="forecastCredits"
            type="natural"
            stroke="var(--color-forecastCredits)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-forecastCredits)',
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default CreditForecast;
