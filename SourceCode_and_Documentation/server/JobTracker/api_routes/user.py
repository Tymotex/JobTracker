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
    get_boards,
    create_board,
    get_board
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

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
    # @user_api.doc(
    #     description="Get a user's profile information",
    #     params={
    #         "id": "User's ID",
    #         "token": "JWT token"
    #     }
    # )
    # @user_api.marshal_with(user_fields)
    def get(self):
        """
            TODO
        """

@user_api.route('/boards')
class UserBoardManagement(Resource):
    def get(self):
        """
            Retrieves a list of the user's boards        
            Parameters:
                - user_id
        """
        printColoured(" * Retrieving all boards for a user", colour="yellow")
        user_id = request.args.get("user_id")
        boards = get_boards(user_id)
        return boards
    
    def post(self):
        """
            Parameters:
                - user_id
                - name
                - description
        """
        printColoured(" * Creating a new board", colour="yellow")
        request_params = dict(request.form)
        user_id = request_params["user_id"]
        name = request_params["name"]
        description = request_params["description"]
        board_id = create_board(user_id, name, description)
        return {
            "board_id": board_id
        }

@user_api.route("/board")
class UserBoard(Resource):
    def get(self):
        """
            Retrieves a specific board
            Parameters: 
                - user_id
                - board_id
        """
        printColoured(" * Retrieving specific board", colour="yellow")
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        board = get_board(user_id, board_id)
        return board

        
