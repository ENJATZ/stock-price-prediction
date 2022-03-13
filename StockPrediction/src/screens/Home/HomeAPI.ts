import yahooFinance from 'yahoo-finance2';

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

export type SuggestionType = {
  exchange: string;
  name: string;
  symbol: string;
};
