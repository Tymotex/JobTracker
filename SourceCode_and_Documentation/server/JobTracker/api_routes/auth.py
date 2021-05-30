"""
Routes for handling user authentication

- login
- register
- googlelogin
"""
import os
import json
import requests
from oauthlib.oauth2 import WebApplicationClient
from flask import (
    Blueprint,
    render_template,
    request,
    jsonify,
    redirect
)
from JobTracker.database_ops import (
    add_user,
    login_user
)
from JobTracker.exceptions import (
    InvalidUserInput
)
from JobTracker.utils.colourisation import printColoured
from flask_restx import Resource, Api, fields

# Blueprint definition
auth_router = Blueprint("auth", __name__)
auth_api = Api(
    auth_router,
    doc="/doc",
    title="Authentication",
    description="Routes for authentication",
    default="/api/auth",
    default_label="Authentication",
)

# Extracting environment variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)

@auth_api.route('/register')
class AuthenticationRegister(Resource):
    def post(self):
        printColoured(" * Registering a new user", colour="yellow")
        request_params = dict(request.form)
        try:
            username = request_params["username"]
            email = request_params["email"]
            password = request_params["password"]
            user_id = add_user(
                username, 
                email, 
                password, 
                "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            ) 
            return {
                "user_id": user_id,
                "token": "EMPTY",
            }
        except Exception as err:
            printColoured(err, colour="red")
            raise err

@auth_api.route('/login')
class AuthenticationLogin(Resource):
    def post(self):
        printColoured(" * Logging in a user", colour="yellow")
        request_params = dict(request.form)
        email = request_params["email"]
        password = request_params["password"]
        user_id = login_user(email, password)
        return {
            "user_id": user_id,
            "token": "EMPTY",
        }

# ===== Google Authentication =====
# Source: https://realpython.com/using-flask-login-for-user-management-with-flask/

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@auth_router.route("/googlelogin")
def login_handler():
    printColoured(" * Attempting Google login", colour="yellow")
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=os.getenv("DEV_REQUEST_REDIRECT_URI"),
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@auth_router.route("/googlelogin/callback")
def login_callback_handler():
    printColoured(" * Entering Google login callback", colour="yellow")
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=os.getenv("DEV_REQUEST_REDIRECT_URI"),
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    printColoured(" * Parsing tokens: {}".format(token_response), colour="yellow")

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)

    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        # unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # Register the user, or log them in
    # Workaround for Google auth: the callback in the Flask server redirects back
    # to the homepage and embeds the token and id in the URL like this:
    #     /home/user_id/token
    # The token and ID are extracted and removed out of the URL and saved to the
    # client's cookies
    try:
        printColoured("TRYING TO SIGN THEM UP", colour="yellow")
        new_user_id = add_user(users_name, users_email, "asdfasdf", picture)  # FIXME: Temporary password
        # FIXME: No token
        return redirect("http://localhost:3000/home/{}/{}".format(new_user_id, "EMPTY TOKEN"))
    except Exception as err:
        printColoured(err, color="red")
        printColoured("FAILED. ARE THEY EXISTING? {}".format(
            users_email), colour="yellow")
        existing_user_id = login_user(users_email, "asdfasdf")
        printColoured(picture)
        # FIXME: No token
        return redirect("http://localhost:3000/home/{}/{}".format(existing_user_id, "EMPTY TOKEN"))
