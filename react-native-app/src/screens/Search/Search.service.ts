import yahooFinance from 'yahoo-finance2';
import { SuggestionType } from '../../types';
import { sliceByPeriod } from '../../utils/slices';

const apiURL =
  'http://docker-flask.eba-svwvnx8z.eu-west-3.elasticbeanstalk.com';
const CHART_SIZE = 10;
const PREDICT_SIZE = 5;

export const findSuggestions = async (
  input: string,
): Promise<SuggestionType[]> => {
  const result = await yahooFinance.search(input);
  return result.quotes.map(item => ({
    exchange: item.exchDisp,
    name: item.longname,
    symbol: item.symbol,
  }));
};

export const fetchData = async (
  symbol: string,
  callback: (error: any, data: any) => void,
) => {
  const period = '60d',
    test_size = 5;

  const yfResponse = await yahooFinance.quote(symbol);
  const apiResponse = await fetch(
    `${apiURL}/predict/${symbol}/${period}/${test_size}`,
  );
  if (!yfResponse || apiResponse.status !== 200) {
    callback('FETCH_ERROR', undefined);
    return;
  }
  const result = {
    predictData: sliceByPeriod(
      await apiResponse.json(),
      CHART_SIZE,
      PREDICT_SIZE,
    ),
    yfData: yfResponse,
  };
  callback(undefined, result);
};
