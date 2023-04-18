from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Comment_answer, Comment_question
from app.forms import CommentForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# get comments of current user for questions

# get comments of a question

# create comment of a question

# update comment of a question

# delete comment of a question




# get comments of current user for answers

# get comments of an answer

# create comment of an answer

# update comment ofan answer

# delete comment of an answer
