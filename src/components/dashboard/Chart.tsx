import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import * as Highcharts from 'highcharts';

const Wrapper = styled.div``;
interface ChartProps {
  chartData: Array<number>;
  series: any;
  selectedYear: number;
}
const Chart: FC<ChartProps> = ({ chartData, series, selectedYear }) => {
  useEffect(() => {
    Highcharts.chart({
      chart: {
        renderTo: 'chart-container',
        marginLeft: 100,
        type: 'line',
      },
      title: {
        text: `CVE analysis for ${selectedYear}`,
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: Jan to Dec',
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: Date.UTC(2015, 0, 1),
          pointInterval: 24 * 3600 * 1000 * 30,
        },
      },

      series: series,

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    });
  }, [chartData, selectedYear, series]);
  return <Wrapper id='chart-container' />;
};

export { Chart };
