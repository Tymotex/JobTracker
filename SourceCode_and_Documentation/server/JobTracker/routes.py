from JobTracker import app
from JobTracker.api_routes import (
    test_router
)

# Registering route handler blueprints
app.register_blueprint(test_router)
app.register_blueprint(test_router, url_prefix="/jobs")
