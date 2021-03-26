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
from flask_restplus import Resource, Api, Namespace

job_router = Blueprint("job", __name__)
job_api = Api(
    job_router, 
    doc="/doc",
    title="Job Post Details",
    description="Routes for fetching specific details on a job posting",
    default="/api/job",
    default_label="Job posting",
)

@job_api.route('/')
class JobPostDetail(Resource):
    def get(self):
        return {
            "details": {
                
            }
        }  
