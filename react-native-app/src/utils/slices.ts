export const sliceByPeriod = (
  result: any,
  size: number,
  predictSize: number,
) => {
  const fLength = result?.forecasts[0]?.length ?? 0;
  const rLength = result?.realPrice?.length ?? 0;

  return {
    forecasts: result.forecasts.map((forecast: any) =>
      forecast.slice(fLength - (predictSize + size), fLength),
    ),
    realPrice: result?.realPrice.slice(rLength - size, rLength),
  };
};
