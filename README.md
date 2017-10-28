## Deep learning Api Server Demo

### 使用 Python 的 Framework 「 Flask 」去啟動server串 Deep learning的資料，回傳JSON可以給前端去做串接
---

第一步
安裝 Python3： https://www.python.org/downloads/


第二步 
安裝 Tensorflow
```
pip install tensorflow
```

第三步 
安裝 Theano
```
pip install theano
```

第四步 
安裝 Keras
```
pip install keras
```

執行 
```
python app.py
```

接下來 就可以call這支api，就會回傳Deep learning的資料，去組成JSON回傳
```
http://127.0.0.1:3001/ai_api 
```
