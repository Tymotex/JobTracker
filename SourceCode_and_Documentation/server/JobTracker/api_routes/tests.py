"""
Some basic routes for testing the connection to the back end and other simple 
experiments.
"""
from flask import (
    Blueprint,
    render_template,
    request
)
from JobTracker.utils.colourisation import printColoured

landing_router = Blueprint("test", __name__)

@landing_router.route("/")
def index():
    """ Landing page """
    namespaces = [
        "jobs",
        "user",
        "auth",
        "stats",
        "job"
    ]
    return render_template(
        "landing.html",
        namespaces=[ 
            "{}{}/{}/{}".format(
                request.base_url, 
                "api", 
                namespace,
                "doc"
            ) 
            for namespace in namespaces 
        ]
    )
