import { Block } from 'galio-framework';
import React, { useState } from 'react';
import { Text } from '../../components/Text/Text';
import apiData from './data.json';
import theme from '../../utils/theme';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as S from './Home.styles';
import { SCREEN } from '../../utils/definitions';
import { useFocusEffect } from '@react-navigation/native';
import apiService from '../../services/api.service';
import { Loading } from '../../components/Loading/Loading';

const ListItem = ({ item, trend }) => {
  const color: string = trend === 'gain' ? '#3BB9FF' : '#fe6f87';

  return (
    <S.ListItem>
      <Block style={{ width: '37%' }}>
        <Text size="20">{item.Symbol}</Text>
        <Text size="13" color="gray" numberOfLines={1}>
          {item.Name}
        </Text>
      </Block>
      <Block flex center style={{ width: '12%' }}>
        <Text size="18">
          ${parseFloat(item['Price (Intraday)']).toFixed(2)}
        </Text>
      </Block>
      <Block flex row style={{ width: '23%' }}>
        <FontAwesome5
          name={trend === 'gain' ? 'arrow-up' : 'arrow-down'}
          color={color}
          size={25}
          style={{ marginLeft: 15, marginTop: 3 }}
        />
        <Block flex style={{ marginLeft: 3 }}>
          <Text color={color} size="13">
            {parseFloat(item.Change).toFixed(2)}$
          </Text>
          <Text color={color} size="13">
            {item['% Change']}%
          </Text>
        </Block>
      </Block>
      <Block right style={{ width: '10%' }}>
        <FontAwesome5 name="star" color="gray" size={25} />
      </Block>
    </S.ListItem>
  );
};
export const Home = ({ navigation }: any) => {
  const { height } = Dimensions.get('screen');
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortArray = (array: any[]) =>
    array.sort((a, b) => a['% Change'] - b['% Change']).slice(0, 10);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);

      apiService.fetchTop((_, _data) => {
        _data.gainers = sortArray(_data.gainers);
        _data.losers = sortArray(_data.losers);
        setData(_data);
        setIsLoading(false);
      });
    }, []),
  );

  const navigateToChart = (symbol: string) => {
    navigation.reset({
      routes: [{ name: SCREEN.VIEWCHART }],
    });
    navigation.navigate(SCREEN.VIEWCHART, { symbol });
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
      <S.Screen>
        <SafeAreaView>
          <ScrollView
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <Block>
              <S.Title>
                <Image source={require('../../assets/podium.png')} />
                <Text size="25" style={{ marginLeft: 7 }}>
                  Top 10 Gainers
                </Text>
              </S.Title>
              <S.List>
                {data.gainers.map((item: any) => (
                  <TouchableHighlight
                    onPress={() => navigateToChart(item.Symbol)}>
                    <ListItem item={item} trend="gain" />
                  </TouchableHighlight>
                ))}
              </S.List>
            </Block>
            <Block style={{ marginTop: 10 }}>
              <S.Title>
                <Image source={require('../../assets/downtrend.png')} />
                <Text size="25" style={{ marginLeft: 7 }}>
                  Top 10 Losers
                </Text>
              </S.Title>
              <S.List>
                {data.losers.map((item: any) => (
                  <TouchableHighlight
                    onPress={() => navigateToChart(item.Symbol)}>
                    <ListItem item={item} trend="lose" />
                  </TouchableHighlight>
                ))}
              </S.List>
            </Block>
          </ScrollView>
        </SafeAreaView>
      </S.Screen>
    </LinearGradient>
  );
};
