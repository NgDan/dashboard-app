import styled from 'styled-components';
import { rem } from 'polished';
import React, { FC } from 'react';
import { SideBar } from './SideBar';
import { SearchResults } from './SearchResults';
import { Item } from './Dropdown';

export const Wrapper = styled.div`
  margin-top: ${rem(16)};
  display: flex;
  flex-flow: row;
`;

interface DashboardProps {
  dashboardData: Array<Object>;
  checked: boolean;
  chartData: Array<number>;
  selectedYearItems: Item[];
  setSelectedYearItems: Function;
  series: any;
  selectedSeverityItems: Item[];
  setSelectedSeverityItems: Function;
  generateGraph: Boolean;
  setGenerateGraph: Function;
  selectedYear: number;
}

const Dashboard: FC<DashboardProps> = ({
  dashboardData,
  checked,
  chartData,
  selectedYearItems,
  setSelectedYearItems,
  selectedSeverityItems,
  setSelectedSeverityItems,
  series,
  generateGraph,
  setGenerateGraph,
  selectedYear,
}) => {
  return (
    <Wrapper>
      <SideBar
        checked={checked}
        selectedYearItems={selectedYearItems}
        setSelectedYearItems={setSelectedYearItems}
        selectedSeverityItems={selectedSeverityItems}
        setSelectedSeverityItems={setSelectedSeverityItems}
        setGenerateGraph={setGenerateGraph}
      />
      <SearchResults
        dashboardData={dashboardData}
        chartData={chartData}
        series={series}
        generateGraph={generateGraph}
        selectedYear={selectedYear}
      />
    </Wrapper>
  );
};

export { Dashboard };
