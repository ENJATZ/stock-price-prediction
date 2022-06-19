import tensorflow as tf

class Model:
    def __init__(self, layers, size, layer_size, size_output):

        def lstm(layer_size):
            return tf.nn.rnn_cell.LSTMCell(layer_size, state_is_tuple=False)

        rnns = [lstm(layer_size) for _ in range(layers)]
        rnn_cells = tf.nn.rnn_cell.MultiRNNCell(rnns,state_is_tuple=False)

        # placeholdere pentru dynamic data assignation
        self.X = tf.placeholder(tf.float32, (None, None, size))
        self.Y = tf.placeholder(tf.float32, (None, size_output))
        drop = tf.contrib.rnn.DropoutWrapper(
            rnn_cells, output_keep_prob=0.1
        )
        self.hidden_layer = tf.placeholder(
            tf.float32, (None, layers * 2 * layer_size)
        )
        # create pentru reteaua neurala recurenta
        # celula de inceput = drop
        # input = self.X
        self.outputs, self.last_state = tf.nn.dynamic_rnn(
            drop, self.X, initial_state=self.hidden_layer, dtype=tf.float32
        )
        # outputs = reteaua neruala
        # last state = un tuple de N valori, fiecare reprezentand starea
        # state = starea retelei in momentul respectiv, in cazul LSTM, memoreaza date
        self.logits = tf.layers.dense(self.outputs[-1], size_output)
        # folosind dense, se adauga inca un layer in reteaua neruala, 
        # avand ca output_size ca si date care se adauga, deci memoram datele
        self.cost = tf.reduce_mean(tf.square(self.Y - self.logits))
        # reduce_mean = construieste valoarea mediana a elementelor din tensor
        self.optimizer = tf.train.AdamOptimizer(0.01).minimize(self.cost)
        # optimizer = algoritmul de optimizare, normalizare
