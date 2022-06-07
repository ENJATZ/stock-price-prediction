import { Block } from 'galio-framework';
import React, { useState, useEffect } from 'react';
import { Text } from '../../components/Text/Text';
import theme from '../../utils/theme';
import { Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as S from './Home.styles';
import { SCREEN } from '../../utils/definitions';
import apiService from '../../services/api.service';
import { Loading } from '../../components/Loading/Loading';
import { useAppContext } from '../../components/AppContextProvider/AppContextProvider';
import { ListItem } from '../../components/ListItem/ListItem';
import { useTranslation } from 'react-i18next';

export const Home = ({ navigation }: any) => {
  const { height } = Dimensions.get('screen');
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state: appState, dispatch } = useAppContext();

  const sortArray = (array: any[]) =>
    array.sort((a, b) => a['% Change'] - b['% Change']).slice(0, 10);

  useEffect(() => {
    setIsLoading(true);

    apiService.fetchTop((_, _data) => {
      _data.gainers = sortArray(_data.gainers);
      _data.losers = sortArray(_data.losers);
      setData(_data);
      setIsLoading(false);
    });
  }, []);

  const navigateToChart = (symbol: string) => {
    navigation.reset({
      routes: [{ name: SCREEN.VIEWCHART }],
    });
    navigation.navigate(SCREEN.VIEWCHART, { symbol });
  };

  const toggleFavorite = (symbol: string) => {
    dispatch({ type: 0, symbol });
  };

  const isFavorite = (symbol: string) => {
    return appState.favoriteList.indexOf(symbol) !== -1;
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={[theme.COLORS.DARK3, theme.COLORS.DARK3]}
        style={{ height: height }}>
        <Loading step={25} showBar={false} />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK3, theme.COLORS.DARK3]}
      style={{ height: height - 150 }}>
      <S.Screen>
        <SafeAreaView>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <Block>
              <S.Title>
                <Image source={require('../../assets/podium.png')} />
                <Text size="25" style={{ marginLeft: 7 }}>
                  {t('homeScreen.topGainers')}
                </Text>
              </S.Title>
              <S.List>
                {data.gainers.map((item: any) => (
                  <ListItem
                    item={item}
                    trend="gain"
                    isFavorite={isFavorite(item.Symbol)}
                    toggleFavorite={toggleFavorite}
                    navigateToChart={navigateToChart}
                  />
                ))}
              </S.List>
            </Block>
            <Block style={{ marginTop: 10 }}>
              <S.Title>
                <Image source={require('../../assets/downtrend.png')} />
                <Text size="25" style={{ marginLeft: 7 }}>
                  {t('homeScreen.topLosers')}
                </Text>
              </S.Title>
              <S.List>
                {data.losers.map((item: any) => (
                  <ListItem
                    item={item}
                    trend="lose"
                    isFavorite={isFavorite(item.Symbol)}
                    toggleFavorite={toggleFavorite}
                    navigateToChart={navigateToChart}
                  />
                ))}
              </S.List>
            </Block>
          </ScrollView>
        </SafeAreaView>
      </S.Screen>
    </LinearGradient>
  );
};
