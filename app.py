from flask import Flask, render_template, send_from_directory, request
from livereload import Server
from aiClass import aiRun
import uuid

import base64

ai_run = aiRun()
app = Flask(__name__)

# 亂數取前10位
def randomHash():
    strs = uuid.uuid4().hex[0:10]
    return strs

# 快取 hash
def reloadhash():
    strs = uuid.uuid4().hex
    staticfile = { 
        'jsurl': '/static/js/app.js?' +  strs, 
        'cssurl': '/static/css/main.css?' +  strs 
    }
    return staticfile
    
@app.route('/')
def index():
    return render_template('index.html', staticfile=reloadhash())


@app.route('/ai_api', methods=['post'])
def ai_api():
    imgUrl = None
    if request.method == 'POST':
        imgUrl = request.form.get('img')
        imgdata = base64.b64decode(imgUrl[imgUrl.find(",")+1:])
        img_name = 'VG19img/'+randomHash()+'.jpg'
        with open(img_name, 'wb') as f:
            f.write(imgdata)
            f.close()

        return ai_run.runs(img_name)


if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.watch('**/**/*.*', reloadhash)
    server.serve(port=3001, host='localhost',open_url=True, debug=False)