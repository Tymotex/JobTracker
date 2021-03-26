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

jobs_router = Blueprint("jobs", __name__)
jobs_api = Api(
    jobs_router, 
    doc="/doc",
    title="Job Post Search",
    description="Routes for retrieving job postings",
    default="/api/jobs",
    default_label="Job Post Search Namespace",
)

@jobs_api.route('/')
class HelloWorld(Resource):
    """ 
        Endpoint: /jobs

        Getting job postings from APIs here:
            https://blog.api.rakuten.net/top-10-best-jobs-apis-linkedin-indeed-glassdoor-and-others/ 
            https://www.programmableweb.com/news/top-10-apis-jobs/brief/2020/02/23 

        TODO:
            Think about what paramters this route should take.
            Eg. /jobs?num_postings=10&sort_strategy=most_recent
        
        TODO: 
            Think about what info the job posting should contain:
                [
                    { ... what goes here? }, 
                    ...
                ]
    """
    def get(self):
        return {
            "jobs": [
                {
                    "company": "canva"
                }
            ]
        }    # Assumes you are returning JSON


