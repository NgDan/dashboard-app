import styled from 'styled-components';
import breakpoints from '../constants/breakpoints';
import { rem } from 'polished';
import colors from '../constants/colors';
export const Wrapper = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  background-color: ${colors.bgGrey};
  margin: auto;
  margin-top: ${rem(32)};
  width: calc(100% - ${rem(32)});
  padding: ${rem(16)};

  @media only screen and (min-width: ${breakpoints.tabletPortrait + `px`}) {
    max-width: ${breakpoints.tabletPortrait + `px`};
    width: calc(100% - ${rem(32)});
  }
  @media only screen and (min-width: ${breakpoints.tablet + `px`}) {
    max-width: ${breakpoints.tablet + `px`};
  }
`;
