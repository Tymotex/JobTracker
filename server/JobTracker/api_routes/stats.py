"""
Routes for fetching user analytics summaries
"""
from datetime import datetime, timedelta
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
from JobTracker.utils.debug import pretty_print_dict
from JobTracker.exceptions import InvalidUserInput
from flask_restx import Resource, Api, Namespace, fields

# Blueprint definition
stats_router = Blueprint("stats", __name__)
stats_api = Api(
    stats_router, 
    doc="/doc",
    title="Job Statistics",
    description="Routes for fetching job statistics",
    default="/api/stats",
    default_label="Job statistics",
)

@stats_api.route('/activity')
class Stats(Resource):
    def get(self):
        """
            Fetches user activity data for each date.
            Preprocesses it so that each date has a list of activities the user did.
            This makes it easy for the frontend to render graphically

            Parameters:
                - user_id
                - board_id
                - start time
                - end time
        """
        printColoured(" * Getting user activity stats", colour="yellow")
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]

        stats = fetch_stats(user_id, board_id)

        # Sort timestamps into ascending order
        stats.sort(key=lambda x: x["timestamp"])
        start_date = datetime.fromtimestamp(int(request_params["start_time"]))
        end_date = datetime.fromtimestamp(int(request_params["end_time"]))

        delta = end_date - start_date
        if (delta.days < 0):
            raise InvalidUserInput(description="Invalid time range. Check that the start time is after end time")

        date_list = {}

        # METHOD 1 - iterating through the entire stats array for each day
        #            takes longer but more confident that it is more accurate
        for i in range(delta.days + 2):
            day = start_date + timedelta(days=i)
            day = day.strftime('%d/%m/%Y')
            date_list[day] = []
            for j in range(len(stats)):
                curr_day = datetime.fromtimestamp(stats[j]['timestamp']).strftime('%d/%m/%Y')
                if curr_day != day:
                    continue
                date_list[day].append((stats[j]['activity']))
                date_list[day].sort()
        
        # METHOD 2 - stop iterating through the stats array when dates no longer match
        #            keeps track of last position in stats array so no need to iterate through days that have already been matched
        #            takes shorter time but might be less accurate
        '''for i in range(delta.days + 2):
            day = (start_date + timedelta(days = i)).strftime('%d/%m/%Y')
            k = 0
            for j in range(k, len(stats)):
                curr_day = datetime.fromtimestamp(stats[j]['timestamp']).strftime('%d/%m/%Y')
                if curr_day < day:
                    continue
                elif curr_day > day:
                    k = j
                    break

                if day not in date_list.keys():
                    activity_list = []

                activity_list.append((stats[j]['activity']))
                activity_list.sort()
                date_list[day] = activity_list'''

        # For each day between start time and end time,
        return date_list
