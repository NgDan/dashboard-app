import styled from 'styled-components';
import colors from '../../constants/colors';
import { rem } from 'polished';
import React, { FC, useEffect } from 'react';
import { Dropdown, Item } from './Dropdown';
import { itemsSelector } from '../../helpers/itemsSelector';

export const Wrapper = styled.div`
  width: ${rem(250)};
  background-color: white;
  padding: ${rem(16)};
  margin-right: ${rem(16)};
`;

const GenerateGrapth = styled.button`
  border: 1px solid ${colors.blue};
  border-radius: ${rem(6)};
  text-align: center;
  padding: ${rem(8)} ${rem(16)};
  background-color: white;
  font-size: ${rem(16)};
  transition: background-color 200ms ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${colors.blue};
    color: white;
  }
`;

const ValidationErrorMessage = styled.p`
  border: 1px solid red;
  border-radius: ${rem(6)};
  padding: ${rem(16)};
`;

interface SideBarProps {
  checked: boolean;
  selectedYearItems: Item[];
  setSelectedYearItems: Function;
  selectedSeverityItems: Item[];
  setSelectedSeverityItems: Function;
  setGenerateGraph: Function;
}

const SideBar: FC<SideBarProps> = ({
  checked,
  selectedYearItems,
  setSelectedYearItems,
  selectedSeverityItems,
  setSelectedSeverityItems,
  setGenerateGraph,
}) => {
  const numberOfSeverities = selectedSeverityItems.reduce(
    (acc, currentValue) => {
      if (currentValue.selected) {
        return acc + 1;
      }
      return acc;
    },
    0
  );

  useEffect(() => {
    if (numberOfSeverities < 1) {
      setGenerateGraph(false);
    }
  }, [numberOfSeverities, setGenerateGraph]);
  return (
    <>
      {checked ? (
        <Wrapper>
          <Dropdown
            label='Select year'
            items={selectedYearItems}
            setSelectedItems={setSelectedYearItems}
            onItemClick={itemsSelector}
          />
          <Dropdown
            label='Select Severity'
            items={selectedSeverityItems}
            setSelectedItems={setSelectedSeverityItems}
            onItemClick={itemsSelector}
            allowMultipleSelection
          />
          <GenerateGrapth
            onClick={() => {
              if (numberOfSeverities > 0) {
                setGenerateGraph(true);
              }
            }}
          >
            Generate graph
          </GenerateGrapth>
          {numberOfSeverities < 1 ? (
            <ValidationErrorMessage>
              Please select at least one severity from the dropdown
            </ValidationErrorMessage>
          ) : null}
        </Wrapper>
      ) : null}
    </>
  );
};

export { SideBar };
