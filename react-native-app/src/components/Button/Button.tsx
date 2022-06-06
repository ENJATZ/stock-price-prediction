import React from 'react';
import * as S from './Button.styles';

export const Button = (props: IButton) => {
  return <S.Button {...props}>{props.children}</S.Button>;
};

type IButton = {
  color?: string;
  children?: any;
  width?: string;
};
