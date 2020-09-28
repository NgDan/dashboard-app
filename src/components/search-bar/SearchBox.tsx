import styled from 'styled-components';
import colors from '../../constants/colors';
import { rem } from 'polished';
import React, { FC, useState, useEffect } from 'react';

export const Wrapper = styled.div`
  background-color: ${colors.blue};
  height: ${rem(20)};
`;

const Input = styled.input`
  margin-left: ${rem(48)};
`;
const searchByCveId = (
  searchWord: string,
  items: Array<Partial<{ 'CVE ID': string }>>
) => {
  if (searchWord === '') {
    return items;
  }
  return items.filter(
    (item) => item?.['CVE ID']?.toUpperCase() === searchWord?.toUpperCase()
  );
};
interface SearchBoxProps {
  setFilteredDashboardData: Function;
  dashboardData: Array<Object>;
}

const SearchBox: FC<SearchBoxProps> = ({
  setFilteredDashboardData,
  dashboardData,
}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setFilteredDashboardData(searchByCveId(value, dashboardData));
  }, [dashboardData, setFilteredDashboardData, value]);
  return (
    <Input
      value={value}
      placeholder='Search by CVE ID'
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export { SearchBox };
