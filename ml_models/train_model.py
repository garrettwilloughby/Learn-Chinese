import tensorflow as tf


def create_model(input_shape, num_classes):
    model = tf.keras.models.Sequential([
        tf.keras.layers.InputLayer(input_shape=input_shape),
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.LSTM(128, return_sequences=True),
        tf.keras.layers.LSTM(64),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model


# Load your training data (e.g., preprocessed audio features like MFCC)
X_train = ...
y_train = ...  # Load your corresponding labels (e.g., HSK1 word indices)

# Specify input shape (e.g., based on the shape of your training data)
input_shape = (X_train.shape[1], X_train.shape[2], 1)  # Adjust based on data
num_classes = len(set(y_train))  # Number of unique labels

# Create the model
model = create_model(input_shape, num_classes)

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)


# We want to eventually save the training model, then convert it to a tensorflow.js model to use on the front end.
model.save('ml_models/hsk1_model.h5')
