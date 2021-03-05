"""
Some basic routes for testing the connection to the back end and other simple 
experiments.
"""
from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    g
)
from JobTracker.utils.colourisation import printColoured

test_router = Blueprint("test", __name__)

@test_router.route("/")
def index():
    """ Landing page """
    return render_template(
        "landing.html"
    )
