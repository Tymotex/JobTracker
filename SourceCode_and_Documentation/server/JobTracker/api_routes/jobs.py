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

jobs_router = Blueprint("jobs", __name__)

@jobs_router.route("/")
def index():
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
    return jsonify({
        "jobs": [
            {
                "id": "12345",
                "url": "google.com",
                "title": "software engineer",
                "description": "a job for software engineers",
                "company": "google",
                "date": "30/03/21",
                "location": "sydney, nsw, australia",
                "salary": "70000",
                "job type": "full time"
            }
        ]
    })

