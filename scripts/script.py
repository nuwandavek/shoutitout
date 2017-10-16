import json


json_data = open('/Users/nuwanda/Documents/Projects/shoutitout/republic.json','r')
#d = json_data.readlines()
d=json.load(json_data)
print d

