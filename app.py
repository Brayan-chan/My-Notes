import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

audio_file_path = "audio.mp3"

# Leer el archivo de audio como binario
with open(audio_file_path, "rb") as audio_file:
    audio_data = audio_file.read()

# Realizar la transcripción de audio con la nueva API
response = openai.Completion.create(
    engine="whisper-1",
    prompt="Transcribe the following audio:\n" + audio_data.decode("utf-8"),
    temperature=0,
    max_tokens=1024,
    n=1,
    stop=None,
)

transcription = response['choices'][0]['text']
print("Resultado:", transcription)
