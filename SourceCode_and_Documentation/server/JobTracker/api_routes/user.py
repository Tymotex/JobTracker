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
from flask_restplus import Resource, Api, fields

user_router = Blueprint("user", __name__)
user_api = Api(
    user_router, 
    doc="/doc",
    title="User Job Profile",
    description="Routes for managing the user's job profile and settings",
    default="/api/user",
    default_label="User job profile management",
)

# Data model definitions
user_fields = user_api.model("User", {
    "username": fields.String(description="Username"),
})

# RESTful route handlers:
@user_api.route('/')
class UserJobProfile(Resource):
    @user_api.doc(
        description="Get a user's profile information",
        params={
            "id": "User's ID",
            "token": "JWT token"
        }
    )
    @user_api.marshal_with(user_fields)
    def get(self):
        return {
            "user": {
                
            }
        }   



