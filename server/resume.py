from pyresparser import ResumeParser
from pprint import pprint

data = ResumeParser("./resumes/resume2.pdf").get_extracted_data()
pprint(data, width=4)
