"""
Routes for managing the user's tracked jobs 
"""
import time
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    add_job,
    update_job,
    push_stat,
    eliminate_stat_duplicates
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
        
        job_id = add_job(board_id, user_id, job_to_track)

        # TODO: push stat for new application
        push_stat(board_id, {
            "timestamp": int(time.time()),
            "activity": "application",
            "job_id": job_id
        })

        return job_to_track

    def put(self):
        """
            Updates a tracked job
            Parameters:
                - user_id
                - board_id
                - job_id
                - updated_job
        """
        printColoured(" * Updating an existing tracked job", colour="yellow")
        requests_params = dict(request.get_json())
        user_id = requests_params["user_id"]
        board_id = requests_params["board_id"]
        job_id = requests_params["job_id"]
        updated_job = requests_params["updated_job"]

        # Push stat and eliminate duplicates if they occur after pushing
        push_stat(board_id, {
            "timestamp": time.time(),
            "activity": updated_job["current_status"],
            "job_id": job_id
        })
        eliminate_stat_duplicates(board_id, job_id, updated_job["current_status"])

        return update_job(user_id, board_id, job_id, updated_job)
 
    def delete(self):
        """
            Removes a tracked job and all its associated data
        """
        printColoured(" * Removing a tracked job")
        
