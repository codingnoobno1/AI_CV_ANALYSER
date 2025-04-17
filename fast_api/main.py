from fastapi import FastAPI
from routes import auto_import_routes

app = FastAPI()

# Automatically include all routes from routes folder
auto_import_routes(app)

@app.get("/")
def root():
    return {"message": "Welcome to modular FastAPI"}


