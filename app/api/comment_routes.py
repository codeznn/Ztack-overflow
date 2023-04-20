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

# create comment of a question(on question_routes)

# update comment of a question
@comment_routes.route("/question/<int:comment_id>", method=["PUT"])
@login_required
def update_comment(comment_id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    edit_comment = Comment_question.query.get(comment_id)
    if not edit_comment:
        return {"errors": "Comment couldn't be found."}, 404

    if edit_comment.user_id != current_user.id:
        return {"errors": "You are not the owner of this comment."}, 403

    if form.validate_on_submit():
        edit_comment.content = form.data["content"]

        db.session.commit()
        return edit_comment.to_dict(), 200
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# delete comment of a question
@comment_routes.route("/<int:comment_id>", method=["DELETE"])
@login_required
def delete_comment(comment_id):
    deleted_comment = Comment_question.query.get(comment_id)

    if not deleted_comment:
        return {"errors": "Comment couldn't be found."}, 404

    if deleted_comment.user_id == current_user.id:
        db.session.delete(deleted_comment)
        db.session.commit()
        return {"messages": "Comment has been deleted successfully!"}, 200
    else:
        return {"errors": "You are not the owner of this Comment."}, 403



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

# create comment of an answer(on answer_routes)

# update comment ofan answer
@comment_routes.route("/answer/<int:comment_id>", method=["PUT"])
@login_required
def update_comment(comment_id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    edit_comment = Comment_answer.query.get(comment_id)
    if not edit_comment:
        return {"errors": "Comment couldn't be found."}, 404

    if edit_comment.user_id != current_user.id:
        return {"errors": "You are not the owner of this comment."}, 403

    if form.validate_on_submit():
        edit_comment.content = form.data["content"]

        db.session.commit()
        return edit_comment.to_dict(), 200
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# delete comment of an answer
@comment_routes.route("/<int:comment_id>", method=["DELETE"])
@login_required
def delete_comment(comment_id):
    deleted_comment = Comment_answer.query.get(comment_id)

    if not deleted_comment:
        return {"errors": "Comment couldn't be found."}, 404

    if deleted_comment.user_id == current_user.id:
        db.session.delete(deleted_comment)
        db.session.commit()
        return {"messages": "Comment has been deleted successfully!"}, 200
    else:
        return {"errors": "You are not the owner of this Comment."}, 403
