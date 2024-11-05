import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Text, XAxis, YAxis } from 'recharts';

const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

const RevenueForecast: React.FC = () => {
  const [carbonPrice, setCarbonPrice] = useState(15);

  const data = [
    { avgCarbonPrice: 15, forecastCredits: 8000, year: '2021' },
    { avgCarbonPrice: 20, forecastCredits: 10000, year: '2022' },
    { avgCarbonPrice: 22, forecastCredits: 12000, year: '2023' },
    { avgCarbonPrice: 25, forecastCredits: 14000, year: '2024' },
    { forecastCredits: 16000, year: '2025' },
    { forecastCredits: 18000, year: '2026' },
    { forecastCredits: 20000, year: '2027' },
    { forecastCredits: 22000, year: '2028' },
    { forecastCredits: 24000, year: '2029' },
    { forecastCredits: 26000, year: '2030' },
    { forecastCredits: 28000, year: '2031' },
    { forecastCredits: 30000, year: '2032' },
    { forecastCredits: 32000, year: '2033' },
    { forecastCredits: 34000, year: '2034' },
    { forecastCredits: 36000, year: '2035' },
    { forecastCredits: 38000, year: '2036' },
    { forecastCredits: 40000, year: '2037' },
    { forecastCredits: 42000, year: '2038' },
    { forecastCredits: 44000, year: '2039' },
    { forecastCredits: 45000, year: '2040' },
  ];

  const chartData = data.map((d) => ({
    estimatedRev: d.avgCarbonPrice ? d.avgCarbonPrice * d.forecastCredits : carbonPrice * d.forecastCredits,
    forecastCredits: d.forecastCredits,
    year: d.year,
  }));

  const chartConfig = {
    estimatedRev: {
      color: 'hsl(var(--chart-2))',
      label: 'Estimated Rev.',
    },
    forecastCredits: {
      color: 'hsl(var(--chart-4))',
      label: 'Forecast Credits',
    },
  } satisfies ChartConfig;

  return (
    <div className='m-4 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-6 pb-20'>
      <div className='pb-4'>
        <span className='text-2xl font-semibold'>Revenue Scenario Over Time</span>
      </div>
      <ChartContainer config={chartConfig} className='h-[500px] w-full'>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 30,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => formatter.format(value).slice(0, -3)}
            label={
              <Text x={0} y={0} dx={-250} dy={10} textAnchor='start' width={180} transform='rotate(-90)'>
                Estimated Revenue
              </Text>
            }
          />
          <XAxis
            dataKey='year'
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            // label={<Text dx={580} dy={300} textAnchor='middle'>Years</Text>}
            tickFormatter={(value) => value.toString()}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey='estimatedRev'
            type='natural'
            stroke='var(--color-estimatedRev)'
            strokeWidth={2}
            dot={{
              fill: 'var(--color-estimatedRev)',
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
          <Legend
            verticalAlign='top'
            formatter={(value: 'estimatedRev' | 'forecastCredits') => chartConfig[value].label}
          />
        </LineChart>
      </ChartContainer>
      <div className='flex flex-row justify-center gap-4 rounded-sm bg-neutral-100 p-4'>
        <div className='flex w-full flex-col gap-2 text-xs text-neutral-500'>
          <span>Agreed price: $10.50</span>
          <span>Current price: $14.78</span>
          <span>Last updated on 24 Oct 2024</span>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <span className='text-xs text-neutral-500'>{formatter.format(carbonPrice)}</span>
          <Slider defaultValue={[15]} max={100} step={0.1} onValueChange={(value) => setCarbonPrice(value[0])} />
        </div>
      </div>
    </div>
  );
};

export default RevenueForecast;
