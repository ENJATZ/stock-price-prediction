import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as S from './Button.styles';
import theme from '../../utils/theme';
import { Icon } from 'galio-framework';

export const Button = ({ children, color = 'PRIMARY' }: IButton) => {
  return <S.Button>{children}</S.Button>;
};

type IButton = {
  color?: string;
  children?: any;
};
