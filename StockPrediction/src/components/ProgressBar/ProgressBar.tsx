import React from 'react';
import * as S from './ProgressBar.styles';

export const ProgressBar = ({aWidth}: IProgressBar) => {
  return (
    <S.ProgressBar>
      <S.Fill style={{width: aWidth}}></S.Fill>
    </S.ProgressBar>
  );
};

type IProgressBar = {
  aWidth?: any;
};
