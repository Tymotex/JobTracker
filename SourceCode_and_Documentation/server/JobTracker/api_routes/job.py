"""
Routes for fetching job postings
"""
from functools import lru_cache
from re import findall, sub
import requests
from bs4 import BeautifulSoup
from flask import Blueprint, jsonify, render_template, request
from flask_restx import Api, Resource, fields
from JobTracker.exceptions import InvalidUserInput
from JobTracker.utils.colourisation import printColoured
from html_sanitizer import Sanitizer

# Blueprint definition
job_router = Blueprint("job", __name__)
job_api = Api(
    job_router, 
    doc="/doc",
    title="Job Post Details",
    description="Routes for fetching specific details on a job posting",
    default="Job",
    default_label="Job Post Services",
)

@job_api.route('/', strict_slashes=False)
class JobPostDetail(Resource):
    def get(self):
        """
            Given the job post URL, scrapes the given URL and returns extracted fields and an 
            HTML body to render 

            Parameters:
                - job_post_url
            Returns:
                {
                    post_details: "",
                    fields: {}
                }
        """
        printColoured(" * Getting job post details", colour="yellow")
        request_params = dict(request.args)
        url = request_params["url"]
        return get_content(url)

@lru_cache(maxsize=100)
def get_content(url):
    web_page = requests.get(url)
    soup = BeautifulSoup(web_page.content, "html.parser")
    content = str(soup.section)
    try:
        for field in soup.find('ul', attrs={"class": "details"}).children:
            field_str = str(field)
            field_str = field_str.replace("\n", "")
            print(field_str)
            if "#icon-contract" in field_str:
                m = findall(r"svg>(\w|\s)+<\/li>", field_str)
            # print(field.string)
        sanitiser = Sanitizer()
        content = sanitiser.sanitize(content)
        return {"post_details" : content, "fields": {}}
    except:
        raise InvalidUserInput(description="Couldn't find details for that job")
