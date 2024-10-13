from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import librosa
import numpy as np

# Load pretrained Wav2Vec2 model and processor (specifically trained on Chinese data)
processor = Wav2Vec2Processor.from_pretrained(
    "facebook/wav2vec2-large-xlsr-53-chinese")
model = Wav2Vec2ForCTC.from_pretrained(
    "facebook/wav2vec2-large-xlsr-53-chinese")

# Function to convert audio file into text


def transcribe_audio_to_text(audio_file):
    # Load audio file using librosa
    audio, sample_rate = librosa.load(audio_file, sr=16000)

    # Preprocess audio data (convert to correct format)
    input_values = processor(audio, return_tensors="pt",
                             sampling_rate=sample_rate).input_values

    # Perform inference using the model
    with torch.no_grad():
        logits = model(input_values).logits

    # Decode the logits to get the predicted text
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.decode(predicted_ids[0])

    return transcription


# Example usage
audio_path = "path_to_your_chinese_audio_file.wav"
transcribed_text = transcribe_audio_to_text(audio_path)
print("Transcribed Text:", transcribed_text)
