import styled, { css } from 'styled-components';

export const small = (...args) => css`
  @media screen and (max-width: 600px) {
    ${ css(...args) }
  }
`;
export const medium = (...args) => css`
  @media screen and (min-width: 601px) and (max-width: 1200px) {
    ${ css(...args) }
  }
`;
export const large = (...args) => css`
  @media screen and (min-width: 1201px) {
    ${ css(...args) }
  }
`;

export const Flex = styled.div`
  display: flex;
  ${props => props.comment && css`
    border-bottom: 1pt solid #eee;
    margin: 7.5px 0;
  `}
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const easeOutCubic = 'cubic-bezier(0.215, 0.610, 0.355, 1.000)';
