import React from 'react';
import { Keyboard, TouchableWithoutFeedback as Base } from 'react-native';
import styled from 'styled-components';

const TouchableWithoutFeedback = styled(Base)`
  flex: 1;
`;

const DismissKeyboard =
  Comp =>
  ({ children, ...props }) =>
    (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
        keyboardShouldPersistTaps="handled">
        <Comp {...props}>{children}</Comp>
      </TouchableWithoutFeedback>
    );

export default DismissKeyboard;
