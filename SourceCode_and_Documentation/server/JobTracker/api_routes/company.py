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
from flask_restx import Resource, Api, Namespace

company_router = Blueprint("company", __name__)
company_api = Api(
    company_router, 
    doc="/doc",
    title="Job Post Details",
    description="Routes for fetching specific details on a job posting",
    default="/api/company",
    default_label="Job posting",
)

# Data model definitions


# RESTful route handlers:
@company_api.route('/')
class CompanyFetch(Resource):
    def get(self):
        return {
            "details": {
                
            }
        }  
