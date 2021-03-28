# SENG2021 project

This is a web app that scrapes together job postings from major job-hunting platforms like Indeed, Monster, etc. and provides automation services for the user to track their application for postings they are interested in.  

### Team AT3K:
- Arthur Wang (z5257096)
- Katrina Ding (z5211336)
- Kaivalya Soman (z5259102)
- Kelly Zhou (z5257986)
- Tim Zhang (z5258971)


## Important information for markers:

Bootstrapped from <a href="https://flatlogic.com/templates/react-material-admin/demo">this open-source project</a> (MIT Licence).

### Links:
- <a href="https://seng2021-at3k.netlify.app">Deployed prototype here</a>

- <a href="https://github.com/Tymotex/JobTracker">Repo linked to the deployed prototype</a>

- <a href="https://github.com/ArthurW404/seng2021_AT3K">Repo to be marked</a>



<hr />

### Clarifications:

- This project was bootstrapped from <a href="https://flatlogic.com/templates/react-material-admin/demo">this open-source project</a> (MIT Licence).
- All the frontend code we have written have been placed inside the `SourceCode_and_Documentation/src/AT3K`. Please ignore every other directory inside `SourceCode_and_Documentation/src` as that was code reused from <a href="https://flatlogic.com/templates/react-material-admin/demo">this project</a> which we only made minor edits to in order to adapt to our needs.

## Frontend Directory Structure

```
client/
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
└── src
    ├── AT3K                   # Where AT3K's files are
    │   ├── components         # Where AT3K's React Components are defined
    │   │   ├── job-boards
    │   │   ├── job-lists
    │   │   ├── job-map
    │   │   ├── job-details
    │   │   ├── company-profile
    │   │   ├── menus
    │   │   ├── modals
    │   │   └── settings
    │   ├── layouts            # Where AT3K's base React Components are defined
    │   │   ├── AT3KLayout.js
    │   │   ├── index.js
    │   │   ├── mainContentStyles.module.scss
    │   │   ├── menuItems.js
    │   │   └── README.md
    │   ├── pages              # Where AT3K's page components (and routes) are defined
    │   │   ├── 404.js
    │   │   ├── FAQ.js
    │   │   ├── Home.js
    │   │   ├── JobDashboard.js
    │   │   ├── JobDetails.js
    │   │   ├── JobSearch.js
    │   │   ├── CompanyProfile.js
    │   │   ├── RouterList.js
    │   │   ├── Settings.js
    │   │   └── Statistics.js
    │   └── themes             # Where global Material UI styling rules are defined
    │       ├── default.js
    │       └── index.js
    ├── components       # Reused base components (minor edits made by AT3K)
    ├── context
    ├── images
    ├── index.js 
    └── pages            # Unused base pages (not written by AT3K)
```

## Backend Directory Structure:

```
server
├── JobTracker                      # Main package
│   ├── api_routes/                 # Where routes are defined and handled
│   │   ├── __init__.py
│   │   ├── jobs.py                 # /job routes
│   │   ├── tests.py                # / and /test  routes
│   │   └── tracker.py              # Routes for job tracking
│   ├── database_ops.py             # Database interface helper functions
│   ├── exceptions/                 # Custom exceptions thrown by the server
│   │   ├── http_error_handler.py
│   │   ├── __init__.py
│   │   └── input_exceptions.py
│   ├── __init__.py                 # Where the Flask app is instantiated and configured
│   ├── models/                     # Where database schemas are defined
│   ├── routes.py                   # Where routers are registered to the Flask app 
│   ├── static/                     # Public assets served by Flask
│   │   ├── images
│   │   └── styles
│   ├── templates/                  # HTML files served by Flask (only for testing API routes during development)
│   │   └── landing.html
│   └── utils/                      # General utilities
│       ├── colourisation.py
│       ├── input_validator.py
│       └── token.py
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

python3 start.py
```

## Routes:

```
GET   /                # Test page
GET   /jobs            # TODO: Returns a list of job postings fetched from major career platform APIs
GET   /user/jobs       # TODO: Returns a list of job postings saved by the user
    - Params: 
    - sorting_strategy
    - num_postings
POST  /users/jobs      # TODO: Save a job posting

# TODO: Think of more routes that are required (eg. auth)

```
