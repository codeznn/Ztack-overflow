from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Comment_answer
from app.forms import QuestionForm, AnswerForm, CommentForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

answer_routes = Blueprint('answers', __name__)

# get answers of current user
@answer_routes.route("/current")
def get_my_answers():
    answers = Answer.query.filter(Answer.owner_id == current_user.id).all()

    return {"Answers": [
        answer.to_dict_with_question() for answer in answers
    ]}, 200

# get one answer by answerId
@answer_routes.route("/<int:answer_id>")
def get_one_answers(answer_id):
    answer = Answer.query.get(answer_id)

    if answer:
        return answer.to_dict_with_user()
    else:
        return {"error": "Answer couldn't be found", "statusCode": 404}

# update an answer
@answer_routes.route("/<int:answer_id>", methods=["PUT"])
@login_required
def update_answer(answer_id):
    form = AnswerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    edit_answer = Answer.query.get(answer_id)

    if not edit_answer:
        return {"errors": "Answer couldn't be found."}, 404

    if edit_answer.owner_id != current_user.id:
        return {"errors": "You are not the owner of this answer."}, 403

    if form.validate_on_submit():
        # print(form.data["content"])
        edit_answer.content = form.data["content"]
        edit_answer.created_at = datetime.now()
        edit_answer.updated_at = datetime.now()

        db.session.commit()
        return edit_answer.to_dict_with_user(), 200
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# delete an answer
@answer_routes.route("/<int:answer_id>", methods=["DELETE"])
@login_required
def delete_answer(answer_id):
    deleted_answer = Answer.query.get(answer_id)

    if not delete_answer:
        return {"errors": "Answer couldn't be found."}, 404

    if deleted_answer.owner_id == current_user.id:
        db.session.delete(deleted_answer)
        db.session.commit()
        return {"messages": "Answer has been deleted successfully!"}, 200
    else:
        return {"errors": "You are not the owner of this answer."}, 403

# create a comment of one answer
@answer_routes.route("/<int:answer_id>/comments", methods=["POST"])
@login_required
def create_comment(answer_id):
    answer = Answer.query.get(answer_id)
    if not answer:
        return {"errors": "Answer couldn't be found."}, 404

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    existed_comments = Comment_answer.query.filter(Comment_answer.answer_id == answer_id).all()
    if existed_comments:
        for comment in existed_comments:
            if comment.user_id == current_user.id:
                return {"errors": ["error: You have already left a comment for this answer!"]}, 400

    if form.validate_on_submit():
        data = Comment_answer(
            user_id = current_user.id,
            answer_id = answer_id,
            content = form.data["content"],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(data)
        db.session.commit()
        return data.to_dict_with_user(), 201
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
