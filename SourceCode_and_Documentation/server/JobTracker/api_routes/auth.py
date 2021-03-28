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
from flask_restx import Resource, Api, fields



auth_router = Blueprint("auth", __name__)
auth_api = Api(
    auth_router, 
    doc="/doc",
    title="Authentication",
    description="Routes for authentication",
    default="/api/auth",
    default_label="Authentication",
)

# Data model definitions
session_fields = auth_api.model("User", {
    "user_id": fields.String(description="User ID"),
    "token": fields.String(description="JWT Token")
})

# RESTful route handlers:
@auth_api.route('/register')
class AuthenticationRegister(Resource):
    @auth_api.marshal_with(session_fields)
    @auth_api.doc(
        description="Registration",
        params={
            "username": "Registered username",
            "email": "Registration email",
            "password": "Password"
        }
    )
    def post(self):
        return {
            "username": {
                
            }
        }   

@auth_api.route('/login')
class AuthenticationLogin(Resource):
    @auth_api.marshal_with(session_fields)
    @auth_api.doc(
        description="Login",
        params={
            "email": "Login email",
            "password": "Login password"
        }
    )
    def post(self):
        return {
            "username": {
                
            }
        }   
