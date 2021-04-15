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
from JobTracker.exceptions import InvalidUserInput

from wikipediaapi import Wikipedia
from JobTracker.api_routes.jobs import get_job_postings

from functools import lru_cache

@lru_cache(maxsize=1000)
def get_company_details(company):
    """
        Params: 
            - company (str)
        Returns:
            - company_description (str)
    """
    print("Func get_company_details is called")
    wiki_wiki = Wikipedia('en')

    try:
        # try different methods for searching  for the company until something good is returned
        page = wiki_wiki.page(company + " (company)")

        if not page.exists():
            page = wiki_wiki.page(company)
    except Exception as err:
        printColoured(err, colour="red")
        raise InvalidUserInput(description="Connection timed out. Please try again later")

    company_data = page.text
    company_description = company_data.split("\n")[0]
    return company_description


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
@company_api.route('/', strict_slashes=False)
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
                - company
                - disable_jobs (optional param)
        """

        # Get company info through Wikipedia (or opencorporates)
        
        # Get relevant jobs

        # Call: get_job_postings(location, query, results_per_page, page, sort_criteria)
        # To get job list

        # Filter for the jobs that actually belong to company_name
        request_params = dict(request.args)
        print(request_params)
        company_name = request_params["company"]
        if company_name == "":
            # Returns nothing if given nothing
            return  {
                "company_info": {
                    "company_details": ""
                },
            }

        company_details = get_company_details(company_name)

        if "disable_jobs" in request_params and request_params["disable_jobs"] == 'true':    
            return  {
                "company_info": {
                    "company_details": company_details
                },
            }

        job_resp = get_job_postings("Sydney", company_name, 10, 1, "relevance")

        job_list = job_resp["jobs"]
        job_list = list(filter(lambda x: x["company"].lower() == company_name.lower(), job_list))

        print(len(job_list))
        return {
            "company_info": {
                "company_details": company_details
            },
            "jobs" : [
                *job_list
            ]
        } 