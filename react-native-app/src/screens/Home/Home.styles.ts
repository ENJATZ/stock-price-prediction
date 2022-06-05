import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard/DismissKeyboard';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs(
  props => ({
    behavior: 'position',
    keyboardVerticalOffset: -230,
    contentContainerStyle: {
      flexGrow: 1,
      padding: 20,
    },
    ...props,
  }),
)`
  flex: 1;
  align-items: center;
  margin-top: 120px;
`;

export const Img = styled(Animated.Image).attrs(props => ({
  source: props.source,
  resizeMode: 'contain',
}))``;

export const ViewLayout = DismissKeyboard(styled.View`
  align-items: center;
  flex: 1;
  width: 100%;
`);
