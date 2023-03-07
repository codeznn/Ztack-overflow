from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Vote_answer
from app.forms import QuestionForm, AnswerForm, VoteForm
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


# upvote/downvote an answer
@answer_routes.route("/<int:answer_id>/votes", methods=["POST"])
@login_required
def vote_answer(answer_id):
    answer = Answer.query.ger(answer_id)
    if answer.owner_id == current_user.id:
        return {"errors": "You can not vote your own answer!"}, 403
    vote = Vote_answer.query.filter(Vote_answer.user_id == current_user.id).filter(Vote_answer.answer_id == answer_id)

    form = VoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if vote:
        if vote.isVote == True and form.data["isVote"] == True:
            db.session.delete(vote)
            db.session.commit()
            return {"messages": "Vote has been deleted successfully!"}, 200
        elif vote.isVote == False and form.data["isVote"] == False:
            db.session.delete(vote)
            db.session.commit()
            return {"messages": "Vote has been deleted successfully!"}, 200
        else:
            vote = Vote_answer(
                isVote = form.data["isVote"]
            )
            db.session.commit()
            return vote.to_dict(), 201
    else:
        new_vote = Vote_answer(
            user_id = current_user.id,
            answer_id = answer_id,
            isVote = form.data["isVote"]
        )

        db.session.add(new_vote)
        db.session.commit()

        return new_vote.to_dict(),201
