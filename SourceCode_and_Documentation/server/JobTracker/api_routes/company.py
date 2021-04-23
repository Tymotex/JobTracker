"""
Routes for handling company details fetching
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

# Blueprint definition
company_router = Blueprint("company", __name__)

company_api = Api(
    company_router, 
    doc="/doc",
    title="Company Profile",
    description="Routes for fetching specific details on a company",
    default="Company",
    default_label="Company Profile Services",
)

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

# RESTful route handlers:
@company_api.route('/', strict_slashes=False)
class CompanyFetch(Resource):
    def get(self):
        """
            Getting company info [using opencorporates or wikipedia]

            Parameters:
                - company
                - disable_jobs (optional param)
        """
        # Filter for the jobs that actually belong to company_name
        request_params = dict(request.args)
        print(request_params)
        company_name = request_params["company"]
        if company_name == "":
            # Returns nothing if given nothing
            return  {
                "company_info": {
                    "company_details": "",
                    "company_name": company_name
                },
            }

        company_details = get_company_details(company_name)

        if "disable_jobs" in request_params and request_params["disable_jobs"] == 'true':    
            return  {
                "company_info": {
                    "company_details": company_details,
                    "company_name": company_name
                },
            }

        job_resp = get_job_postings("Sydney", company_name, 10, 1, "relevance")

        job_list = job_resp["jobs"]
        job_list = list(filter(lambda x: x["company"].lower() == company_name.lower(), job_list))

        print(len(job_list))
        return {
            "company_info": {
                "company_details": company_details,
                "company_name": company_name
            },
            "jobs" : [
                *job_list
            ]
        } 

