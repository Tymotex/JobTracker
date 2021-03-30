"""
Routes for fetching job statistics

The user story describing this says the statistic to show will be selected from a 
drop down menu which i think is a good idea as this will be quite expensive to produce.
We might have to pre-load and store this data rather than fetching it each time.
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, Namespace, fields

stats_router = Blueprint("stats", __name__)
stats_api = Api(
    stats_router, 
    doc="/doc",
    title="Job Statistics",
    description="Routes for fetching job statistics",
    default="/api/stats",
    default_label="Job statistics",
)

# Data model definitions
search_fields = jobs_api.model("SearchFields", {
    "career_type": fields.String,
    # TODO: Need more here!
})

response_fields = jobs_api.model("JobPostings", {
    "position_name": fields.String,1
    # TODO: Need more here!
})

# RESTful route handlers:
@stats_api.route('/')
class Stats(Resource):
    def get(self):
        return {
            "stats": []
        }   
