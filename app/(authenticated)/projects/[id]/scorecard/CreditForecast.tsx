'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Image from 'next/image';
import { IssuanceRecord } from '@/types/project';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { abbreviateNumber } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const CreditForecast = ({
  carbonCredits = 0,
  creditingEndDate,
  creditingStartDate,
  issuanceRecords,
}: {
  readonly issuanceRecords: IssuanceRecord[];
  readonly carbonCredits?: number;
  readonly creditingStartDate?: string;
  readonly creditingEndDate?: string;
}) => {
  const { t } = useTranslation();
  
  const forecastStartYear = creditingStartDate
    ? new Date(creditingStartDate).getFullYear()
    : 0;
  const forecastEndYear = creditingEndDate
    ? new Date(creditingEndDate).getFullYear()
    : 0;
  const chartDataByYear: {
    [year: string]: { forecast: number; issued?: number };
  } = {};
  const chartData: Array<{
    forecast: number;
    issued?: number;
    year: string;
  }> = [];
  const currentYear = new Date().getFullYear();

  /* Setting `issued` to undefined for every year by default so its not plotted on the chart */
  if (forecastStartYear) {
    for (let year = forecastStartYear; year <= forecastEndYear; year++) {
      chartDataByYear[year.toString()] = {
        forecast: carbonCredits,
        issued: undefined,
      };
    }
  }

  issuanceRecords.forEach((record) => {
    chartDataByYear[record.year] = {
      ...chartDataByYear[record.year],
      forecast: carbonCredits,
      issued: Number(record.totalQuantity),
    };
  });

  let issued;
  let issuanceStarted = false;
  /*
    This section of code iterates through each year in the chartDataByYear object.
    For each year, it determines the value of 'issued' credits based on certain conditions.
    If issuance has started (i.e., there is a record of issued credits in the past) and the current year is not beyond the current year,
    and there is no specific record of issued credits for the current year, then 'issued' is set to 0.
    Otherwise, 'issued' takes the value of the issued credits for the current year as recorded in chartDataByYear.
    The code also checks if issuance has started by looking for any non-undefined value of 'issued' in the past years.
    If issuance has not started and a non-undefined value of 'issued' is found, it sets issuanceStarted to true.
    Finally, it pushes an object containing the forecast, issued credits, and the year to the chartData array.
  */
  Object.keys(chartDataByYear).forEach((year) => {
    issued =
      issuanceStarted &&
      typeof chartDataByYear[year].issued === 'undefined' &&
      Number(year) <= Number(currentYear)
        ? 0
        : chartDataByYear[year].issued;

    if (!issuanceStarted && typeof issued !== 'undefined') {
      issuanceStarted = true;
    }

    chartData.push({
      forecast: chartDataByYear[year].forecast,
      issued,
      year: year.toString(),
    });
  });

  const chartConfig = {
    forecast: {
      color: 'hsl(var(--chart-2))',
      label: t('scorecard.annualCreditIssuance'),
    },
    issued: {
      color: 'hsl(var(--chart-1))',
      label: t('scorecard.totalCredits'),
    },
  } satisfies ChartConfig;

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="h-[400px]">
        {chartData && chartData.length > 0 && (
          <div>
            <span className="text-xl font-semibold">
              {t('scorecard.annualCreditIssuance')}
            </span>{' '}
            (
            <span className="text-md font-normal">
              tCO<sub>2</sub>e
            </span>
            )
          </div>
        )}
        {chartData && chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="h-[90%] w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => abbreviateNumber(value)}
              />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend
                verticalAlign="top"
                iconType="circle"
                height={30}
                iconSize={8}
                // eslint-disable-next-line react/no-unstable-nested-components
                formatter={(value) => (
                  <span className="capitalize text-foreground">{value}</span>
                )}
              />
              <defs>
                <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-forecast)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-forecast)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillIssued" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-issued)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-issued)"
                    stopOpacity={0.8}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="forecast"
                type="linear"
                fill="url(#fillForecast)"
                fillOpacity={0.4}
                stroke="var(--color-forecast)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-forecast)',
                }}
                activeDot={{
                  r: 6,
                }}
              />
              <Area
                dataKey="issued"
                type="linear"
                fill="url(#fillIssued)"
                fillOpacity={0.4}
                stroke="var(--color-issued)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-issued)',
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
        {!chartData ||
          (chartData.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
              <Image
                src="/chart-empty.svg"
                width={154}
                height={140}
                alt="Data coming soon."
              />
              <span className="text-xs text-neutral-500">
                {t('scorecard.annualCreditIssuance')}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreditForecast;
