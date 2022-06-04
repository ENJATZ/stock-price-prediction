import styled from 'styled-components/native';
import {Text as GText} from 'galio-framework';
import theme from '../../utils/theme';

export const Text = styled(GText)<IText>`
  color: ${p => (typeof p.color === 'string' ? p.color : theme.COLORS.WHITE)};
  font-size: ${p =>
    typeof p.size === 'string' ? parseInt(p.size) : theme.CONSTANTS.FONT};
  font-weight: bold;
`;

export type IText = {
  children?: any;
  size?: string;
  color?: string;
};
