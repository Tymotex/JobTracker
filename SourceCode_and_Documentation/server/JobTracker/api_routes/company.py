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
from flask_restx import Resource, Api, fields


company_router = Blueprint("company", __name__)

company_api = Api(
    company_router, 
    doc="/doc",
    title="Company Profile",
    description="Routes for fetching specific details on a company",
    default="Company",
    default_label="Company Profile Services",
)


# Data model definitions
response_fields = company_api.model("CompanyProfile", {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "jobs": fields.List(fields.Integer)
})

# RESTful route handlers:
@company_api.route('/api/company', strict_slashes=False)
class CompanyFetch(Resource):
    @company_api.param('id', 'the id of the company to fetch')
    @company_api.param('name', 'the name of the company to fetch')

    @company_api.response(200,'Success', response_fields)
    @company_api.response(400, 'Malformed Request')
    @company_api.response(404, 'Company Not Found')
    @company_api.doc(description='''
        Gets the information for the company. if neither id nor name is specified,
        the corresponding to the supplied 
        If both are supplied the id is used first and on failure the name is used.
        If all supplied forms of identification are invalid the request is 
        considered malformed.
        The response object contains a list of job_post_ids of the jobs released 
        by the company. Use the GET /job to retrive the entire job post.
    ''')
    def get(self):
        """
            Getting company info [using opencorporates or wikipedia]

            Parameters:
                - company_name
        """

        # Get company info through Wikipedia (or opencorporates)


        # Get relevant jobs

        # Call: get_job_postings(location, query, results_per_page, page, sort_criteria)
        # To get job list

        # Filter for the jobs that actually belong to company_name

        return {
            "company_info": {
                # ...
            },
            "jobs": [
                {
                    # ...
                }
            ]
        }  


