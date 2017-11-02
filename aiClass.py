import numpy as np
import json
from keras.applications.vgg19 import VGG19, preprocess_input, decode_predictions
from keras.preprocessing import image
from googletrans import Translator
translator = Translator()


def googletranslate(text):
    txt = str(text).replace("_", " ")
    translations = translator.translate(txt, dest='zh-tw')
    return translations.text



class aiRun():
    def runs(self, path):
        model = VGG19(weights='imagenet')
        img_path = path
        img = image.load_img(img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        predict = model.predict(x)
        
        dec = decode_predictions(predict, top=3)[0]
        aiArr = []
        aiObj = {}
        # print(dec)
        for item in dec:
            aiObj = {
                "id" : item[0],
                "name" : googletranslate(item[1]),
                "accurate" : str(item[2])
            }
            aiArr.append(aiObj)

        return json.dumps(aiArr)

