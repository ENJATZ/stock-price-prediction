import yahooFinance from 'yahoo-finance2';
import {SuggestionType} from '../../types';

const apiURL = 'http://127.0.0.1:5000';

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
  const period = '5d',
    test_size = 10;

  const yfResponse = await yahooFinance.quote(symbol);
  const apiResponse = await fetch(
    `${apiURL}/predict/${symbol}/${period}/${test_size}`,
  );
  if (!yfResponse || apiResponse.status !== 200) {
    console.log(apiResponse.status);
    callback('FETCH_ERROR', undefined);
    return;
  }
  const result = {
    predictData: await apiResponse.json(),
    yfData: yfResponse,
  };
  callback(undefined, result);
};
