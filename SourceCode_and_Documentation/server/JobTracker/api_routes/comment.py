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
    get_comments,
    post_comment,
    edit_comment,
    delete_comment,
    vote_comment
)
from JobTracker.exceptions import InvalidUserInput
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

comment_router = Blueprint("comment", __name__)
comment_api = Api(
    comment_router, 
    doc="/doc",
    title="Comments",
    description="Routes for comments",
    default="/api/comment",
    default_label="Comments",
)

@comment_api.route("/")
class Comment(Resource):
    def get(self):
        """
            Gets the comments SENT TO a given user
            Parameters:
                - user_id
        """
        printColoured(" * Fetching list of all comments for a user", colour="yellow")
        request_params = dict(request.args)
        user_id = request_params["user_id"]
        return get_comments(user_id)
        
    def post(self):
        """
            Parameters:
                - sender_user_id   
                - receiver_user_id
                - comment
        """
        printColoured(" * Posting a comment", colour="yellow")
        request_params = dict(request.get_json())
        sender_user_id = request_params["sender_user_id"]
        receiver_user_id = request_params["receiver_user_id"]
        comment = request_params["comment"]
        post_comment(
            sender_user_id,
            receiver_user_id,
            comment
        )
        return "TODO: successful request data"

    def put(self):
        """
            Sets a new comment for an existing comment document

            Parameters:
                - comment_id
                - new_comment
        """
        printColoured(" * Updating a comment", colour="yellow")
        request_params = dict(request.get_json())
        comment_id = request_params["comment_id"]
        new_comment = request_params["new_comment"]
        edit_comment(comment_id, new_comment)
        return new_comment 

    def delete(self):
        """
            Deletes a comment.

            Parameters:
                - comment_id
        """
        printColoured(" * Deleting a comment", colour="yellow")
        request_params = dict(request.get_json())
        comment_id = request_params["comment_id"]
        delete_comment(comment_id)
        return comment_id

@comment_api.route("/vote")
class CommentVote(Resource):
    def post(self):
        """
            Upvotes or downvotes a given comment.

            Parameters:
                - user_id            (the ID of the user attempting to vote the comment)
                - comment_id
                - increment_amount   (negative values indicate decrement)
        """
        printColoured(" * Voting a comment", colour="yellow")
        request_params = dict(request.get_json())
        # user_id = request_params["user_id"]
        comment_id = request_params["comment_id"]
        increment_amount = request_params["increment_amount"]

        # TODO: Check if the user is authorised to vote this comment`
        vote_comment(comment_id, increment_amount)

        return 
