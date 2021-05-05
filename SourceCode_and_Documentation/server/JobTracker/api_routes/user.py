"""
Routes for fetching job postings
"""
from os.path import isfile
import requests
import json
from JobTracker.utils.debug import pretty_print_dict
from flask import (
    send_file,
    Blueprint,
    render_template,
    request,
    jsonify
)
from JobTracker.database_ops import (
    get_boards,
    create_board,
    set_user_resume_fields,
    get_board,
    set_tracked_jobs,
    delete_board,
    edit_board,
    get_favourite_company,
    save_favourite_company,
    delete_favourite_company,
    get_user_profile,
    set_user_profile
)
from JobTracker.exceptions import InvalidUserInput
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

RESUME_DIR_PATH = "JobTracker/static/resumes"

user_router = Blueprint("user", __name__)
user_api = Api(
    user_router, 
    doc="/doc",
    title="User Job Profile",
    description="Routes for managing the user's job profile and settings",
    default="/api/user",
    default_label="User job profile management",
)

@user_api.route('/profile')
class UserJobProfile(Resource):
    def get(self):
        """
            Fetch the user's profile information
            Parameters (TO BE FINALISED):
                - username
                - email
                - LinkedIn link
                - GitHub link
                - Resume link
        """
        printColoured(" * Retrieving user's profile info", colour="yellow")
        user_id = request.args.get("user_id")
        # TODO: INSERT GET INFO FUNCTION HERE
        user = get_user_profile(user_id)
        return jsonify(user)

    def post(self):
        """
            Create a user profile (should this be a request or should)
        """
        params = request.get_json()
        return set_user_profile(
            params['user_id'],
            params['username'],
            params['email'],
            params['password'],
            params['experience'],
            params['education'],
            params['name'],
            params['phone'],
            params['skills'],
            params['image_url']
        )
 
@user_api.route('/boards')
class UserBoardManagement(Resource):
    def get(self):
        """
            Retrieves a list of the user's boards        
            Parameters:
                - user_id
        """
        printColoured(" * Retrieving all boards for a user", colour="yellow")
        user_id = request.args.get("user_id")
        boards = get_boards(user_id)
        return boards
    
    def post(self):
        """
            Parameters:
                - user_id
                - name
                - description
                - image_url
        """
        printColoured(" * Creating a new board", colour="yellow")
        request_params = dict(request.get_json())
        user_id = request_params["user_id"]
        name = request_params["name"]
        description = request_params["description"]
        image_url = request_params["image_url"] if "image_url" in request_params else ""
        board_id = create_board(user_id, name, description, image_url)
        return {
            "board_id": board_id
        }

@user_api.route("/board")
class UserBoard(Resource):
    def get(self):
        """
            Retrieves a specific board
            Parameters: 
                - user_id
                - board_id
                - image_url
        """
        printColoured(" * Retrieving specific board", colour="yellow")
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        board = get_board(user_id, board_id)
        return board

    def post(self):
        """
            Updates the tracked jobs of a board

            POST /api/user/board

            Parameters:
                - user_id
                - board_id
                - tracked_jobs
        """
        printColoured(" * Setting tracked jobs for board", colour="yellow")
        request_params = dict(request.get_json())
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        tracked_jobs = request_params["tracked_jobs"]
        return set_tracked_jobs(user_id, board_id, tracked_jobs)

    def put(self):
        """
            Sets new fields for the board of an existing user.

            Parameters:
                - user_id
                - board_id
                - new_name
                - new_description
                - new_image_url
        """
        printColoured(" * Editing board values", colour="yellow")

        request_params = dict(request.get_json())
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        new_name = request_params["new_name"]
        new_description = request_params["new_description"]
        new_image_url = request_params["new_image_url"]
        return edit_board(user_id, board_id, new_name, new_description, new_image_url)

    def delete(self):
        """
            Deletes user profile.

            Parameters:
                - user_id
                - board_id
        """
        # Dont know what this does, just copied from other functions.
        printColoured(" * Deleting a board", colour="yellow")

        request_params = dict(request.get_json())
        user_id = request_params["user_id"]
        board_id = request_params["board_id"]
        return delete_board(user_id, board_id)

@user_api.route("/resume")
class UserResume(Resource):
    def get(self):
        """
            Retrieves the user's resume, if it exists, and sends it back
        """        
        printColoured(" * Retrieving resume pdf", colour="yellow")
        request_params = dict(request.args)
        try:
            user_id = request_params["user_id"]
            resume = send_file("static/resumes/{}.pdf".format(user_id))
            return resume
        except Exception as err:
            raise InvalidUserInput(description="Failed to send resume: {}".format(err))

    def post(self):
        """
            Receives the user's uploaded pdf and stores it locally on the file system
        """
        request_params = dict(request.form)
        printColoured(" * Uploading resume pdf", colour="yellow")
        pretty_print_dict(request_params)
        user_id = request_params["user_id"]
        
        if "resume" not in request.files:
            raise InvalidUserInput(description="No resume was found. Did you upload it?")
        resume = request.files["resume"]
        printColoured(resume, colour="yellow")

        resume_url = "{}/{}.pdf".format(RESUME_DIR_PATH, user_id)
        resume.save(resume_url)
        return resume_url

@user_api.route("/company")
class UserFavouriteCompany(Resource):
    def get(self):
        """
            Get the user's favourite companies
            Parameters:
                - user_id
            Returns:
                ["canva", "Atlassian", ... ]
        """
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        printColoured(" * Retrieving all favourite companies for a user", colour="yellow")
        return get_favourite_company(user_id)

    def post(self):
        """
            Save a new favourite company for a user
            Parameters:
                - user_id
                - company_name
                - ...more?
        """
        # Call save_favourite_company in database_ops.py
        request_params = dict(request.get_json())
        user_id = request_params["user_id"]
        company_name = request_params["company_name"]

        # check duplicate
        companies = get_favourite_company(user_id)
        if company_name in companies:  
            raise InvalidUserInput(description="'{}' has already been favourited".format(company_name))

        printColoured(" * Saving company {} for a user". format(company_name), colour="yellow")
        return save_favourite_company(user_id, company_name)
        

    def delete(self):
        """
            Delete a saved favourite company for a user
            Parameters:
                - user_id
                - company_name
                - ...more?
        """
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        company_name = request_params["company_name"]

        # check existence 
        companies = get_favourite_company(user_id)
        if company_name not in companies:  
            raise InvalidUserInput(description="Company '{}' is not in your favourited companies list.".format(company_name))

        printColoured(" * Unsaving company {} for a user". format(company_name), colour="yellow")
        return delete_favourite_company(user_id, company_name)

@user_api.route("/parse_resume")
class UserResumeParser(Resource):
    def post(self):
        """
            Parses the resume of the user with the given ID. Stores the extracted fields 
            under the user document

            Parameters:
                - user_id
        """
        printColoured(" * Parsing resume")
        request_params = dict(request.get_json())
        user_id = request_params["user_id"]

        path_to_resume = "{}/{}.pdf".format(RESUME_DIR_PATH, user_id)
        
        # If the file exists, proceed with resume parser API call
        if isfile(path_to_resume):
            BASE_URL = "https://seng2021-at3k.netlify.app"    # TODO: Shouldn't be hardcoded. 
            try:
                resume_url = "{}/api/user/resume?user_id={}".format(BASE_URL, user_id)
                return jsonify(parse_resume(user_id, resume_url))
            except Exception as err:
                raise err
        else:
            raise InvalidUserInput(description="You have not uploaded a resume to be parsed yet")

def parse_resume(user_id: str, resume_url: str) -> dict:
    """

    """
    url = "https://api.promptapi.com/resume_parser/url?url={}".format(resume_url)
    payload = {}
    headers= {
        "apikey": "F3RgNKjRAEXU1LoJh574J2RPwtxVKIrn"
    }
    response = requests.request("GET", url, headers=headers, data = payload)
    result = response.text
    set_user_resume_fields(user_id, result)
    return result
