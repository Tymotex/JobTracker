"""
    A suite of global functions for debugging
"""
import json
import os
from JobTracker.utils.colourisation import printColoured


def pretty_print_dict(d, indent=1):
    """ Pretty print a dictionary """
    for key, value in d.items():
        printColoured('\t' * indent + str(key) + ":", colour="yellow")
        if isinstance(value, dict):
            pretty_print_dict(value, indent+1)
        else:
            printColoured('\t' * (indent+1) + str(value), colour="blue")


def print_pretty_json(struct, colour="yellow"):
    """ Pretty print a JSON-serialisable data structure """
    printColoured(json.dumps(struct, indent=4, sort_keys=True), colour=colour)


def print_env_variables():
    """
        Lists out critical environment variables present in this project
    """
    printColoured(" * === Environment variables in .env ===", colour="red")
    printColoured(" * Google Client ID:      {}".format(os.getenv("GOOGLE_CLIENT_ID")), colour="red")
    printColoured(" * Google Client Secret:  {}".format(os.getenv("GOOGLE_CLIENT_SECRET")), colour="red")
    printColoured(" * MongoDB URI:           {}".format(os.getenv("DB_URI")), colour="red")
    printColoured(" * Environment type:      {}".format(os.getenv("ENV_TYPE")), colour="red")
    
    # These MUST match the URIs saved on https://console.cloud.google.com/ for this project
    printColoured(" * === Google Auth URIs ===", colour="red")
    printColoured(" * DEV_REQUEST_REDIRECT_URI:   {}".format(os.getenv("DEV_REQUEST_REDIRECT_URI")), colour="red")
    printColoured(" * PROD_REQUEST_REDIRECT_URI:  {}".format(os.getenv("PROD_REQUEST_REDIRECT_URI")), colour="red")
