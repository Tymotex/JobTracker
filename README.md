# SENG2021 project

This is a web application that scrapes together job postings from major job-hunting platforms and provides automation services for the user to track their application for postings they are interested in.  

### Team AT3K:
- Arthur Wang (z5257096)
- Katrina Ding (z5211336)
- Kaivalya Soman (z5259102)
- Kelly Zhou (z5257986)
- Tim Zhang (z5258971)
Note: All members contributed equally.

## Important information for markers:

Bootstrapped from <a href="https://flatlogic.com/templates/react-material-admin/demo">this open-source project</a> (MIT Licence).

### Links:
- <a href="https://seng2021-at3k.netlify.app">Deployed prototype here</a>

- <a href="https://github.com/Tymotex/JobTracker">Repo linked to the deployed prototype</a>

- <a href="https://github.com/ArthurW404/seng2021_AT3K">Repo to be marked</a>

<hr />

### Clarifications for markers:

- This project was bootstrapped from <a href="https://flatlogic.com/templates/react-material-admin/demo">this open-source project</a> (MIT Licence).
- All the frontend code we have written have been placed inside the `SourceCode_and_Documentation/src/AT3K`. Please ignore every other directory inside `SourceCode_and_Documentation/src` as that was code reused from <a href="https://flatlogic.com/templates/react-material-admin/demo">this project</a> which we only made minor edits to in order to adapt to our needs.

Please look at the frontend directory structure to see where our components are.

## Frontend Directory Structure:

```
client/
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
└── src
    ├── AT3K                      # Where AT3K's files are
    │   ├── components            # Where AT3K's React Components are defined
    │   │   ├── job-boards        # Dashboard workspace page's components
    │   │   ├── job-dashboard     # Dashboard index page's components
    │   │   ├── job-lists         # Job search page components
    │   │   ├── job-details       # Job detail page's components
    │   │   ├── job-map           # Job detail page's embedded map component
    │   │   ├── company-profile   # Company profile page's components
    │   │   ├── profile           # User profile components
    │   │   ├── statistics        # Statistics page components
    │   │   └── settings          # Settings page components
    │   ├── layouts               # Where AT3K's base React Components are defined
    │   │   ├── AT3KLayout.js
    │   │   ├── index.js
    │   │   ├── mainContentStyles.module.scss
    │   │   ├── menuItems.js
    │   │   └── README.md
    │   ├── pages                 # Where AT3K's page components (and routes) are defined
    │   │   ├── 404.js
    │   │   ├── FAQ.js
    │   │   ├── Community.js
    │   │   ├── CompanyProfile.js
    │   │   ├── Home.js
    │   │   ├── JobDashboard.js
    │   │   ├── JobDashboardIndex.js
    │   │   ├── JobDashboardWorkspace.js
    │   │   ├── JobDetails.js
    │   │   ├── JobSearch.js
    │   │   ├── Profile.js
    │   │   ├── ProfileEdit.js
    │   │   ├── RouterList.js     # Where front-end routes are defined
    │   │   ├── Settings.js
    │   │   └── Statistics.js
    │   └── themes                # Where global Material UI styling rules are defined
    │       ├── default.js
    │       └── index.js
    ├── components                # Reused base components (minor edits made by AT3K)
    ├── context
    ├── images
    ├── index.js 
    └── pages                     # Unused base pages (minor edits made by AT3K)
```

## Backend Directory Structure:

```
server
├── JobTracker                      # Main package
│   ├── api_routes/                 # Where routes are defined and handled
│   │   ├── __init__.py            
│   │   ├── auth.py                 # /api/auth routes
│   │   ├── company.py              # /api/company routes
│   │   ├── job.py                  # /api/job routes
│   │   ├── jobs.py                 # /api/jobs routes
│   │   ├── stats.py                # /api/stats
│   │   ├── tracker.py              # /api/tracker
│   │   └── user.py                 # /api/user routes
│   ├── database_ops.py             # Database interface helper functions
│   ├── exceptions/                 # Custom exceptions thrown by the server
│   ├── __init__.py                 # Where the Flask app is instantiated and configured
│   ├── routes.py                   # Where routers are registered to the Flask app 
│   ├── static/                     # Public assets served by Flask
│   ├── templates/                  # HTML files served by Flask (only for testing API routes during development)
│   └── utils/                      # General utilities for debugging, testing, etc.
├── requirements.txt
├── setup.py
└── start.py                        # Basic script for starting the server
```

## Setup Instructions


```
git clone <THIS REPO>
```

Running the frontend development server

```
cd seng2021_at3k/SourceCode_and_Documentation/client

npm install   # Only for first time setup

npm start     # View the locally hosted frontend on http://localhost:3000/
```


Running the flask server
```
cd seng2021_at3k/SourceCode_and_Documentation/server

pip3 install -r requirements.txt    # Only for first time setup

# Resume parser dependencies
# spaCy
python -m spacy download en_core_web_sm

# nltk
python -m nltk.downloader words
python -m nltk.downloader stopwords

python3 start.py
```
