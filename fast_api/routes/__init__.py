import os
import importlib
from fastapi import FastAPI
from routes import __path__ as routes_path

def auto_import_routes(app: FastAPI):
    route_dir = os.path.dirname(__file__)
    for file in os.listdir(route_dir):
        if file.endswith(".py") and file != "__init__.py":
            module_name = f"routes.{file[:-3]}"
            module = importlib.import_module(module_name)
            if hasattr(module, "router"):
                app.include_router(module.router)
