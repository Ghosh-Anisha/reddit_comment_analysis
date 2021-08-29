import praw
from textblob import TextBlob
# VADER can be accessed by the NLTK library.
import nltk
# Download the VADAR tool and access it through the NLTK library.
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys
import requests
from datetime import datetime
from collections import Counter
import time
from dotenv import load_dotenv

load_dotenv()

# create object for VADER sentiment function interaction
sia = SentimentIntensityAnalyzer()

reddit = praw.Reddit(client_id=${client_id}, client_secret=${client_secret}, user_agent=${user_agent})

# Sentiment analysis function for TextBlob tools
def text_blob_sentiment(review, sub_entries_textblob):
    analysis = TextBlob(review)
    if analysis.sentiment.polarity >= 0.0001:
        if analysis.sentiment.polarity > 0:
            sub_entries_textblob['positive'] = sub_entries_textblob['positive'] + 1
            return 'Positive'

    elif analysis.sentiment.polarity <= -0.0001:
        if analysis.sentiment.polarity <= 0:
            sub_entries_textblob['negative'] = sub_entries_textblob['negative'] + analysis.sentiment.polarity*(-1)
            sub_entries_textblob['word'] = sub_entries_textblob['word'] + 1
            return 'Negative'
    else:
        sub_entries_textblob['neutral'] = sub_entries_textblob['neutral'] + 1
        return 'Neutral'
    

# sentiment analysis function for VADER tool
def nltk_sentiment(review, sub_entries_nltk):
    vs = sia.polarity_scores(review)
    if not vs['neg'] > 0.05:
        if vs['pos'] - vs['neg'] > 0:
            sub_entries_nltk['positive'] = sub_entries_nltk['positive'] + 1
            return 'Positive'
        else:
            sub_entries_nltk['neutral'] = sub_entries_nltk['neutral'] + 1
            return 'Neutral'

    elif not vs['pos'] > 0.05:
        if vs['pos'] - vs['neg'] <= 0:
            sub_entries_nltk['negative'] = sub_entries_nltk['negative'] + vs['neg']
            sub_entries_nltk['word'] = sub_entries_nltk['word'] + 1
            return 'Negative'
        else:
            sub_entries_nltk['neutral'] = sub_entries_nltk['neutral'] + 1
            return 'Neutral'
    else:
        sub_entries_nltk['neutral'] = sub_entries_nltk['neutral'] + 1
        return 'Neutral'


# replication of comment section of reddit post
def replies_of(top_level_comment, count_comment, sub_entries_textblob, sub_entries_nltk):
    if len(top_level_comment.replies) == 0:
        count_comment = 0
        return
    else:
        for num, comment in enumerate(top_level_comment.replies):
            try:
                count_comment += 1
                #print('-' * count_comment, comment.body)
                text_blob_sentiment(comment.body, sub_entries_textblob)
                nltk_sentiment(comment.body, sub_entries_nltk)
            except:
                continue
            replies_of(comment, count_comment, sub_entries_textblob,sub_entries_nltk)



def getProfile(name,avg): 
  # initialize variables
  username = str(name)
  print(type(name),name)
  lastaction = 0
  headers = {'User-Agent': 'testbot'}
  curts = int(time.time())
  commentdata = []
  linkdata = []
  timelist = []

  # let people know that it's working
  print(' --- fetching data for user: ',username,' ---')
  print(' ')

  # fetch profile data
  r3 = requests.get('https://www.reddit.com/user/'+username+'/about.json', headers=headers)
  userdata = r3.json()['data']

  # fetch comments
  while True:
    comurl = 'https://api.pushshift.io/reddit/search/comment/?author='+username+'&size=500&before='+str(curts)
    r1 = requests.get(comurl, headers=headers)
    tempdata = r1.json()['data']
    commentdata += tempdata
    try:
        if tempdata[499]:
            curts = tempdata[499]['created_utc']
    except: break

# re-establish current time
  curts = int(time.time())

    # fetch posts/submissions
  while True:
      linkurl = 'https://api.pushshift.io/reddit/search/submission/?author='+username+'&size=500&before='+str(curts)
      r2 = requests.get(linkurl, headers=headers)
      postdata = r2.json()['data']
      linkdata += postdata
      try:
          if postdata[499]:
              curts = postdata[499]['created_utc']
      except: break


  # set last active time
  lastcomment = commentdata[0]['created_utc']
  lastpost = postdata[0]['created_utc']

  if lastcomment > lastpost:
      lastaction = lastcomment
  else: lastaction = lastpost


  # add all subreddits to a list
  # add all timed activities to a list
  subList = []
  for x in commentdata:
      subList.append(x['subreddit'].lower())
      timelist.append(x['created_utc'])

  for x in postdata:
      subList.append(x['subreddit'].lower())
      timelist.append(x['created_utc'])

  # adjust time for offset
  #timelist = [x + offset for x in timelist]

  # and create a set for comparison purposes
  sublistset = set(subList)

  return {'username': str(userdata['name']),
          'creation_date': str(datetime.fromtimestamp(userdata['created_utc'])),
          'last_action': str(datetime.fromtimestamp(lastaction)),
          'verified_email': str(userdata['has_verified_email']),
          'total_comments':  str(len(commentdata)),
          'comment_karma':  str(userdata['comment_karma']),
          'total_links':  str(len(linkdata)),
          'link_karma':  str(userdata['link_karma']),
          'Neg_sent': avg } #negative sentiments in last 1000 comments

   
def main_fun():
    top_posts = reddit.subreddit('AskReddit').top('week', limit=5)
    avg=[]
    users=[]
    for post in top_posts:
        users.append(post.author)

    avg=dict()
    average=0
    karma_link=[]
    karma_comment=[]
    user_profile=[]
    flagged_profiles=[]
    for name in users:
        user = reddit.redditor(name)
        karma_link.append(user.link_karma)
        karma_comment.append(user.comment_karma)

        for comment in user.comments.new():
            #print(comment.body)
            #print('\n')
            sub_entries_textblob = {'negative': 0,'word':0, 'positive' : 0, 'neutral' : 0}
            sub_entries_nltk = {'negative': 0, 'word':0,'positive' : 0, 'neutral' : 0}

                        #print(top_level_comment.body)
            for i in comment.body.split():
                text_blob_sentiment(i, sub_entries_textblob)
                nltk_sentiment(i, sub_entries_nltk)
                #replies_of(top_level_comment,count_comm,sub_entries_textblob,sub_entries_nltk)

            #print('Over all Sentiment of Topic by TextBlob :', sub_entries_textblob)
            #print('Over all Sentiment of Topic by VADER :', sub_entries_nltk)
            average=average+((sub_entries_textblob['negative']+sub_entries_nltk['negative'])/2)
            #print("\n\n\n")
        avg[user] = average
        user_profile.append(getProfile(name,average))

    #def flag():
    dict(sorted(avg.items(), key=lambda item: item[1]))
    #Flagged users
    for i in avg.items():
        if i[1] >= 150:
        flagged_profiles.append(getProfile(str(i[0]),i[1]))
    return flagged_profiles

if __name__ == __main__:
    main()



