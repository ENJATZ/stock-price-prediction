import { Block } from 'galio-framework';
import React, { useState } from 'react';
import { Text } from '../../components/Text/Text';
import apiData from './data.json';
import theme from '../../utils/theme';
import { Dimensions, Image, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as S from './Home.styles';
import { Button } from '../../components/Button/Button';

export const Home = ({ navigation }: any) => {
  const { height } = Dimensions.get('screen');
  const [data, setData] = useState(
    apiData.sort((a, b) => a['% Change'] < b['% Change']).slice(0, 10),
  );
  return (
    <LinearGradient
      colors={[theme.COLORS.DARK1, theme.COLORS.DARK1]}
      style={{ height: height }}>
      <S.Screen>
        <SafeAreaView>
          <ScrollView>
            <S.Title>
              <Image source={require('../../assets/podium.png')} />
              <Text size="25" style={{ marginLeft: 7 }}>
                Top 10 Gainers
              </Text>
            </S.Title>
            <S.List>
              {data.map((item: any) => (
                <S.ListItem>
                  <Block style={{ width: '40%' }}>
                    <Text size="20">{item.Symbol}</Text>
                    <Text size="13" color="gray" numberOfLines={1}>
                      {item.Name}
                    </Text>
                  </Block>
                  <Block flex row style={{ width: '20%' }}>
                    <FontAwesome5
                      name="arrow-up"
                      color="#3BB9FF"
                      size={25}
                      style={{ marginLeft: 15, marginTop: 3 }}
                    />
                    <Block flex style={{ marginLeft: 3 }}>
                      <Text color="#3BB9FF" size="13">
                        +${item.Change}
                      </Text>
                      <Text color="#3BB9FF" size="13">
                        {item['% Change']}%
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ width: '10%' }}>
                    <FontAwesome5 name="star" color="gray" size={25} />
                  </Block>
                </S.ListItem>
              ))}
            </S.List>
          </ScrollView>
        </SafeAreaView>
      </S.Screen>
    </LinearGradient>
  );
};
