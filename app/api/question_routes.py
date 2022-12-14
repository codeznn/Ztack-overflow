from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Vote
from app.forms import QuestionForm, AnswerForm, VoteForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)

# @question_routes.route("/")
