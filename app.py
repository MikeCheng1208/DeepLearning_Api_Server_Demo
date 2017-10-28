from flask import Flask, render_template
from aiClass import aiRun
app = Flask(__name__)
ai_run = aiRun()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ai_api')
def ai_api():
    return ai_run.runs()

if __name__ == "__main__":
    app.run(port=3001)