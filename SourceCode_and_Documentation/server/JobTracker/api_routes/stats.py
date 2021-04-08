"""
Routes for fetching job statistics

The user story describing this says the statistic to show will be selected from a 
drop down menu which i think is a good idea as this will be quite expensive to produce.
We might have to pre-load and store this data rather than fetching it each time.
"""
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    fetch_stats
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, Namespace, fields

stats_router = Blueprint("stats", __name__)
stats_api = Api(
    stats_router, 
    doc="/doc",
    title="Job Statistics",
    description="Routes for fetching job statistics",
    default="/api/stats",
    default_label="Job statistics",
)

# Data model definitions
search_fields = jobs_api.model("SearchFields", {
    "career_type": fields.String,
})


#How to do fields.list of lists?

response_fields = jobs_api.model("Statistics", {
    "growth_data": fields.List(fields.List(fields.Integer)),
    "popular_skills" fields.List(fields.String) ,
    # TODO: Need more here!
})


# RESTful route handlers:
# ============================================ START KELLY ============================================

@stats_api.route('/activity')
class Stats(Resource):
    @jobs_api.marshal_list_with(response_fields)
    @jobs_api.expect(search_fields)
    def get(self):
        """
            To hit this route - call GET http://localhost:5000/api/user/stats/activity

            Fetches user activity data for each date.
            Preprocesses it so that each date has a list of activities the user did.
            This makes it easy for the frontend to render graphically

            Parameters:
                - user_id
                - start time
                - end time

            Some possibly relevant resources:
                - https://stackoverflow.com/questions/29721228/given-a-date-range-how-can-we-break-it-up-into-n-contiguous-sub-intervals
                - https://stackoverflow.com/questions/7274267/print-all-day-dates-between-two-dates
            
            Some additional info:
                - the stats array should contain objects sorted in ascending order of timestamp (sort again just in case)
        """
        printColoured(" * Getting user stats", colour="yellow")
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        start_time = request_params["start_time"]
        end_time = request_params["end_time"]

        # NOTE: temporarily just returning stats
        return fetch_stats(user_id)

        # First call fetch_stats in database_ops.py

        """
            Note: the stats object looks like:
            [
                {
                    "timestamp": 123,
                    "activity": "application"
                },
                {
                    "timestamp": 1256,
                    "activity": "interview"
                }
            ]
        """

        # For each day between start time and end time,
        """
        Suppose this endpoint gets called on start=6/4/2020, end=23/4/2020,
        return an array that might look like this for example:
        [
            "6/4/2020": [
                "application",
                "application",
                "interview",
                ...
            ]
            "7/4/2020": [
                ...
            ],
            ...,
            "23/4/2020": [
                ...
            ]
        ]

        """

        return [
            
        ]

# ============================================ END KELLY ============================================

