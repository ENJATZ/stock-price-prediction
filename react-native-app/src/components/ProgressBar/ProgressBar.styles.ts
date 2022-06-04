import {Animated, View} from 'react-native';
import styled from 'styled-components/native';
import theme from '../../utils/theme';

export const ProgressBar = styled(View)`
  height: 20px;
  flex-direction: row;
  width: 200px;
  background-color: ${theme.COLORS.DARK2};
  border-color: black;
  border-radius: 5px;
  shadow-color: black;
  shadow-radius: 0px;
  shadow-opacity: 0.2;
  shadow-offset: 2px 2px;
`;
export const Fill = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${theme.COLORS.YELLOW};
  border-radius: 5px;
`;
