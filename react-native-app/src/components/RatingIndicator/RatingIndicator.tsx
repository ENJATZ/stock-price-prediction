import { Block } from 'galio-framework';
import React from 'react';
import { Text } from '../Text/Text';
import * as S from './RatingIndicator.styles';

/**
 * Render a gauge/interval which indicates the current position of the
 * input value within the interval.
 *
 * @param {RatingIndicatorType} {
    yfRating,
   }
 * @returns {JSX.Element}
 */
export const RatingIndicator = ({
  yfRating,
}: RatingIndicatorType): JSX.Element => {
  const Indicators: IndicatorType[] = [
    { name: 'Strong buy', value: 0 },
    { name: 'Buy', value: 30 },
    { name: 'Hold', value: 50 },
    { name: 'Under-perform', value: 72 },
    { name: 'Sell', value: 102 },
  ];
  const value: number = parseFloat(
    yfRating?.match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0] ?? 0.0,
  );
  return (
    <S.RatingIndicator>
      <S.MainLine />
      {Indicators.map((indicator: IndicatorType) => (
        <S.LimitIndicator value={indicator.value}>
          {indicator.name}
        </S.LimitIndicator>
      ))}
      <S.ValueIndicator value={value}>
        <Text size="13" color="black">
          {value}
        </Text>
      </S.ValueIndicator>
      <S.CaretDown value={value} />
    </S.RatingIndicator>
  );
};

/**
 * Properties type for the {@link RatingIndicator} react component.
 *
 * @export
 * @typedef {RatingIndicatorType}
 */
export type RatingIndicatorType = {
  yfRating: string;
};

/**
 * Properties type for the {@link S.LimitIndicator} and {@link S.ValueIndicator}
 * styled components.
 *
 * @export
 * @typedef {IndicatorType}
 */
export type IndicatorType = {
  name: string;
  value: number;
};
