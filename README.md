# SENG2021 project

This is a web app that scrapes together job postings from major job-hunting platforms like Indeed, Seek, etc. and lets the user track their application for postings they are interested in. 

Bootstrapped from <a href="https://flatlogic.com/templates/react-material-admin/demo">this open-source project</a> (MIT Licence).

## Setup Instructions


```
git clone <THIS REPO>
```

Running the frontend development server

```
cd seng2021_at3k/SourceCode_and_Documentation/client

npm install   # Only for first time setup

npm start
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

