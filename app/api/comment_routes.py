from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Comment_answer, Comment_question
from app.forms import CommentForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# get comments of current user for questions
@comment_routes.route("/current/questions")
def get_mycomments_questions():
    comments = Comment_question.query.filter(Comment_question.user_id == current_user.id).all()
    return {"Comments": [
        comment.to_dict_with_question() for comment in comments
    ]}, 200

# get comments of a question
@comment_routes.route("/question/<int:question_id>")
def get_comment_question(question_id):
    comments = Comment_question.query.filter(Comment_question.question_id == question_id).all()
    return {"Comments": [
        comment.to_dict() for comment in comments
    ]}, 200

# create comment of a question

# update comment of a question

# delete comment of a question




# get comments of current user for answers
@comment_routes.route("/current/answers")
def get_mycomments_answers():
    comments = Comment_answer.query.filter(Comment_answer.user_id == current_user.id).all()
    return {"Comments": [
        comment.to_dict_with_answer() for comment in comments
    ]}, 200

# get comments of an answer
@comment_routes.route("/answer/<int:answer_id>")
def get_comment_answer(answer_id):
    comments = Comment_answer.query.filter(Comment_answer.answer_id == answer_id).all()
    return {"Comments": [
        comment.to_dict() for comment in comments
    ]}, 200

# create comment of an answer

# update comment ofan answer

# delete comment of an answer
