"""
Routes for managing the user's tracked jobs 
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    add_job,
    get_board
)
from JobTracker.exceptions import (
    InvalidUserInput
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

tracker_router = Blueprint("tracker", __name__)
tracker_api = Api(
    tracker_router, 
    doc="/doc",
    title="Job Posting Tracking",
    description="Routes for managing the user's boards and job tracking automation",
    default="/api/tracking",
    default_label="Job board automation",
)

# Data model definitions
board_fields = tracker_api.model("Board", {
    "position_name": fields.String,
    "deadline": fields.String
})

authorisation_fields = tracker_api.model("Auth", {
    "user_id": fields.String,
    "token": fields.String,
    "board_id": fields.String
}) 

# RESTful route handlers:
@tracker_api.route("/")
class Tracker(Resource):
    # @tracker_api.marshal_list_with(board_fields)
    # @tracker_api.expect(authorisation_fields)
    def get(self):
        """
            Fetches the list of tracked jobs for a specific board owned by a user
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

    def post(self):
        """
            Pushes a new job to be tracked under a specific board owned by a user
            Parameters:
                - user_id
                - board_id
                - job_to_track
        """
        # TODO: Error handling
        printColoured(" * Tracking a new job", colour="yellow")
        request_params = dict(request.get_json())
        try:
            board_id = request_params["board_id"]
            user_id = request_params["user_id"]
            job_to_track = request_params["job_to_track"]
        except KeyError as err:
            raise InvalidUserInput(description="Missing mandatory fields: {}".format(err))
        
        return add_job(board_id, user_id, job_to_track)

        
