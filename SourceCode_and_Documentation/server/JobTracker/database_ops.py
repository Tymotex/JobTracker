"""
A suite of database operations that abstract over the specific DBMS used and the driver
library or ODM used to interface with that DBMS.
"""
import time
from JobTracker import db
from JobTracker.utils.colourisation import printColoured
from typing import (
    Dict, 
    List
)
from JobTracker.exceptions import (
    InvalidUserInput
)
from bson import ObjectId
import uuid

# ===== User Management =====

def add_user(username: str, email: str, password: str, image_url="") -> str:
    """
        Registers a new user and commits them to the database.
        Parameters:
            - username
            - email
            - password
        Returns:
            - token
            - user_id
    """
    # TODO: What happens on failure?
    # TODO: Need to check if user already exists
    if user_exists(email):
        raise InvalidUserInput(description="A user with that email already exists")
    inserted_user = db.users.insert_one({
        "username": username,
        "email": email,
        "password": password,
        "image_url": image_url,
        "experience": "",
        "phone": "",
        "skills": [],
        "resume": {},
        "favourited_companies": []
    })
    return str(inserted_user.inserted_id)


def login_user(email: str, password: str) -> str:
    """
        Retrieves a user matching the supplied fields.
        Parameters:
            - email
            - password
        Returns:
            - token
            - user_id
    """
    # TODO: What happens on failure?
    target_user = db.users.find_one({ "email": email })
    if not target_user:
        raise InvalidUserInput(description="An account with that email doesn't exist")
    if not target_user["password"] == password:
        raise InvalidUserInput(description="Password incorrect")
    return str(target_user["_id"])

# ===== User Profile Management =====

def set_user_resume_fields(user_id: str, resume_data: dict):
    """
        Overwrites the user document's resume field with the provided resume_data 
    """
    db.users.update_one(
        {
            "_id": ObjectId(user_id)
        },
        {
            "$set": {
                "resume": resume_data
            }
        }
    )
def get_user_profile(user_id: str):
    """
        Get the user's profile fields.
    """
    user = db.users.find_one(
        {
            "_id": ObjectId(user_id)
        }
    )
    if not user:
        raise InvalidUserInput(description="Couldn't find user of ID: {}".format(user_id))
    user["_id"] = str(user["_id"])
    return user

def set_user_profile(user_id: str, username: str, email:str, password: str, experience: str, phone: str, skills: list):

    db.users.update_one(
        {
            "_id": ObjectId(user_id)
        },
        {
            "$set": {
            "username": username,
            "email": email,
            # "password": password,
            "experience": experience,
            "phone": phone,
            "skills": skills,
            }
        }
    )
    return user_id



# ===== Board Management =====

def create_board(user_id: str, name: str, description: str, image_url="") -> str: 
    """
        Creates a new document for the 'boards' collection.
        Returns the ID of the new document
    """
    # TODO: What happens on failure?
    inserted_document = db.boards.insert_one({
        "user_id": user_id,
        "name": name,
        "description": description,
        "tracked_jobs": [],
        "image_url": image_url,
        "statistics": []
    })
    return str(inserted_document.inserted_id) 

def get_boards(user_id: str) -> list:
    """
        Fetches all the boards owned by the user with the given user_id.
    """
    # TODO: What happens on failure?
    boards = [ board for board in db.boards.find({ "user_id": user_id }) ]
    for each_board in boards:
        each_board["_id"] = str(each_board["_id"])
    return boards

def get_board(user_id: str, board_id: str):
    board = db.boards.find_one({ "user_id": user_id, "_id": ObjectId(board_id) })
    if not board:
        raise InvalidUserInput(description="Couldn't find the board with id: {}".format(board_id))
    board["_id"] = str(board["_id"])
    return board


# ============================================ START KAI ============================================
# TODO: KAI

# use the pymongo docs if lost: https://pymongo.readthedocs.io/en/stable/

# TODO: LOOK INTO ANY POTENTIAL ERROR CASES
def edit_board(user_id: str, board_id: str, name: str, description: str, image_url=""):
    """
        Updates an existing board's details
    """
    db.boards.update_one(
        {'user_id' : user_id, '_id': ObjectId(board_id)}, 
        {'$set' : {"name" : name, 'description' : description, "image_url": image_url}}
    )
    return {
        "new_name": name,
        "new_description": description,
        "new_image_url": image_url
    }

# Note: Tim did this. Needed to set the tracked jobs
def set_tracked_jobs(user_id: str, board_id: str, tracked_jobs):
    """
        Updates the tracked jobs of the given board
    """
    db.boards.update_one(
        {
            "user_id": user_id, 
            "_id": ObjectId(board_id)
        },
        {
            "$set": {
                "tracked_jobs": tracked_jobs
            }
        }
    )
    return tracked_jobs

def delete_board(user_id: str, board_id: str):
    """
        Deletes a given user's board
    """
    db.boards.delete_one(
        {'user_id' : user_id, '_id': ObjectId(board_id)}
    )
    return board_id

# ============================================ END KAI ============================================


# ============================================ START KATRINA ============================================
# TODO: KATRINA

# use the pymongo docs if lost: https://pymongo.readthedocs.io/en/stable/

def get_favourite_company(user_id: str):
    # Find the user, then get and return the favourited companies name array
    user = db.users.find_one({ 
        "_id":  ObjectId(user_id)
    })
    if not user:
        raise InvalidUserInput(description="Couldn't find the user with id: {}".format(user_id))

    return user["favourited_companies"]

def save_favourite_company(user_id: str, company_name: str):  # TODO: more params needed?

    # check quantity
    fav_companies = get_favourite_company(user_id);
    if len(fav_companies) > 10:
        raise InvalidUserInput(description="You can't have more than 10 favourite companies")
    
    # Find the user, then push the company_name into the favourited_companies field
    db.users.update_one(
        {
            "_id": ObjectId(user_id),
        },
        {
            "$push": {
                "favourited_companies": company_name
            }
        }
    )
    return company_name

def delete_favourite_company(user_id: str, company_name: str):
    # remove the comapny name from favourited_companies array
    res = db.users.update_one(
        {
            "_id": ObjectId(user_id),
        },
        {
            "$pull": {
                "favourited_companies": company_name
            }
        }
    )
    return company_name

# ============================================ END KATRINA ============================================


# ===== Job Tracking =====

def job_already_tracked(user_id: str, board_id: str, job: dict):
    """
        Checks if the job is already being tracked
    """
    board = db.boards.find_one(
        { 
            "_id": ObjectId(board_id), 
            "user_id": user_id 
        }
    )
    # TODO: Checking for same title. Not robust
    return any(each_job["title"] == job["title"] for each_job in board["tracked_jobs"])

def add_job(board_id: str, user_id: str, job_to_track: dict) -> dict:
    """
        Adds a job to be tracked
        Parameters:
            - board_id
            - user_id
            - job_to_track
    """
    # TODO: What happens on failure?

    # Additional fields
    job_to_track["current_status"] = "application"
    job_to_track["notes"] = ""
    job_to_track["priority"] = 5
    job_to_track["events"] = []
    # Assign a random ID. TODO: not robust
    job_to_track["job_id"] = "{}-{}".format(board_id, str(uuid.uuid4()))

    if job_already_tracked(user_id, board_id, job_to_track):
        raise InvalidUserInput(description="You're already tracking that job")

    # Push the new job into the board's tracked_jobs list
    db.boards.update_one(
        { 
            "_id": ObjectId(board_id), 
            "user_id": user_id 
        },
        {
            "$push": {
                "tracked_jobs": job_to_track
            }
        }
    )
    return job_to_track["job_id"]

def update_job(user_id, board_id, job_id, updated_job):
    """
        Updates an existing tracked job for a given user's board
    """
    target_board = db.boards.find_one({ 
        "_id": ObjectId(board_id), 
        "user_id": user_id 
    })
    new_jobs = target_board["tracked_jobs"].copy()
    # Find the target job
    target_index = -1
    for job in new_jobs:
        target_index += 1
        if job["job_id"] == job_id:
            break 
    new_jobs[target_index] = updated_job
    db.boards.update_one(
        { 
            "_id": ObjectId(board_id), 
            "user_id": user_id 
        },
        {
            "$set": {
                "tracked_jobs": new_jobs.copy()
            }
        }
    )
    return updated_job

def delete_job(user_id, board_id, job_id):
    """
        Deletes a given job
    """
    target_board = db.boards.update_one({ 
        "_id": ObjectId(board_id), 
        "user_id": user_id 
    }, {
        "$pull": {
            "tracked_jobs": { "job_id": job_id }
        }
    })
    return job_id


# ===== User Analytics =====

def push_stat(board_id: str, stat: dict):
    """
        Pushes a new statistic to the given board
    """
    db.boards.update_one(
        { 
            "_id": ObjectId(board_id)
        },
        {
            "$push": {
                "statistics": stat
            }
        }
    )

def eliminate_stat_duplicates(board_id: str, job_id: str, new_status: str):
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
                "activity":  "resume",       <--- This object should not be stored
                "job_id": "123"
            },
            {
                "timestamp": 4,
                "activity": "interview",
                "job_id": "123"
            },
            {
                "timestamp": 5,
                "activity": "application",   <--- This object should not be stored
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
    board = db.boards.find_one({ "_id": ObjectId(board_id) })
    stats = board["statistics"]

    # Sort timestamps into ascending order
    stats.sort(key=lambda x: x["timestamp"])

    # Clear all duplicate statistics
    latest_stage =  -1
    i = 0
    new_stage = activities_stage[new_status]
    while i < len(stats):
        each_stat = stats[i]
        if each_stat["job_id"] != job_id:
            i += 1
            continue
        curr_stage = activities_stage[each_stat["activity"]]
        if latest_stage < curr_stage and curr_stage <= new_stage:
            latest_stage = curr_stage
            i += 1
        else:
            # Duplicate discovered. Eliminate it from the list
            del stats[i]

    # Replace original stats array
    new_stats = stats.copy()
    db.boards.update_one(
        { "_id": ObjectId(board_id) },
        {
            "$set": {
                "statistics": new_stats
            }
        }
    )
    return new_stats

def fetch_stats(user_id: str, board_id: str):
    """
        Fetches all stats associated with the given board
    """
    target_board = db.boards.find_one(
        {
            "_id": ObjectId(board_id)
        }
    )
    if target_board["user_id"] != user_id:
        raise InvalidUserInput(description="That board doesn't belong to you")
    if not target_board:
        raise InvalidUserInput(description="Board {} wasn't found".format(board_id))
    return target_board["statistics"]

# ===== Utilities =====

def user_exists(email: str):
    """
        Determines whether a user with the given fields already exists
    """
    target_user = db.users.find_one({ "email": email })
    return target_user != None 
