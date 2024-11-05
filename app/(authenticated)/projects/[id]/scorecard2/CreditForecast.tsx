import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, Text, XAxis, YAxis } from 'recharts';

const CreditForecast: React.FC = () => {
  const chartData = [
    { forecastCredits: 8000, realisedCredits: 10000, year: '2021' },
    { forecastCredits: 10000, realisedCredits: 15000, year: '2022' },
    { forecastCredits: 12000, realisedCredits: 20000, year: '2023' },
    { forecastCredits: 14000, realisedCredits: 25000, year: '2024' },
    { forecastCredits: 16000, realisedCredits: 30000, year: '2025' },
    { forecastCredits: 18000, realisedCredits: 35000, year: '2026' },
    { forecastCredits: 20000, realisedCredits: 40000, year: '2027' },
    { forecastCredits: 22000, realisedCredits: 45000, year: '2028' },
    { forecastCredits: 24000, realisedCredits: 50000, year: '2029' },
    { forecastCredits: 26000, realisedCredits: 55000, year: '2030' },
    { forecastCredits: 28000, realisedCredits: 60000, year: '2031' },
    { forecastCredits: 30000, realisedCredits: 55000, year: '2032' },
    { forecastCredits: 32000, realisedCredits: 50000, year: '2033' },
    { forecastCredits: 34000, realisedCredits: 45000, year: '2034' },
    { forecastCredits: 36000, realisedCredits: 40000, year: '2035' },
    { forecastCredits: 38000, realisedCredits: 35000, year: '2036' },
    { forecastCredits: 40000, realisedCredits: 30000, year: '2037' },
    { forecastCredits: 42000, realisedCredits: 25000, year: '2038' },
    { forecastCredits: 44000, realisedCredits: 20000, year: '2039' },
    { forecastCredits: 45000, realisedCredits: 15000, year: '2040' },
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
    <div className='m-4 h-[400px] rounded-lg border border-neutral-200 bg-white p-6 pb-20'>
      <div className='pb-4'>
        <span className='text-2xl font-semibold'>Realised vs Forecast Credits</span>
      </div>
      <ChartContainer config={chartConfig} className='h-full w-full'>
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
              <Text x={0} y={0} dx={-150} dy={20} textAnchor='start' width={180} transform='rotate(-90)'>
                tCO2e
              </Text>
            }
          />
          <XAxis dataKey='year' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey='realisedCredits'
            type='natural'
            stroke='var(--color-realisedCredits)'
            strokeWidth={2}
            dot={{
              fill: 'var(--color-realisedCredits)',
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey='forecastCredits'
            type='natural'
            stroke='var(--color-forecastCredits)'
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
};

export default CreditForecast;
