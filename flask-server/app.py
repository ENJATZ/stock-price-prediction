from flask import Flask, make_response
from flask_cors import CORS
import yfinance as yf
from pandas_datareader import data as pdr

from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import seaborn as sns
import numpy as np
import sys
import warnings
import tensorflow as tf
from func.forecast import forecast
import json

if not sys.warnoptions:
    warnings.simplefilter('ignore')

sns.set()
tf.compat.v1.set_random_seed(1234)

yf.pdr_override()


app = Flask(__name__)
CORS(app)
simulations = 3

@app.route('/')
def index():
   return "hello there :)"


@app.route('/predict/<tickr>/<period>/<test_size>', methods=['GET'])
def predict(tickr, period, test_size):
    test_size = int(test_size)
    df = pdr.get_data_yahoo(tickr, period=period, interval="1d")
    df.to_csv('data.csv')
    df = pd.read_csv('data.csv')
    minmax = MinMaxScaler().fit(
        df.iloc[:, 4:5].astype('float32'))  # Close index
    df_log = minmax.transform(df.iloc[:, 4:5].astype('float32'))  # Close index
    df_log = pd.DataFrame(df_log)
    # yf_data = df.to_json(orient='records', lines=True)
    yf_data = json.loads(json.dumps(list(df.T.to_dict().values())))

    all_forecasts = []
    date_forecasts = []
    for i in range(simulations):
        dates, fr = forecast(df, df_log, minmax, test_size)
        date_forecasts.append(dates)
        all_forecasts.append(fr)

    accepted_results = []
    for r in all_forecasts:
        if (np.array(r[-test_size:]) < np.min(df['Close'])).sum() == 0 and \
                (np.array(r[-test_size:]) > np.max(df['Close']) * 2).sum() == 0:
            accepted_results.append(r)

    final_forecasts = []
    for i_f, arr in enumerate(all_forecasts, start=0):
        outer_forecast = []
        for i, c in enumerate(arr, start=0):
            this_forecast = {}
            this_forecast['date'] = date_forecasts[i_f][i]
            this_forecast['value'] = all_forecasts[i_f][i]
            outer_forecast.append(this_forecast)
        final_forecasts.append(outer_forecast)

    response = {
        "realPrice": yf_data,
        "forecasts": final_forecasts
    }
    return return_response(response, 200)


def return_response(response, status):
    response = make_response(response, status)
    response.mimetype = 'application/json'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)