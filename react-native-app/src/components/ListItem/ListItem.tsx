import { Block } from 'galio-framework';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Text } from '../Text/Text';
import * as S from './ListItem.styles';

export const ListItem = ({
  item,
  trend,
  isFavorite,
  toggleFavorite,
  navigateToChart,
}: ListItemType) => {
  const color: string = trend === 'gain' ? '#3BB9FF' : '#fe6f87';

  return (
    <S.ListItem>
      <Block style={{ width: '37%' }}>
        <TouchableWithoutFeedback onPress={() => navigateToChart(item.Symbol)}>
          <Block>
            <Text size="20">{item.Symbol}</Text>
            <Text size="13" color="gray" numberOfLines={1}>
              {item.Name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
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
        <TouchableWithoutFeedback onPress={() => toggleFavorite(item.Symbol)}>
          <FontAwesome5
            name="star"
            color={isFavorite ? 'yellow' : 'gray'}
            size={25}
            solid={isFavorite}
          />
        </TouchableWithoutFeedback>
      </Block>
    </S.ListItem>
  );
};
type ListItemType = {
  item: any;
  trend: 'gain' | 'lose';
  isFavorite: boolean;
  toggleFavorite: (arg0: string) => void;
  navigateToChart: (arg0: string) => void;
};
