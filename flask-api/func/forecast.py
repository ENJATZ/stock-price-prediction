from func.Model import Model
from tqdm import tqdm
from func.utils import calculate_accuracy, anchor
from datetime import timedelta, datetime
import numpy as np
import tensorflow as tf
import pandas as pd

layers = 1
layer_size = 128
timestamp = 10
progress_length = 300

def forecast(df, df_log, minmax, test_size):
    tf.reset_default_graph()
    df_train = df_log
    arr_date = pd.to_datetime(df.iloc[:, 0]).tolist()

    rnn_model = Model(layers, df_log.shape[1], layer_size, df_log.shape[1], 0.8)

    tf_session = tf.InteractiveSession()
    tf_session.run(tf.global_variables_initializer())

    ui_progress_bar = tqdm(range(progress_length), desc='Progress antrenare') # bara de progress
    for i in ui_progress_bar:
        first_value = np.zeros((1, layers * 2 * layer_size))
        total_loss, total_acc = [], []
        for k in range(0, df_train.shape[0] - 1, timestamp):
            index = min(k + timestamp, df_train.shape[0] - 1)
            batch_x = np.expand_dims(
                df_train.iloc[k: index, :].values, axis=0
            )
            batch_y = df_train.iloc[k + 1: index + 1, :].values
            logits, last_state, _, loss = tf_session.run(
                [rnn_model.logits, rnn_model.last_state,
                    rnn_model.optimizer, rnn_model.cost],
                feed_dict={
                    rnn_model.X: batch_x, # pentru antrenament
                    rnn_model.Y: batch_y, # pentru testare
                    rnn_model.hidden_layer: first_value, # valoare pe care o memoreaza LSTM
                },
            )
            # loss = valoarea cu care a fost modificata reteaua, eroarea pentru fiecare iteratie
            # logits = probabilitate pt valoare
            first_value = last_state
            total_loss.append(loss) 
            total_acc.append(calculate_accuracy(batch_y[:, 0], logits[:, 0]))
        ui_progress_bar.set_postfix(cost=np.mean(total_loss), acc=np.mean(total_acc))

    future_day = test_size

    output_predict = np.zeros(
        (df_train.shape[0] + future_day, df_train.shape[1]))
    output_predict[0] = df_train.iloc[0]
    data_limita = (df_train.shape[0] // timestamp) * timestamp
    first_value = np.zeros((1, layers * 2 * layer_size))

    for k in range(0, (df_train.shape[0] // timestamp) * timestamp, timestamp):
        out_logits, last_state = tf_session.run(
            [rnn_model.logits, rnn_model.last_state],
            feed_dict={
                rnn_model.X: np.expand_dims(
                    df_train.iloc[k: k + timestamp], axis=0
                ),
                rnn_model.hidden_layer: first_value,
            },
        )
        first_value = last_state
        output_predict[k + 1: k + timestamp + 1] = out_logits
    
    if data_limita != df_train.shape[0]:
        out_logits, last_state = tf_session.run(
            [rnn_model.logits, rnn_model.last_state],
            feed_dict={
                rnn_model.X: np.expand_dims(df_train.iloc[data_limita:], axis=0),
                rnn_model.hidden_layer: first_value,
            },
        )
        output_predict[data_limita + 1: df_train.shape[0] + 1] = out_logits
        future_day -= 1
        arr_date.append(arr_date[-1] + timedelta(days=1))
    first_value = last_state

    for i in range(future_day):
        o = output_predict[-future_day - timestamp + i:-future_day + i]
        out_logits, last_state = tf_session.run(
            [rnn_model.logits, rnn_model.last_state],
            feed_dict={
                rnn_model.X: np.expand_dims(o, axis=0),
                rnn_model.hidden_layer: first_value,
            },
        )
        first_value = last_state
        output_predict[-future_day + i] = out_logits[-1]
        arr_date.append(arr_date[-1] + timedelta(days=1))
    
    output_predict = minmax.inverse_transform(output_predict)
    deep_future = anchor(output_predict[:, 0], 0.4)
    return arr_date, deep_future
