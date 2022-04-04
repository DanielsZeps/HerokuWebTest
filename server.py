from random import *
from flask import Flask
from flask import request
from flask import render_template
from flask import *

app = Flask(__name__)

@app.route("/",methods = ['POST', 'GET'])
def root():
    return render_template("index.html")

@app.route("/style")
def style():
    return render_template("style.css")

@app.route("/script1")
def script1():
    return render_template("script/background.js")
@app.route("/script2")
def script2():
    return render_template("script/script.js")
@app.route("/script3")
def script3():
    return render_template("script/onload.js")

@app.route("/textResponse")
def textResponse():
    file = open("text.txt", "r")
    text = file.read()
    file.close()
    return f'{text}'

def information():
    file = open("text.txt", "r")
    text = file.read()
    file.close()
    text = text.split("\n")
    value = {}
    try:
        for x in range(0, len(text)):
            text[x] = text[x].split("|")
            value1 = {}
            for y in range(0, len(text[x])):
                text[x][y] = text[x][y].split("=")
                if text[x][y][0] == "id":
                    info = text[x][y][1]
                else:
                    value1[text[x][y][0]] = text[x][y][1]
            value[info] = value1
        return value
    except:
        return {}

def writeData(value, date = None):
    text = ""
    a = 1
    for x in value:
        if int(date) - int(value[x]["lastTime"]) > 100000:
            a += 1
            continue
        text += "id=" + x
        for y in value[x]:
            text += "|" + y + "=" + value[x][y]
        if a < len(value):
            text += "\n"
            a += 1
    file = open("text.txt", "w")
    file.write(text)
    file.close()

@app.route("/user/<id> <lastTime>")
def profile(id, lastTime):
    value = information()
    if value != None:
        try:
            value[id]["lastTime"] = lastTime
        except:
            value[id] = {}
            value[id]["lastTime"] = lastTime
        writeData(value, lastTime)
    return f's'

@app.route("/user/<id> <index> <value1>")
def userData(id, index, value1):
    value = information()
    lastTime = value[id]["lastTime"]
    if value != None:
        try:
            value[id][index] = value1
        except:
            value[id] = {}
            value[id][index] = value1
        print(value)
        writeData(value, lastTime)
    return f'd'

@app.route("/code")
def randomCode():
    return f'{str(randint(0, pow(10, 10)))}'

@app.route("/color")
def randomColor():
    return f'{"rgb(" + str(randint(0, 255)) + "," + str(randint(0, 255)) + "," + str(randint(0, 255)) + ")"}'

if __name__ == "__main__":
    app.run(debug="true")
