import { Block } from 'galio-framework';
import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {
  InlineSummary,
  InlineSummaryType,
} from '../../components/InlineSummary/InlineSummary';
import { Text } from '../../components/Text/Text';
import theme from '../../utils/theme';
import { nFormatter } from '../../utils/helpers';
import { GaugeIndicator } from '../../components/GaugeIndicator/GaugeIndicator';

export const ViewChart = ({ navigation, route }: any) => {
  console.log(route);
  const data = route.params?.data;
  const { height, width } = Dimensions.get('screen');
  const { predictData, yfData } = data;
  const OxLabels = predictData.forecasts[0].map((x: any) => {
    const date = new Date(x.date);
    return `${date.getDate()}`;
  });
  const OyData = predictData.forecasts.map((forecast: any) =>
    forecast.map((x: any) => x.value),
  );
  const realPrice = predictData.realPrice.map((x: any) => x.Close);
  const chartData = {
    labels: OxLabels,
    datasets: [
      {
        data: OyData[0],
        color: () => `#e27c7c`,
      },
      {
        data: OyData[1],
        color: () => `#e4bcad`,
      },
      {
        data: OyData[2],
      },
      {
        data: realPrice,
        color: () => `#ffb400`,
        strokeWidth: 3,
      },
    ],
    legend: ['Scen. 1', 'Scen. 2', 'Scen. 3', yfData.symbol],
  };

  const summaries = [
    {
      name: 'Previous close',
      value: yfData.regularMarketPreviousClose,
    },
    {
      name: 'Market cap',
      value: nFormatter(yfData.marketCap, 1),
    },
    {
      name: 'Open',
      value: yfData.regularMarketOpen,
    },
    {
      name: 'Volume',
      value: nFormatter(yfData.regularMarketVolume, 1),
    },
    {
      name: 'Earning per share',
      value: yfData.epsTrailingTwelveMonths,
    },
    {
      name: 'Avg. volume (10d)',
      value: nFormatter(yfData.averageDailyVolume10Day, 1),
    },
    {
      name: 'Earnings date',
      //value: new Date(yfData.earningsTimestampStart),
      value: 1234,
    },
    {
      name: 'Analyst rating',
      value: yfData.averageAnalystRating,
    },
  ];
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{ height: height }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ display: 'flex', paddingTop: 50 }}>
        <Block style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Block>
            <Text color="gray">
              {yfData.longName} ({yfData.fullExchangeName})
            </Text>
          </Block>
          <Block flex space="between" row>
            <Block>
              <Block flex row>
                <Text size="30" style={{ marginRight: 7 }}>
                  {yfData.symbol}
                </Text>
                <Block style={{ marginTop: 4, marginRight: 3 }}>
                  <Text
                    size="10"
                    color={
                      yfData.regularMarketChangePercent < 0
                        ? '#ce4747'
                        : '#1E90FF'
                    }>
                    {parseFloat(yfData.regularMarketChangePercent).toFixed(2)}%
                  </Text>
                  <Text
                    size="12"
                    color={
                      yfData.regularMarketChange < 0 ? '#ce4747' : '#1E90FF'
                    }>
                    ${Math.abs(yfData.regularMarketChange)}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Text style={{ textAlign: 'right' }}>
                ${yfData.regularMarketPrice}
              </Text>
              <Text style={{ textAlign: 'right' }} size="12">
                market {yfData.marketState.toLowerCase()}
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
          <Text size="18">Summary</Text>
          <Block
            flex
            row
            space="between"
            style={{ width: '100%', flexWrap: true }}>
            {summaries.map((item: InlineSummaryType) => (
              <InlineSummary name={item.name} value={item.value} />
            ))}
          </Block>
        </Block>
      </ScrollView>
    </LinearGradient>
  );
};
