import React from 'react';
import * as S from './InlineSummary.styles';

/**
 * Render a pair of name and value, used to display different metrics.
 *
 * @param {InlineSummaryType} {
    name,
    value,
   }
 * @returns {JSX.Element}
 */
export const InlineSummary = ({
  name,
  value,
}: InlineSummaryType): JSX.Element => {
  return (
    <S.InlineSummary>
      <S.Title>{name}</S.Title>
      <S.Value>{value}</S.Value>
    </S.InlineSummary>
  );
};

/**
 * Properties type for the {@link InlineSummary} react component.
 *
 * @export
 * @typedef {InlineSummaryType}
 */
export type InlineSummaryType = {
  name: string;
  value: string;
};
