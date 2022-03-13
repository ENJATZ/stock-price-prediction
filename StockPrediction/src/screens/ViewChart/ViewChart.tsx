import {Block} from 'galio-framework';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../../components/Text/Text';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import theme from '../../utils/theme';
import data from './data.json';

export const ViewChart = ({navigation, route}: any) => {
  console.log(route);
  const data = route.params?.data;
  const {height, width} = Dimensions.get('screen');
  const {predictData, yfData} = data;
  const OxLabels = predictData.forecasts[0].map(x => {
    const date = new Date(x.date);
    return `${date.getDate()}`;
  });
  const OyData = predictData.forecasts.map(forecast =>
    forecast.map(x => x.value),
  );
  const realPrice = predictData.realPrice.map(x => x.Close);
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
    legend: ['Scen. 1', 'Scen. 2', 'Scen. 3', 'AAPL'],
  };

  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{height: height}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{display: 'flex', paddingTop: 50}}>
        <Block style={{paddingLeft: 10, paddingRight: 10}}>
          <Block>
            <Text color="gray">
              {yfData.longName} ({yfData.fullExchangeName})
            </Text>
          </Block>
          <Block flex space="between" row>
            <Block>
              <Block flex row>
                <Text size="30" style={{marginRight: 7}}>
                  {yfData.symbol}
                </Text>
                <Block style={{marginTop: 4, marginRight: 3}}>
                  <Text size="10" color="#1E90FF">
                    +10.1%
                  </Text>
                  <Text size="12" color="#1E90FF">
                    $8.42
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block>
              <Text style={{textAlign: 'right'}}>
                ${yfData.regularMarketPrice}
              </Text>
              <Text style={{textAlign: 'right'}} size="12">
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
              color: (opacity = 1) => `#badbdb`,
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
        </Block>
      </ScrollView>
    </LinearGradient>
  );
};
