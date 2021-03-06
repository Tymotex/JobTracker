from careerjet_api import CareerjetAPIClient

cj  =  CareerjetAPIClient("en_AU")

result_json = cj.search({
  'location'    : 'sydney',
  'keywords'    : 'software',
  'affid'       : '213e213hd12344552',
  'pagesize'    : 10,
  'page'        : 1, 
  'user_ip'     : '11.22.33.44',
  'url'         : 'http://www.example.com/jobsearch?q=electrical&l=sydney',
  'user_agent'  : 'Mozilla/5.0 (X11; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0'
})

print(result_json)

# Run `pydoc careerjet_api` on the terminal to see documentation. 
# It's pretty minimal, might have to write some web scraping functions
