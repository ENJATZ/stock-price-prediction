import styled from 'styled-components/native';
import { Button as GButton } from 'galio-framework';
import theme from '../../utils/theme';

export const Button = styled(GButton)<ButtonType>`
  ${({ small }) =>
    small &&
    `
    width: 75;
    height: 28;
  `}
  ${({ width }) =>
    width &&
    `
    width: ${width}
  `}
  font-size: 12px;
  font-weight: bold;
`;

type ButtonType = {
  color: typeof theme.COLORS;
  width: boolean;
};
