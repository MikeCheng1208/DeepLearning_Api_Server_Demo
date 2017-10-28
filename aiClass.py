import numpy as np
from keras.applications.vgg19 import VGG19, preprocess_input, decode_predictions
from keras.preprocessing import image
from keras.utils import plot_model
import json
aiArr = []
aiObj = {}
class aiRun():
    def runs(self):
        model = VGG19(weights='imagenet')
        plot_model(model, show_shapes=True, to_file='model.png')
        img_path = 'apple.jpg'
        img = image.load_img(img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        predict = model.predict(x)
        
        dec = decode_predictions(predict, top=10)[0]
        print(dec)
        for item in dec:
            aiObj = {
                "id" : item[0],
                "name" : item[1],
                "accurate" : str(item[2])
            }
            aiArr.append(aiObj)


        return json.dumps(aiArr)