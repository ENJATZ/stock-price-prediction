import { Block } from 'galio-framework';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, Animated } from 'react-native';
import theme from '../../utils/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export const Loading = ({ step, showBar = false }: LoadingType) => {
  const loaderValue = useRef(new Animated.Value(0)).current;
  const countInterval = useRef<any>(null);
  const { height } = Dimensions.get('screen');
  const [loading, setLoading] = useState(0);

  useFocusEffect(
    useCallback(() => {
      clearInterval(countInterval.current);
      setLoading(old => old + step);
      countInterval.current = setInterval(() => {
        setLoading(old => old + step);
      }, 500);
    }, []),
  );
  useEffect(() => {
    const load = (count: any) => {
      Animated.timing(loaderValue, {
        toValue: count,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };
    load(loading);
    if (loading >= 100) {
      clearInterval(countInterval.current);
    }
  }, [loading, loaderValue]);
  const aWidth = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{ height: height }}>
      <Block flex center style={{ paddingTop: 30 }}>
        <Spinner visible textStyle={{ color: 'white' }} />
        {showBar && (
          <Block style={{ paddingTop: 350 }}>
            <ProgressBar aWidth={aWidth} />
          </Block>
        )}
      </Block>
    </LinearGradient>
  );
};

export type LoadingType = {
  step: number;
  showBar?: boolean;
};
