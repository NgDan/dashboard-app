import styled from 'styled-components';
import colors from '../../constants/colors';
import { rem } from 'polished';
import React, { FC, useState } from 'react';

export type Item = { value: string; selected: boolean };

interface DropdownProps {
  label: string;
  items: Item[];
  onItemClick: Function;
  setSelectedItems: Function;
  allowMultipleSelection?: boolean;
}
const Wrapper = styled.div`
  min-height: ${rem(250)};
`;
const Label = styled.div`
  border: 1px solid ${colors.blue};
  border-radius: ${rem(6)};
  text-align: center;
  padding: ${rem(8)} ${rem(16)};
  &:hover {
    cursor: pointer;
  }
`;
const Menu = styled.ul`
  margin: 0;
  list-style: none;
  padding: ${rem(8)};
  border: 1px solid ${colors.blue};
  border-radius: ${rem(6)};
  box-shadow: 0 0 6px 2px #ccc;
`;
const Item = styled.li<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? colors.blue : '#fff')};
  padding: ${rem(4)} ${rem(8)};
  &:hover {
    cursor: pointer;
  }
`;

const Dropdown: FC<DropdownProps> = ({
  label,
  items,
  onItemClick,
  setSelectedItems,
  allowMultipleSelection = false,
}) => {
  const [display, setDisplay] = useState(false);
  return (
    <Wrapper>
      <Label
        onClick={() => {
          setDisplay(!display);
        }}
      >
        {label}
      </Label>
      {display ? (
        <Menu>
          {items.map((item) => (
            <Item
              key={item.value}
              onClick={() => {
                onItemClick(
                  item,
                  items,
                  setSelectedItems,
                  allowMultipleSelection
                );
              }}
              selected={item.selected}
            >
              {item.value}
            </Item>
          ))}
        </Menu>
      ) : null}
    </Wrapper>
  );
};

export { Dropdown };
