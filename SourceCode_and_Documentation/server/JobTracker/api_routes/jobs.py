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

jobs_router = Blueprint("jobs", __name__)
jobs_api = Api(
    jobs_router, 
    doc="/doc",
    title="Job Post Search",
    description="Routes for retrieving job postings",
    default="/api/jobs",
    default_label="Job Post Search Namespace",
)

# Data model definitions
user_fields = jobs_api.model("User", {
    "skills": fields.String,
    # TODO: Need more here!
})

search_fields = jobs_api.model("SearchFields", {
    "sorting_strategy": fields.String,
    "reverse": fields.Boolean,
    "user_profile": fields.Nested(user_fields)
    # TODO: Need more here!
})

response_fields = jobs_api.model("JobPostings", {
    "position_name": fields.String,
    # TODO: Need more here!
})

# RESTful route handlers:
@jobs_api.route('/')
class JobPostSearch(Resource):
    @jobs_api.marshal_list_with(response_fields)
    @jobs_api.expect(search_fields)
    def get(self):
        return {
            "jobs": [
                {
                    "company": "canva"
                }
            ]
        }   

