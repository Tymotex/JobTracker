"""
Routes for fetching job postings
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.utils.colourisation import printColoured
from flask_restplus import Resource, Api, Namespace

auth_router = Blueprint("auth", __name__)
auth_api = Api(
    auth_router, 
    doc="/doc",
    title="Authentication",
    description="Routes for authentication",
    default="/api/auth",
    default_label="Authentication",
)

@auth_api.route('/register')
class AuthenticationRegister(Resource):
    def post(self):
        return {
            "username": {
                
            }
        }   

@auth_api.route('/login')
class AuthenticationLogin(Resource):
    def post(self):
        return {
            "username": {
                
            }
        }   

