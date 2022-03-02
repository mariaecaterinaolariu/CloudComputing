import requests
import tweepy
import json
import time

start = time.time()

with open('tokens.json') as file:
    data = json.load(file)

API_Key = data["API_Key"]

API_Key_Secret = data["API_Key_Secret"]

Bearer_Token = data["Bearer_Token"]

#API 1 call
#calling on the API that generates a random number which determines the hashtag we use for the third api call
url2 = "http://www.randomnumberapi.com/api/v1.0/randomnumber"

body = requests.get(url2).json()
number = body[0] % 20 #modulo 20 because the second api returns only top 20 
print(number)

#API 2 call
#calling on the API that generates the top 20 hashtags currently trending on twitter:
url = "https://api.ritekit.com/v1/search/trending?green=1&latin=1"

body = requests.get(url).json()
contor = 0
thetag = ''

for tags in body.get('tags'):
    tag = tags.get('tag')
    contor+=1
    if contor == number :
        thetag+=tag
    #print(tag)

print(thetag)

#API no. 3. Main Purpose: Get 10 most recent tweets from 
#twitter part

auth = tweepy.OAuth2BearerHandler(Bearer_Token)
api = tweepy.API(auth)

client = tweepy.Client(Bearer_Token, API_Key, API_Key_Secret)
resp = client.search_recent_tweets(thetag)

'''The Response returned by Client methods is a collections.namedtuple, with data, includes, errors, and meta fields, corresponding with the fields in responses from Twitters API.'''
body = resp.data
#print(body)

jsonfile ={'data':[]}
formattedtext=[]

for i in body:
    #print (i.text)
    formattedtext.append({'tweet': i.text})

latency = time.time() - start
jsonfile = {'data':formattedtext, 'metrics':latency}

metrica1 = {thetag: latency}

with open("metrics.json", 'r+') as f:
    file_data = json.load(f)
    a = file_data["metrics"].append(metrica1)
    f.seek(0)
    # a.append(metrica1)
    json.dump(file_data, f, indent=4)


with open("tweets.json", "w", encoding='utf-8') as outfile:
    json.dump(jsonfile, outfile, ensure_ascii=False, indent=4)



#https://docs.tweepy.org/en/stable/client.html#tweepy.Client.search_recent_tweets


