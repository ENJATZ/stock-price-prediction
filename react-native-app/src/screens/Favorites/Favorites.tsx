import { useFocusEffect } from '@react-navigation/native';
import { Block } from 'galio-framework';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppContext } from '../../components/AppContextProvider/AppContextProvider';
import { ListItem } from '../../components/ListItem/ListItem';
import { Loading } from '../../components/Loading/Loading';
import { Text } from '../../components/Text/Text';
import yahooService from '../../services/yahoo.service';
import { SCREEN } from '../../utils/definitions';
import theme from '../../utils/theme';
import * as S from './Favorites.styles';

export const Favorites = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { height } = Dimensions.get('screen');
  const { state: appState, dispatch } = useAppContext();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      if (appState.favoriteList.length > 0) {
        yahooService.fetchSymbols(
          appState.favoriteList,
          (_: any, _data: any) => {
            const mappedData = _data.map((item: any) => {
              return {
                Symbol: item.symbol,
                Change: parseFloat(item.regularMarketChange).toFixed(2),
                Name: item.shortName,
                '% Change': parseFloat(item.regularMarketChangePercent).toFixed(
                  2,
                ),
                'Price (Intraday)': parseFloat(item.regularMarketPrice).toFixed(
                  2,
                ),
              };
            });
            setData(mappedData);
            setIsLoading(false);
          },
        );
      } else {
        setData([]);
        setIsLoading(false);
      }
    }, [appState.favoriteList]),
  );

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
        colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
        style={{ height: height }}>
        <Loading step={25} showBar={false} />
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{ height: height - 150 }}>
      <SafeAreaView>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          <S.Screen>
            <S.Title>
              <Image source={require('../../assets/bookmark.png')} />
              <Text size="25" style={{ marginLeft: 7 }}>
                {t('favoriteScreen.title')}
              </Text>
            </S.Title>
            <S.List>
              {data.length > 0 ? (
                data.map((item: any) => (
                  <ListItem
                    key={item.Symbol}
                    item={item}
                    trend={parseFloat(item['% Change']) < 0 ? 'lose' : 'gain'}
                    isFavorite={isFavorite(item.Symbol)}
                    toggleFavorite={toggleFavorite}
                    navigateToChart={navigateToChart}
                  />
                ))
              ) : (
                <Block center style={{ height: '100%' }}>
                  <Text>{t('favoriteScreen.noData')}</Text>
                </Block>
              )}
            </S.List>
          </S.Screen>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
