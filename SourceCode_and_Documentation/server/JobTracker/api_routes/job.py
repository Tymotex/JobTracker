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
import requests
from bs4 import BeautifulSoup
from functools import lru_cache
from re import findall, sub

job_router = Blueprint("job", __name__)
job_api = Api(
    job_router, 
    doc="/doc",
    title="Job Post Details",
    description="Routes for fetching specific details on a job posting",
    default="Job",
    default_label="Job Post Services",
)

# Response model definitions
meta_fields = job_api.model("MetaFields", {
    "title": fields.String,
    "company": fields.String,
    "date": fields.Date,
    "deadline": fields.Date,
    "type": fields.String,
    "salary": fields.String,
    "category": fields.String,
    "official_website": fields.Url,
    "official_post": fields.Url
})

response_fields = job_api.model("JobPostings", {
    "id": fields.Integer,
    "meta": fields.Nested(meta_fields),
    "tags": fields.List(fields.String),
    "description": fields.String,
    "requirements": fields.String
})


# RESTful route handlers:
# @job_api.route('/api/job', strict_slashes=False)
@job_api.route('/', strict_slashes=False)
class JobPostDetail(Resource):
    @job_api.param('id', 'the id of the job post to fetch')
    @job_api.doc(description='''
        Let you fetch a job post referenced by 'id'.
        id must be supplied and valid, the request is considered mailformed otherwse.
        The returned object has a meta section that contains standard information such as the title, company,
        post date, deadline, job type, salary, category, the official website to 
        the company and the official post site.
        In addition there is a list of tags supplied. Each tags is a string.
    ''')
    @job_api.response(200,'Success', response_fields)
    @job_api.response(400, 'Malformed Request')
    @job_api.response(403, 'Invalid id')
    def get(self):
        """
            Given the job post URL, returns 

            Parameters:
                - job_post_url
            Returns:
                {
                    post_details: "",
                    fields: {}
                }
        """
        request_params = dict(request.args)

        url = request_params["url"]

        return get_content(url)


@lru_cache(maxsize=100)
def get_content(url):
    web_page = requests.get(url)
    soup = BeautifulSoup(web_page.content, "html.parser")
    content = str(soup.section)
    print(type(soup))
    # for ul in soup.find_all('ul', attrs={"class": "details"}):
    #     print(type(ul))
    # print(fields)
    for field in soup.find('ul', attrs={"class": "details"}).children:
        field_str = str(field)
        field_str = field_str.replace("\n", "")
        print(field_str)
        if "#icon-contract" in field_str:
            
            m = findall(r"svg>(\w|\s)+<\/li>", field_str)
            print(m)
        print("===")
        print("\"",str(field), "\"")
        print("===")
        # print(field.string)
    return {"post_details" : content, "fields": {}}