from flask import Flask, render_template, request, jsonify
from spellchecker import SpellChecker

app = Flask(__name__)

spell = SpellChecker(language='es')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/correccion_ortografica', methods=['POST'])
def correccion_ortografica():
    texto_usuario = request.form['texto_usuario']
    palabras = texto_usuario.split()

    # Encuentra palabras mal escritas
    palabras_erroneas = spell.unknown(palabras)

    # Sugerencias de corrección
    sugerencias = {palabra: spell.candidates(palabra) for palabra in palabras_erroneas}

    return jsonify(sugerencias)

if __name__ == '__main__':
    app.run(debug=True)
