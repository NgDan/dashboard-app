import styled from 'styled-components';
import colors from '../../constants/colors';
import { rem } from 'polished';

export const SearchBar = styled.div`
  background-color: ${colors.blue};
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: ${rem(8)} ${rem(16)} ${rem(8)};
`;

export const Analysis = styled.p`
  margin: 0;
`;
