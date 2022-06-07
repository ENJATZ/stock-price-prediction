import { Block } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {
  InlineSummary,
  InlineSummaryType,
} from '../../components/InlineSummary/InlineSummary';
import { Text } from '../../components/Text/Text';
import theme from '../../utils/theme';
import { nFormatter } from '../../utils/helpers';
import { RatingIndicator } from '../../components/RatingIndicator/RatingIndicator';
import yahooService from '../../services/yahoo.service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as S from './ViewChart.styles';
import { Loading } from '../../components/Loading/Loading';
import { useFocusEffect } from '@react-navigation/native';
import apiService from '../../services/api.service';
import { useAppContext } from '../../components/AppContextProvider/AppContextProvider';
import { SCREEN } from '../../utils/definitions';

export const ViewChart = ({ navigation, route }: any) => {
  const symbol = route.params?.symbol;
  const { height } = Dimensions.get('screen');
  const [isLoading, setIsLoading] = useState(true);
  const [yfData, setYfData] = useState<any>([]);
  const [chartData, setChartData] = useState({});
  const [loadingStep, setLoadingStep] = useState(20);
  const { state: appState, dispatch } = useAppContext();

  const setupTable = (
    data: any,
    predictData: any = undefined,
    hasPrediction: boolean = false,
  ) => {
    let predictionDataset: any = [];
    let legend = [data?.summary?.symbol];

    const OxLabels = data?.chart?.map((x: any) => {
      const date = new Date(x.date);
      return `${date.getDate()}`;
    });

    if (hasPrediction) {
      const OyData = predictData.forecasts.map((forecast: any) =>
        forecast.map((x: any) => x.value),
      );

      predictionDataset = [
        {
          data: OyData[0],
          color: () => '#e27c7c',
        },
        {
          data: OyData[1],
          color: () => '#e4bcad',
        },
        {
          data: OyData[2],
        },
      ];
      legend = ['Scen. 1', 'Scen. 2', 'Scen. 3', data?.summary?.symbol];
    }
    const realPrice = data?.chart?.map((x: any) => x.close);

    const _chartData = {
      labels: OxLabels,
      datasets: [
        ...predictionDataset,
        {
          data: realPrice,
          color: () => '#ffb400',
          strokeWidth: 3,
        },
      ],
      legend,
    };
    setChartData(_chartData);
  };

  const summaries = [
    {
      name: 'Previous close',
      value: yfData?.summary?.regularMarketPreviousClose,
    },
    {
      name: 'Market cap',
      value: nFormatter(yfData?.summary?.marketCap, 1),
    },
    {
      name: 'Open',
      value: yfData?.summary?.regularMarketOpen,
    },
    {
      name: 'Volume',
      value: nFormatter(yfData?.summary?.regularMarketVolume, 1),
    },
    {
      name: 'Earning per share',
      value: yfData?.summary?.epsTrailingTwelveMonths,
    },
    {
      name: 'Avg. volume (10d)',
      value: nFormatter(yfData?.summary?.averageDailyVolume10Day, 1),
    },
    {
      name: 'Earnings date',
      //value: new Date(yfData.earningsTimestampStart),
      value: 1234,
    },
    {
      name: 'Analyst rating',
      value: yfData?.summary?.averageAnalystRating,
    },
  ];
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log(
  //       '🚀 ~ file: ViewChart.tsx ~ line 121 ~ React.useCallback ~ !route.params?.symbol',
  //       route.params?.symbol,
  //     );
  //     if (!route.params?.symbol || typeof route.params?.symbol !== 'string') {
  //       navigation.navigate(SCREEN.SEARCH);
  //     } else {
  //       setIsLoading(true);
  //       setLoadingStep(20);
  //       setYfData([]);

  //       yahooService.fetchYahooData(symbol, (_, data) => {
  //         setYfData(data);
  //         setupTable(data);
  //         setIsLoading(false);
  //       });
  //     }
  //   }, [symbol, navigation, route]),
  // );

  useEffect(() => {
    if (!route.params?.symbol || typeof route.params?.symbol !== 'string') {
      if (navigation.routeName !== SCREEN.SEARCH) {
        navigation.navigate(SCREEN.SEARCH);
      }
    } else {
      setIsLoading(true);
      setLoadingStep(20);
      setYfData([]);

      yahooService.fetchYahooData(route.params?.symbol, (_, data) => {
        setYfData(data);
        setupTable(data);
        setIsLoading(false);
      });
    }
  }, [route.params?.symbol, navigation]);

  useFocusEffect(() => {
    console.log(
      '🚀 ~ file: ViewChart.tsx ~ line 160 ~ useFocusEffect ~ route.params?.symbol',
      route.params?.symbol,
    );
    if (!route.params?.symbol || typeof route.params?.symbol !== 'string') {
      setIsLoading(false);
      navigation.navigate(SCREEN.SEARCH);
    }
  });

  const toggleFavorite = () => {
    dispatch({ type: 0, symbol });
  };

  const isFavorite = () => appState.favoriteList.indexOf(symbol) !== -1;

  if (isLoading || !chartData) {
    return (
      <LinearGradient
        colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
        style={{ height: height }}>
        <Loading step={loadingStep} showBar={true} />
      </LinearGradient>
    );
  }
  const getPrediction = () => {
    setLoadingStep(5);
    setIsLoading(true);
    apiService.fetchApiData(symbol, (_, data) => {
      setIsLoading(false);
      setupTable(yfData, data, true);
    });
  };
  if (!yfData?.summary) {
    return (
      <Block>
        <Text>404</Text>
      </Block>
    );
  }
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{ height: height }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ display: 'flex', paddingTop: 5 }}>
        <Block style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Block>
            <Text color="gray">
              {yfData?.summary?.longName} ({yfData?.summary?.fullExchangeName})
            </Text>
          </Block>
          <Block flex space="between" row>
            <Block>
              <Block flex row>
                <TouchableWithoutFeedback onPress={() => toggleFavorite()}>
                  <FontAwesome5
                    name="star"
                    color={isFavorite() ? 'yellow' : 'gray'}
                    size={25}
                    solid={isFavorite()}
                    style={{ marginRight: 3, marginTop: 5 }}
                  />
                </TouchableWithoutFeedback>
                <Text size="30" style={{ marginRight: 7 }}>
                  {yfData?.summary?.symbol}
                </Text>
                <Block style={{ marginTop: 4, marginRight: 3 }}>
                  <Text
                    size="10"
                    color={
                      yfData?.summary?.regularMarketChangePercent < 0
                        ? '#ce4747'
                        : '#1E90FF'
                    }>
                    {parseFloat(
                      yfData?.summary?.regularMarketChangePercent,
                    ).toFixed(2)}
                    %
                  </Text>
                  <Text
                    size="12"
                    color={
                      yfData?.summary?.regularMarketChange < 0
                        ? '#ce4747'
                        : '#1E90FF'
                    }>
                    $
                    {Math.abs(
                      parseFloat(yfData?.summary?.regularMarketChange).toFixed(
                        2,
                      ),
                    )}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Text style={{ textAlign: 'right' }}>
                ${yfData?.summary?.regularMarketPrice}
              </Text>
              <Text style={{ textAlign: 'right' }} size="12">
                market {yfData?.summary?.marketState.toLowerCase()}
              </Text>
            </Block>
          </Block>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 20} // from react-native
            height={250}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: '#262626',
              backgroundGradientFromOpacity: 0.2,
              backgroundGradientTo: '#262626',
              backgroundGradientToOpacity: 1,
              color: () => `#badbdb`,
              strokeWidth: 1,
              barPercentage: 1,
            }}
            bezier
            withInnerLines={false}
            style={{
              marginVertical: 8,
              borderRadius: 5,
            }}
          />
          <Block flex center fluid width="100%">
            <TouchableWithoutFeedback onPress={() => getPrediction()}>
              <S.AnalyzeButton>
                <Text>Analyze</Text>
              </S.AnalyzeButton>
            </TouchableWithoutFeedback>
          </Block>
          <Block>
            <S.InfoBlock>
              <Text size="18" style={{ marginBottom: 10 }}>
                Summary
              </Text>
              <Block
                flex
                row
                space="between"
                style={{ width: '100%', flexWrap: true }}>
                {summaries.map((item: InlineSummaryType) => (
                  <InlineSummary name={item.name} value={item.value} />
                ))}
              </Block>
            </S.InfoBlock>
            <S.InfoBlock>
              <Text size="18" style={{ marginBottom: 10 }}>
                Analysts rating
              </Text>
              <Block middle>
                <RatingIndicator
                  yfRating={yfData?.summary?.averageAnalystRating}
                />
              </Block>
            </S.InfoBlock>
          </Block>
        </Block>
      </ScrollView>
    </LinearGradient>
  );
};
