import React, { useState, useEffect } from 'react';
import { Wrapper } from './components/Wrapper';
import { SearchBar } from './components/search-bar/SearchBar';
import { SearchBox } from './components/search-bar/SearchBox';
import { Analysis } from './components/search-bar/SearchBar';
import { ShowHide } from './components/search-bar/ShowHide';
import { GlobalStyle } from './components/search-bar/ShowHide';
import { Dashboard } from './components/dashboard/Dashboard';
import CVEData from './data/CVE.json';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const yearItems = [
  { value: '2015', selected: true },
  { value: '2016', selected: false },
  { value: '2017', selected: false },
  { value: '2018', selected: false },
  { value: '2019', selected: false },
  { value: '2020', selected: false },
];

const formatDate = (date: string): string => {
  return `${new Date(date).getDate()} ${
    months[new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`;
};
const getYear = (date: string): number => {
  return new Date(date)?.getFullYear();
};
const getMonth = (date: string): string => {
  return months[new Date(date)?.getMonth()];
};

const getSeverityIndex = (sev: string) => {
  return severities.indexOf(sev);
};

const countSeverityByMonth = (
  severity: string,
  month: number,
  acc: Array<Array<number>>
) => {
  if (getSeverityIndex(severity) < 0) {
    return acc;
  }
  acc[getSeverityIndex(severity)][month] =
    acc[getSeverityIndex(severity)][month] + 1;
  return acc;
};

const countSeverities = (
  acc: Array<Array<number>>,
  severity: string,
  publishedDate: string
) => {
  switch (getMonth(publishedDate)) {
    case months[0]:
      return countSeverityByMonth(severity, 0, acc);
    case months[1]:
      return countSeverityByMonth(severity, 1, acc);
    case months[2]:
      return countSeverityByMonth(severity, 2, acc);
    case months[3]:
      return countSeverityByMonth(severity, 3, acc);
    case months[4]:
      return countSeverityByMonth(severity, 4, acc);
    case months[5]:
      return countSeverityByMonth(severity, 5, acc);
    case months[6]:
      return countSeverityByMonth(severity, 6, acc);
    case months[7]:
      return countSeverityByMonth(severity, 7, acc);
    case months[8]:
      return countSeverityByMonth(severity, 8, acc);
    case months[9]:
      return countSeverityByMonth(severity, 9, acc);
    case months[10]:
      return countSeverityByMonth(severity, 10, acc);
    case months[11]:
      return countSeverityByMonth(severity, 11, acc);
    default:
      return acc;
  }
};

export default function App() {
  const Data: any = CVEData;
  const [selectedYearItems, setSelectedYearItems] = useState(yearItems);
  const [dashboardData, setDashboardData] = useState([]);
  const [filteredDashboardData, setFilteredDashboardData] = useState([]);

  const selectedYear: number =
    +selectedYearItems.filter((item) => {
      return item.selected;
    })[0].value ?? 2015;

  useEffect(() => {
    const dashboardData = Data.CVE_Items.map((item: any) => {
      return {
        'CVE ID': item?.cve?.CVE_data_meta?.ID ?? 'NO_DATA',
        'PUBLISHED DATE': formatDate(item?.publishedDate) ?? 'NO_DATA',
        SEVERITY:
          item.impact?.baseMetricV3?.cvssV3?.baseSeverity ??
          item.impact?.baseMetricV2?.severity ??
          'NO_DATA',
        DESCRIPTION:
          item.cve?.description?.description_data?.[0]?.value ?? 'NO_DATA',
      };
    });
    setDashboardData(dashboardData);
    setFilteredDashboardData(dashboardData);
  }, [Data.CVE_Items]);
  const [checked, setChecked] = useState(true);

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const chartData = Data.CVE_Items.reduce(
      (acc: any, currentItem: any) => {
        if (getYear(currentItem?.publishedDate) === selectedYear) {
          return countSeverities(
            acc,
            currentItem.impact?.baseMetricV3?.cvssV3?.baseSeverity ??
              currentItem.impact?.baseMetricV2?.severity,
            currentItem?.publishedDate
          );
        }
        return acc;
      },
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    );
    setChartData(chartData);
  }, [Data.CVE_Items, selectedYear]);

  const severityItems = [
    { value: 'low', selected: false },
    { value: 'medium', selected: false },
    { value: 'high', selected: false },
    { value: 'critical', selected: false },
  ];
  const [selectedSeverityItems, setSelectedSeverityItems] = useState(
    severityItems
  );
  const selectedSeverities = selectedSeverityItems
    .filter((item) => item.selected)
    .map((item) => item.value);

  const series = severities
    .map((severity, i) => {
      return {
        name: severity,
        data: chartData[severities.indexOf(severity)],
      };
    })
    .filter((item) => {
      return selectedSeverities.some(
        (severity) => item.name === severity.toUpperCase()
      );
    });

  const [generateGraph, setGenerateGraph] = useState(false);
  return (
    <Wrapper>
      <SearchBar>
        <GlobalStyle />
        <Analysis>CVE Analysis</Analysis>
        <SearchBox
          dashboardData={dashboardData}
          setFilteredDashboardData={setFilteredDashboardData}
        />
        <ShowHide setChecked={setChecked} checked={checked} />
      </SearchBar>
      <Dashboard
        dashboardData={filteredDashboardData}
        selectedYearItems={selectedYearItems}
        setSelectedYearItems={setSelectedYearItems}
        checked={checked}
        chartData={chartData}
        series={series}
        selectedSeverityItems={selectedSeverityItems}
        setSelectedSeverityItems={setSelectedSeverityItems}
        generateGraph={generateGraph}
        setGenerateGraph={setGenerateGraph}
        selectedYear={selectedYear}
      />
    </Wrapper>
  );
}
