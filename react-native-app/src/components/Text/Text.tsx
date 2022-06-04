import React from 'react';
import * as S from './Text.styles';

export const Text = (props: IText) => {
  const {children} = props;
  return <S.Text {...props}>{children}</S.Text>;
};
export type IText = {
  children?: any;
  size?: string;
  color?: string;
  style?: any;
};
