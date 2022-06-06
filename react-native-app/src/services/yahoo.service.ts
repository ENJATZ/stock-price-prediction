import yahooFinance from 'yahoo-finance2';
import { SuggestionType } from '../types';
import { sliceByPeriod } from '../utils/slices';

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

export const fetchYahooData = async (
  symbol: string,
  callback?: (error: any, data: any) => void,
) => {
  const summary = await yahooFinance.quote(symbol);

  var requestDate = new Date();
  requestDate.setDate(requestDate.getDate() - CHART_SIZE);

  const chart = await yahooFinance.historical(symbol, {
    period1: requestDate,
  });
  if (callback) {
    callback(undefined, { summary, chart });
  } else {
    return { summary, chart };
  }
};

export const fetchApiData = async (
  symbol: string,
  callback: (error: any, data: any) => void,
) => {
  const period = '60d',
    test_size = 5;

  const apiResponse = await fetch(
    `${apiURL}/predict/${symbol}/${period}/${test_size}`,
  );

  if (apiResponse.status !== 200) {
    callback('FETCH_ERROR', undefined);
    return;
  }

  callback(
    undefined,
    sliceByPeriod(await apiResponse.json(), CHART_SIZE, PREDICT_SIZE),
  );
};
export default {
  fetchApiData,
  fetchYahooData,
  findSuggestions,
};
