import { Block, Text } from 'galio-framework';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../utils/theme';

export const RatingIndicator = styled(Block)`
  margin-top: 30px;
  width: 90%;
`;
export const MainLine = styled(LinearGradient).attrs({
  colors: ['#97d948', '#e27c7c'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 100%;
  background-color: #ffffcc;
  height: 10px;
  border-radius: 5px;
  position: relative;
`;

export const LimitIndicator = styled(Text)<IndicatorType>`
  font-size: 12px;
  margin-top: 13px;
  position: absolute;
  color: #ffffff;
  left: ${p => (typeof p.value === 'number' ? `${p.value - 5}%` : '0%')};
`;

export const ValueIndicator = styled(Block)<IndicatorType>`
  position: absolute;
  bottom: 155%;
  background-color: #badbdb;
  border-radius: 10px;
  padding: 5px;
  left: ${p => (typeof p.value === 'number' ? `${p.value * 20}%` : '0%')};
`;
export const CaretDown = styled(Block)<IndicatorType>`
  position: absolute;
  bottom: 120%;
  left: ${p =>
    typeof p.value === 'number'
      ? `${p.value * 20.5 + (p.value.toString().length > 1 ? 1.7 : 0)}%`
      : '0%'};
  background-color: transparent;
  width: 0;
  height: 0;
  border-top-width: 6px;
  border-right-width: 6px;
  border-bottom: 0;
  border-left-width: 6px;
  border-top-color: #badbdb;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
`;

type IndicatorType = {
  value: number;
};
