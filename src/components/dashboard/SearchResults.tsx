import styled from 'styled-components';
import { rem } from 'polished';
import React, { FC } from 'react';
import Grid from './Grid';
import { Chart } from './Chart';

export const Wrapper = styled.div`
  background-color: white;
  padding: ${rem(16)};
  width: 100%;
`;

interface SearchResultsProps {
  dashboardData: Array<Object>;
  chartData: Array<number>;
  series: any;
  generateGraph: Boolean;
  selectedYear: number;
}

const SearchResults: FC<SearchResultsProps> = ({
  dashboardData,
  chartData,
  series,
  generateGraph,
  selectedYear,
}) => {
  return (
    <Wrapper>
      <Grid dashboardData={dashboardData} />
      {generateGraph ? (
        <Chart
          chartData={chartData}
          series={series}
          selectedYear={selectedYear}
        />
      ) : null}
    </Wrapper>
  );
};

export { SearchResults };
