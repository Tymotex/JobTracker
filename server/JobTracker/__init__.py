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
from JobTracker.utils.debug import print_env_variables
from flask_pymongo import PyMongo
from JobTracker.exceptions import error_handler
from flask_cors import CORS
import pymongo
import os
from os.path import join, dirname

# Setting the environment variables:
env_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__, static_url_path="/static")
CORS(app)

app.config["RESUME_UPLOAD_PATH"] = 'resumes'

# ===== Debug and Testing =====
print_env_variables()

# This must be set to 1 to bypass InsecureTransportError when testing locally
# Source: https://stackoverflow.com/questions/27785375/testing-flask-oauthlib-locally-without-https/27785830
if os.getenv("ENV_TYPE") == "development":
    printColoured(" * Disabling secure transport for Google OAuth in development", colour="yellow")
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# ===== App Configuration =====
SECRET_KEY = os.getenv("SECRET_KEY")
app.secret_key = SECRET_KEY

# Registering the default error handler
app.register_error_handler(Exception, error_handler)

# Creating the database handler:
client = pymongo.MongoClient(os.getenv("DB_URI"))

# Creating the database handler:
db = client["jobtracker"]

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import JobTracker.routes
