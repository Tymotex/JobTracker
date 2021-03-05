"""
Routes for managing the user's tracked jobs 
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.utils.colourisation import printColoured

tracker_router = Blueprint("tracker", __name__)

@tracker_router.route("/")
def index():
    """ 
        Endpoint: /user/jobs

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
                "company": "canva"
            }
        ]
    })

