"""
Routes for managing the user's tracked jobs 
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.utils.colourisation import printColoured
from flask_restplus import Resource, Api, fields

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
    @tracker_api.marshal_list_with(board_fields)
    @tracker_api.expect(authorisation_fields)
    def get(self):
        return jsonify({
            "jobs": [
                {
                    "company": "canva"
                }
            ]
        })

