import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--subreddit', required=True)

args = parser.parse_args()
subname = args.subreddit

print(subname)
