import os
import requests

from flask import Flask, session, redirect, render_template, request
from flask_socketio import SocketIO, emit
from flask_session import Session

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
socketio = SocketIO(app)

username = None
channel = None

@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "POST":
        session.clear()
    if session.get("username") is None:
        return render_template("index.html",username = None)
    else:
        if session.get("channel") is None:
            return render_template("channels.html", username = session["username"])
        else:
            return redirect(url_for('channel', channelid = session["channel"]))

@app.route("/channels", methods = ["GET", "POST"])
def listChan():
    if session.get("username") is None:
        session["username"] = request.form.get("username")
    session["channel"] = None
    return render_template("channels.html", username = session.get("username"))


@app.route("/channels/<int:channelid>", methods = ["GET", "POST"])
def channel(channelid):
    session["channel"] = channelid
    return render_template("messages.html", channelid = channelid, username = session.get("username"))

@socketio.on("submit message")
def msg(data):
    message = data.message
    user = data.user
    emit("add message", {"message":data,"username":user},broadcast=True)
