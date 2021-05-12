#!/bin/sh

# TODO: run source?

pip3 install -r requirements.txt

# spaCy
python -m spacy download en_core_web_sm

# nltk
python -m nltk.downloader words
python -m nltk.downloader stopwords
