import cv2
import numpy as np

def cc(img, c):
    img[:,:,0] = c
    img[:,:,1] = c
    img[:,:,2] = c

img = cv2.imread('decisiontree2.png', cv2.IMREAD_UNCHANGED)
# img[img[:,:,3] == 255] = [img[:,:,0], img[:,:,0], img[:,:,0], img[:,:,0]]
mask = img[:,:,3]
img[img[:,:,0] < 120] = 255
img[img[:,:,1] < 120] = 255
img[img[:,:,2] < 120] = 255
img[:,:,3] = mask
cv2.imwrite('decisiontreealpha.png', img)

