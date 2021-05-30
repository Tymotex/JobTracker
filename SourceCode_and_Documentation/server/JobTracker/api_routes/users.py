"""
Routes for fetching job postings
"""
from os.path import isfile
import requests
import json
from JobTracker.utils.debug import pretty_print_dict
from flask import (
    send_file,
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    get_users
)
from JobTracker.exceptions import InvalidUserInput
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

RESUME_DIR_PATH = "JobTracker/static/resumes"

users_router = Blueprint("users", __name__)
users_api = Api(
    users_router, 
    doc="/doc",
    title="Users",
    description="Routes for fetching groups of users",
    default="/api/users",
    default_label="Users",
)

@users_api.route('')
class Users(Resource):
    def get(self):
        """
            Fetches a list of all users on the platform
            Parameters:
                - Nothing so far. TODO
        """
        printColoured(" * Getting a list of all user", colour="yellow")
        return get_users()
        
