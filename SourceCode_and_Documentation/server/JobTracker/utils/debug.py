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
    printColoured(" * Environment variables in .env", colour="red")
    printColoured(" * Google Client ID:     {}".format(os.getenv("GOOGLE_CLIENT_ID")), colour="red")
    printColoured(" * Google Client Secret: {}".format(os.getenv("GOOGLE_CLIENT_SECRET")), colour="red")
    printColoured(" * MongoDB URI:          {}".format(os.getenv("DB_URI")), colour="red")
    
