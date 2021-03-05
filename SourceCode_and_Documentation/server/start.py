"""
A utility script for starting the API server.
"""
from JobTracker import app
from JobTracker import db

if __name__ == "__main__":
    app.run(debug=True)  
