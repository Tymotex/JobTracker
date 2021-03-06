"""
Routes for managing the user's tracked jobs and other job board automation logic.
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
    eliminate_stat_duplicates,
    delete_job
)
from JobTracker.exceptions import (
    InvalidUserInput
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

# Blueprint definition
tracker_router = Blueprint("tracker", __name__)
tracker_api = Api(
    tracker_router,
    doc="/doc",
    title="Job Posting Tracking",
    description="Routes for managing the user's boards and job tracking automation",
    default="/api/tracking",
    default_label="Job board automation",
)

# RESTful route handlers:

OFFSET = 0 * 24 * 60 * 60


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
        printColoured(" * Tracking a new job", colour="yellow")
        request_params = dict(request.get_json())
        try:
            board_id = request_params["board_id"]
            user_id = request_params["user_id"]
            job_to_track = request_params["job_to_track"]
        except KeyError as err:
            raise InvalidUserInput(
                description="Missing mandatory fields: {}".format(err))

        job_id = add_job(board_id, user_id, job_to_track)

        push_stat(board_id, {
            "timestamp": int(time.time() - OFFSET),
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
            "timestamp": time.time() - OFFSET,
            "activity": updated_job["current_status"],
            "job_id": job_id
        })
        eliminate_stat_duplicates(
            board_id, job_id, updated_job["current_status"])

        return update_job(user_id, board_id, job_id, updated_job)

    def delete(self):
        """
            Removes a tracked job and all its associated data
        """
        printColoured(" * Removing a tracked job")
        request_params = dict(request.form)
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        job_id = request_params["job_id"]
        return delete_job(user_id, board_id, job_id)
