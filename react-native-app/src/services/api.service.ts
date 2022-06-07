import { sliceByPeriod } from '../utils/slices';
import { CHART_SIZE, PREDICT_SIZE, API_URL } from '../utils/definitions';

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

export const fetchApiData = async (
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

export default {
  fetchApiData,
  fetchTop,
};
