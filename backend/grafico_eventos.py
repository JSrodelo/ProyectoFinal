from flask import Flask, send_file, jsonify
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA = pd.DataFrame({
    "Evento": ["Feria de Ciencias", "Festival de Talentos", "Semana Deportiva"],
    "Votos": [120, 95, 150],
    "Asistencia": [200, 180, 220],
    "Satisfaccion": [4.5, 4.2, 4.8]  
})

def generar_grafico(column, title, ylabel, filename, palette):
    sns.set(style="whitegrid")
    plt.figure(figsize=(8, 5))
    ax = sns.barplot(x="Evento", y=column, data=DATA, palette=palette)
    ax.set_title(title)
    ax.set_ylabel(ylabel)
    plt.xticks(rotation=15)
    plt.tight_layout()
    path = os.path.join(os.getcwd(), filename)
    plt.savefig(path)
    plt.close()
    return path

@app.route("/grafico-eventos")
def grafico_votaciones():
    path = generar_grafico("Votos", "Votaciones por Evento", "Cantidad de Votos", "grafico_eventos.png", "Blues_d")
    return send_file(path, mimetype='image/png')

@app.route("/grafico-asistencia")
def grafico_asistencia():
    path = generar_grafico("Asistencia", "Asistencia por Evento", "Número de Asistentes", "grafico_asistencia.png", "Greens_d")
    return send_file(path, mimetype='image/png')

@app.route("/grafico-satisfaccion")
def grafico_satisfaccion():
    path = generar_grafico("Satisfaccion", "Satisfacción Estudiantil por Evento", "Puntaje de Satisfacción", "grafico_satisfaccion.png", "Purples_d")
    return send_file(path, mimetype='image/png')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
