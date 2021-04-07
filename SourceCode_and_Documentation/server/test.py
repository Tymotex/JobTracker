def eliminate_stat_duplicates(stats):
    """
        Suppose you have [
            {
                "timestamp": 1,
                "activity":  "application",
                "job_id": "123"
            },
            {
                "timestamp": 2,
                "activity":  "resume",
                "job_id": "123"
            },
            {
                "timestamp": 3,
                "activity":  "resume",     
                "job_id": "123"
            },
            {
                "timestamp": 4,
                "activity": "interview",
                "job_id": "123"
            },
            {
                "timestamp": 5,
                "activity": "application",
                "job_id": "123"
            }
        ].
        This function eliminates duplicate stats for a tracked job
    """
    # Activity orders:
    # application -> resume -> interview -> final
    activities_stage = {
        "application": 0,
        "resume": 10,
        "interview": 20,
        "final": 30
    }

    # Fetching the stats array for the board
    # board = db.boards.find_one({ "_id": ObjectId(board_id) })
    # stats = board["statistics"]

    # Sort timestamps into ascending order
    stats.sort(key=lambda x: x["timestamp"])

    latest_stage =  -1
    i = 0
    while i < len(stats):
        each_stat = stats[i]
        curr_stage = activities_stage[each_stat["activity"]]
        if latest_stage < curr_stage:
            latest_stage = curr_stage
            i += 1
        else:
            # Duplicate discovered. Eliminate it from the list
            del stats[i]
    print(latest_stage)
    return stats

"""
[
    {
        "timestamp": 1,
        "activity":  "application",
        "job_id": "123"
    },
    {
        "timestamp": 2,
        "activity":  "resume",
        "job_id": "123"
    },
    {
        "timestamp": 3,
        "activity":  "application",      
        "job_id": "123"
    }
]

"""