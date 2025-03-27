from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
import os

app = FastAPI()

# ✅ Securely load API Key from environment variable (Set it before running)
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("GOOGLE_API_KEY is missing! Set it in your environment.")

# Initialize Gemini Pro API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Model
class SoilInput(BaseModel):
    ph: float
    moisture: float
    turbidity: float
    location: Optional[str] = None  # Village, City, or State (Optional)

@app.post("/predict")
async def predict(soil_data: SoilInput):
    """
    Takes pH, Moisture, Turbidity, and an optional location for a more contextual soil quality prediction.
    Example:
    {
        "ph": 6.5,
        "moisture": 40.0,
        "turbidity": 20.0,
        "location": "Punjab, India"
    }
    """
    # Format input for Gemini Pro
    input_text = f"""
    Predict soil quality for:
    - pH: {soil_data.ph}
    - Moisture: {soil_data.moisture}%
    - Turbidity: {soil_data.turbidity}%
    - Location: {soil_data.location if soil_data.location else 'Unknown'}
    
    Recommend the best crops suitable for this soil.
    """

    # Generate response from Gemini Pro
    response = model.generate_content(input_text)
    
    return {"soil_quality": response.text}

# Run the server using: uvicorn filename:app --reload
