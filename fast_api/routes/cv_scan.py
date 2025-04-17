# Simplified backend logic for frame processing
from fastapi import APIRouter, Request
from PIL import Image
import cv2
import numpy as np
import pytesseract
import base64
import io
from ultralytics import YOLO

router = APIRouter(prefix="/cv_scan", tags=["CV Scanner"])
model = YOLO("yolov8n.pt")  # Replace with custom trained model for CV/doc if needed

@router.post("/auto_scan")
async def auto_scan(request: Request):
    data = await request.json()
    image_data = data.get("image_data")
    if not image_data:
        return {"error": "No image data"}

    image_base64 = image_data.split(",")[1]
    image_bytes = base64.b64decode(image_base64)
    image_np = np.array(Image.open(io.BytesIO(image_bytes)))

    # Run YOLO detection
    results = model(image_np)[0]
    for box in results.boxes:
        # Extract region (YOLO gives xyxy)
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        roi = image_np[y1:y2, x1:x2]

        # Run OCR on ROI
        roi_pil = Image.fromarray(roi)
        text = pytesseract.image_to_string(roi_pil)

        if text.strip():
            return {"text": text}

    return {"text": "[No document detected or no text found]"}
