"""
Routes for fetching job postings
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    add_user,
    login_user
)
from JobTracker.exceptions import (
    InvalidUserInput
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
    def post(self):
        printColoured(" * Registering a new user", colour="yellow")
        request_params = dict(request.form)
        try:
            username = request_params["username"]
            email = request_params["email"]
            password = request_params["password"]
            user_id = add_user(username, email, password)
            return {
                "user_id": user_id,
                "token": "EMPTY"
            }   
        except Exception as err:
            printColoured(err, colour="red")
            raise err

@auth_api.route('/login')
class AuthenticationLogin(Resource):
    def post(self):
        printColoured(" * Logging in a user", colour="yellow")
        request_params = dict(request.form)
        email = request_params["email"]
        password = request_params["password"]
        user_id = login_user(email, password)
        return {
            "user_id": user_id,
            "token": "EMPTY"
        }   
