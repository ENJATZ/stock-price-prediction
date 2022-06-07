import yahooFinance from 'yahoo-finance2';
import { SuggestionType } from '../types';
import { CHART_SIZE } from '../utils/definitions';

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

export const fetchSymbols = async (
  symbols: string[],
  callback?: (error: any, data: any) => void,
) => {
  const data = await yahooFinance.quote(symbols);
  if (callback) {
    callback(undefined, data);
  } else {
    return data;
  }
};

export default {
  fetchSymbols,
  fetchYahooData,
  findSuggestions,
};
