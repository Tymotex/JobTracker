"""
Routes for fetching job postings
"""
import re
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.utils.colourisation import printColoured
from JobTracker.utils.debug import pretty_print_dict
from JobTracker.exceptions import InvalidUserInput
from flask_restx import Resource, Api, fields
from careerjet_api import CareerjetAPIClient

# Blueprint definitions
jobs_router = Blueprint("jobs", __name__)
jobs_api = Api(
    jobs_router, 
    doc="/doc",
    title="Job Post Search",
    description="Routes for retrieving job postings",
    default="/api/jobs",
    default_label="Job Post Search Namespace",
)

@jobs_api.route("/")
class JobPostSearch(Resource):
    # @jobs_api.marshal_list_with(response_fields)
    # @jobs_api.expect(search_fields)
    def get(self):  
        """
            Parameters:
                - location           (str)
                - query              (str)
                - results_per_page   (int)
                - page               (int)
                - sort_criteria      (str - "relevance", "date", "salary")
            Returns a JSON object: 
                {
                    jobs: [
                        {
                            company,
                            title,
                            locations,
                            url,
                            date,
                            description,
                            salary,
                            salary_type,
                            salary_currency_code,
                            salary_min,
                            salary_max,
                            site,
                        },
                        ...
                    ]
                }
        """
        # Run `pydoc careerjet_api` to see documentation. 
        printColoured(" * Getting a list of jobs")
        request_params = dict(request.args)
        pretty_print_dict(request_params)

        # TODO: Checking if all mandatory requests parameters have been sent through
        if not all(
            param in request_params 
            and request_params
            for param in [
                "location", 
                "query", 
                "results_per_page", 
                "page", 
                "sort_criteria"
            ]
        ):
            printColoured(" * Missing mandatory fields", colour="red")
            raise InvalidUserInput(description="Request parameter is missing mandatory fields")

        try:
            return get_job_postings(
                request.args.get("location"),
                request.args.get("query"),
                request.args.get("results_per_page"),
                request.args.get("page"),
                request.args.get("sort_criteria")
            )
        except Exception as err:
            printColoured(" * CareerJet API Client failed to fetch jobs. Error: {}".format(err), colour="red")
            raise InvalidUserInput(description="Couldn't find any jobs. Try a different query")
    

def get_job_postings(location, query, results_per_page, page, sort_criteria):
    """ 
        Gets job postings
    """
    cj  =  CareerjetAPIClient("en_AU")
    jobs_json = cj.search({
        "location"    : location,
        "keywords"    : query,
        "affid"       : "213e213hd12344552",
        "pagesize"    : results_per_page,
        "page"        : page,
        "sort"        : sort_criteria,                  
        "user_ip"     : "11.22.33.44",
        "url"         : "http://www.example.com/jobsearch",  
        "user_agent"  : "Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0"
    })
    try:
        for each_job in jobs_json["jobs"]:
            # Strip all leading non-alphanumeric characters
            each_job["description"] = re.sub("^[^A-Za-z0-9]*", "", each_job["description"]).capitalize()
            # Truncate duplicate whitespaces
            each_job["description"] = re.sub("\s+", " ", each_job["description"])
            each_job["description"] = re.sub("<b>", "", each_job["description"])
            each_job["description"] = re.sub("</b>", "", each_job["description"])
            # Capitalise all words occurring after punctuation such as . or !
            p = re.compile(r'(?<=[\.\?!]\s)(\w+)')
            each_job["description"] = p.sub(lambda match: match.group().capitalize(), each_job["description"])
    except Exception as err:
        printColoured("Failed to fetch jobs '{}'. Error: {}".format(query, err), colour="red")
        raise InvalidUserInput(description="Failed to find jobs for '{}'".format(query))
    return dict(jobs_json)  
