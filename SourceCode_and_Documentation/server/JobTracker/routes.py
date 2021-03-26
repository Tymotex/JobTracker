from JobTracker import app
from JobTracker.api_routes import (
    test_router,
    jobs_router
)
from flask_restplus import Api, Resource
from flask import Blueprint


# blueprint = Blueprint("jobs", __name__)
# api = Api(blueprint, doc="/doc")


# @api.route("/test")
# class Test(Resource):
#     def get(self):
#         return {}


# app.register_blueprint(blueprint, url_prefix="api/jobs")

# Registering route handler blueprints
# app.register_blueprint(test_router)
app.register_blueprint(jobs_router, url_prefix="/api/jobs")



