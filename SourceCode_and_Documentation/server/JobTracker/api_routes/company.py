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

from wikipediaapi import Wikipedia
from JobTracker.api_routes.jobs import get_job_postings

def get_company_details(company):
    """
        Params: 
            - company (str)
        Returns:
            - company_description (str)
    """
    wiki_wiki = Wikipedia('en')

    # try different methods for searching  for the company until something good is returned
    page = wiki_wiki.page(company + " (company)")

    if not page.exists():
        page = wiki_wiki.page(company)


    company_data = page.text
    company_description = company_data.split("\n")[0]
    return company_description


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
        request_params = dict(request.args)
        # print(request_params)
        company_name = request_params["company"]
        company_details = get_company_details(company_name)

        job_resp = get_job_postings("Sydney", company_name, 100, 1, "relevance")

        job_list = job_resp["jobs"]
        job_list = list(filter(lambda x: x["company"].lower() == company_name.lower(), job_list))

        print(len(job_list))
        return {
            "company_info": {
                # ...
                "company_details": company_details
            },
            "jobs" : [
                *job_list
            ]
        }  


