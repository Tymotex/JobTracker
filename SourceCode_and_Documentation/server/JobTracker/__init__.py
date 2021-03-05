"""
This is the root package where:
- Flask app instance is created and configured
- The database connection is established and the handler is instantiated
- The environment variables are loaded from either .env.development or .env.production
  in the same directory
"""
from flask import Flask
from dotenv import load_dotenv
from pathlib import Path 
from JobTracker.utils.colourisation import printColoured
from flask_pymongo import PyMongo
from JobTracker.exceptions import error_handler
from oauthlib.oauth2 import WebApplicationClient
import pymongo
import os

# Setting the environment variables:
# env_path = Path('.') / '.env.{}'.format(os.getenv("GALACTIC_ED_DEV_MODE"))
env_path = Path('.') / '.env.{}'.format("development")
load_dotenv(dotenv_path=env_path)

# Creating the Flask app instance
printColoured(" * Initialising Flask application")
app = Flask(__name__)

# ===== App Configuration =====

SECRET_KEY = os.getenv("SECRET_KEY")
app.secret_key = SECRET_KEY

# Registering the default error handler
app.register_error_handler(Exception, error_handler)

# Database connection parameters:
# client = pymongo.MongoClient("")

# Creating the database handler:
# db = client[""]
db = {}

# The routes must be imported after the Flask application object is created. See https://flask.palletsprojects.com/en/1.1.x/patterns/packages/
import JobTracker.routes
