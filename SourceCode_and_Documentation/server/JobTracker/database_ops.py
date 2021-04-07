"""
A suite of database operations that abstract over the specific DBMS used and the driver
library or ODM used to interface with that DBMS.
"""
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

def add_user(username: str, email: str, password: str) -> str:
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
        "resume": {},
        "statistics": [],
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

# ===== Board Management =====

def create_board(user_id: str, name: str, description: str) -> str: 
    """
        Creates a new document for the 'boards' collection.
        Returns the ID of the new document
    """
    # TODO: What happens on failure?
    inserted_document = db.boards.insert_one({
        "user_id": user_id,
        "name": name,
        "description": description,
        "tracked_jobs": []
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

def edit_board(user_id: str, board_id: str, name: str, description: str):
    """
        Updates an existing board's details


    """
    # Use db.boards.update_one() to update an existing board

# Note: Tim did this. Needed to set the tracked jobs
def set_tracked_jobs(user_id: str, board_id: str, tracked_jobs):
    """
        Updates the tracked jobs of the given board
    """
    printColoured(user_id)
    printColoured(board_id)
    printColoured(tracked_jobs)
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
    # Use db.boards.delete_one

# ============================================ END KAI ============================================


# ============================================ START KATRINA ============================================
# TODO: KATRINA

# use the pymongo docs if lost: https://pymongo.readthedocs.io/en/stable/

def save_favourite_company(user_id: str, company_name: str):  # TODO: more params needed?
    """

    """
    # Use db.users.update_one

    # Finding the user, then pushing an object into the favourited_companies field
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

# ============================================ END KATRINA ============================================


# ===== Job Tracking =====

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
    # Assign a random ID. TODO: not robust
    job_to_track["job_id"] = "{}-{}".format(board_id, str(uuid.uuid4()))

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

# ===== User Analytics =====

def push_stat(user_id: str, stat: dict):
    """
        Pushes a new statistic to the user document
    """
    db.users.update_one(
        { 
            "_id": ObjectId(user_id)
        },
        {
            "$push": {
                "statistics": stat
            }
        }
    )

# ============================================ START KELLY ============================================

# This function should be working. Just need to call it
def fetch_stats(user_id: str):
    """
        Fetches all stats for a user
    """
    target_user = db.users.find_one(
        {
            "_id": ObjectId(user_id)
        }
    )
    if not target_user:
        raise InvalidUserInput(description="User {} wasn't found".format(user_id))
    return target_user["statistics"]

# ============================================ END KELLY ============================================


# ===== Utilities =====

def user_exists(email: str):
    """
        Determines whether a user with the given fields already exists
    """
    target_user = db.users.find_one({ "email": email })
    return target_user != None 
