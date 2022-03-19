import { Block, Text } from 'galio-framework';
import styled from 'styled-components/native';
import theme from '../../utils/theme';

export const InlineSummary = styled(Block)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 45%;
`;

export const Title = styled(Text)`
  font-size: 13px;
  color: #ffffcc;
  display: flex;
`;

export const Value = styled(Text)`
  font-size: 15px;
  color: #ffffff;
  display: flex;
`;
