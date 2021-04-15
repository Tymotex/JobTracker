"""
This is the root package where:
- Flask app instance is created and configured
- The database connection is established and the handler is instantiated
- The environment variables are loaded from either .env.development or .env.production
  in the same directory
"""
import requests
import json
from flask import Flask, Blueprint, request, redirect
from dotenv import load_dotenv
from pathlib import Path
from JobTracker.utils.colourisation import printColoured
from flask_pymongo import PyMongo
from JobTracker.exceptions import error_handler
from flask_restx import Api, Resource
from flask_cors import CORS
import pymongo
import os

# Setting the environment variables:
env_path = Path('.') / '.env.{}'.format("development")
load_dotenv(dotenv_path=env_path)


# Creating the Flask app instance
printColoured(" * Initialising Flask application")

app = Flask(__name__, static_url_path="/static")
CORS(app)

# blueprint = Blueprint("api", __name__, url_prefix="/api")

# api = Api(blueprint, doc="/doc")

# app.register_blueprint(blueprint)

app.config["SWAGGER_UI_JSONEDITOR"] = True
app.config["RESUME_UPLOAD_PATH"] = 'resumes'


@app.route("/")
def index_route():
    return "Hello, looks like this works"

# ===== App Configuration =====


SECRET_KEY = os.getenv("SECRET_KEY")
app.secret_key = SECRET_KEY

# Registering the default error handler
app.register_error_handler(Exception, error_handler)

# Database connection parameters:
# client = pymongo.MongoClient("")

# Creating the database handler:
client = pymongo.MongoClient(
    "mongodb+srv://tim:1984@jobtrackercluster.vznsj.mongodb.net/jobtracker?retryWrites=true&w=majority")

# Creating the database handler:
db = client["jobtracker"]

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/

import JobTracker.routes
