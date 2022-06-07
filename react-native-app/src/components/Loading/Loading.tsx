import { Block } from 'galio-framework';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Animated } from 'react-native';
import theme from '../../utils/theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import LinearGradient from 'react-native-linear-gradient';

export const Loading = ({ step, showBar = false }: LoadingType) => {
  const loaderValue = useRef(new Animated.Value(0)).current;
  const countInterval = useRef<any>(null);
  const { height } = Dimensions.get('screen');
  const [loading, setLoading] = useState(0);

  const load = (count: any) => {
    Animated.timing(loaderValue, {
      toValue: count,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (loading === 1) {
      countInterval.current = setInterval(() => {
        if (loading > 0 && loading < 100) {
          setLoading(old => old + step);
        }
      }, 400);
    } else {
      load(loading);
      if (loading >= 100) {
        clearInterval(countInterval.current);
      }
    }
  }, []);

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
