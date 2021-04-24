"""
Package consisting of all the API endpoints.
"""

from JobTracker.api_routes.tests import landing_router
from JobTracker.api_routes.jobs import jobs_api, jobs_router
from JobTracker.api_routes.auth import auth_api, auth_router
from JobTracker.api_routes.user import user_api, user_router
from JobTracker.api_routes.users import users_api, users_router
from JobTracker.api_routes.job import job_api, job_router
from JobTracker.api_routes.stats import stats_api, stats_router
from JobTracker.api_routes.tracker import tracker_api, tracker_router
from JobTracker.api_routes.company import company_api, company_router
