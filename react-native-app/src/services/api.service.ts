import { sliceByPeriod } from '../utils/slices';
import { CHART_SIZE, PREDICT_SIZE, API_URL } from '../utils/definitions';
import yahooFinance from 'yahoo-finance2';

export const fetchTop = async (callback: (error: any, data: any) => void) => {
  const gainers = await fetch(`${API_URL}/top_gain`);
  const losers = await fetch(`${API_URL}/top_lose`);

  if (gainers.status !== 200 || losers.status !== 200) {
    callback('FETCH_ERROR', undefined);
    return;
  }

  callback(undefined, {
    gainers: await gainers.json(),
    losers: await losers.json(),
  });
};

export const fetchApiPrediction = async (
  symbol: string,
  callback: (error: any, data: any) => void,
) => {
  const period = '100d',
    test_size = 5;

  const apiResponse = await fetch(
    `${API_URL}/predict/${symbol}/${period}/${test_size}`,
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
export const fetchApiTickerData = async (
  symbol: string,
  callback: (error: any, data: any) => void,
) => {
  const period = '100d';

  const yahooResponse = await yahooFinance.quote(symbol);

  const apiResponse = await fetch(`${API_URL}/tickr_info/${symbol}/${period}`);
  if (apiResponse.status !== 200) {
    callback('FETCH_ERROR', undefined);
    return;
  }
  const data = await apiResponse.json();
  const arr = Object.keys(data).map(dateAsKey => {
    return { date: dateAsKey, ...data[dateAsKey] };
  });
  console.log('🚀 ~ file: api.service.ts ~ line 63 ~ arr ~ arr', arr);
  callback(undefined, {
    summary: yahooResponse,
    chart: arr.slice(arr.length - CHART_SIZE, arr.length),
  });
};

export default {
  fetchApiPrediction,
  fetchApiTickerData,
  fetchTop,
};
