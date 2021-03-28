from JobTracker import app
from JobTracker.api_routes import (
    landing_router,
    auth_router,
    user_router,
    jobs_router,
    job_router,
    stats_router,
    tracker_router,
    company_router
)
from flask_restx import Api, Resource
from flask import Blueprint

# Registering route handler blueprints
app.register_blueprint(landing_router)
app.register_blueprint(auth_router, url_prefix="/api/auth")
app.register_blueprint(user_router, url_prefix="/api/user")
app.register_blueprint(jobs_router, url_prefix="/api/jobs")
app.register_blueprint(job_router, url_prefix="/api/job")
app.register_blueprint(stats_router, url_prefix="/api/stats")
app.register_blueprint(tracker_router, url_prefix="/api/tracker")
app.register_blueprint(company_router, url_prefix="/api/company")
