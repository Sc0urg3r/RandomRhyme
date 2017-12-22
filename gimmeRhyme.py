import web
import urllib.request
import json
from random import randint

urls = (
    '/', 'index',
    '/random/?', 'random'
)

def getRhymes(word):

    #Gets all rhyming words from api

    url = "http://rhymebrain.com/talk?function=getRhymes&word=" + word
    rhymes = urllib.request.urlopen(url).read().decode()
    return json.loads(rhymes)

def loadRhymes(jsonRhymes):
    returnList = []
    for i in jsonRhymes:
        returnList += [i["word"]]
    return returnList

def main():
    word = input("Please input a word: ")
    rhymeList = loadRhymes(getRhymes(word))
    response = ""
    while response != "stop":
        randIndex = randint(0, len(rhymeList) - 1)
        print(rhymeList[randIndex])
        response = input("Press enter to continue: ")


class index:

    def __init__(self):
        self.render = web.template.render('Templates/')

    def GET(self):
        return self.render.index()

    def POST(self):
        return "post"

class random:

    def __init__(self):
            self.render = web.template.render('Templates/')
    
    def GET(self):
        return self.render.random()

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()


