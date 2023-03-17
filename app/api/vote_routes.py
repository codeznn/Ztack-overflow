from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer, Vote_question, Vote_answer
from app.forms import QuestionForm, AnswerForm, VoteForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

vote_routes = Blueprint('votes', __name__)

# get votes of current user for questions
@vote_routes.route("/current/questions")
def get_myvotes_questions():
    votes = Vote_question.query.filter(Vote_question.userId == current_user.id).all()
    return {"Votes": [
        votes.to_dict_with_question() for vote in votes
    ]}, 200

# get votesNum of a question
@vote_routes.route("/question/<int:question_id>")
def get_vote_question(question_id):
    votes = Vote_question.query.filter(Vote_question.question_id == question_id).all()
    total_num = 0
    for vote in votes:
        if vote.up:
            total_num += 1
        if vote.down:
            total_num -= 1
    return {"voteNum": total_num}

# create/delete an up vote for a question
@vote_routes.route("/question/<int:question_id>/up", methods=["POST"])
@login_required
def create_vote_up_question(question_id):
    question = Question.query.get(question_id)
    if question.owner_id == current_user.id:
        return {"errors": "You can not vote your own question!"}, 403
    vote = Vote_question.query.filter(Vote_question.user_id == current_user.id).filter(Vote_question.question_id == question_id).all()

    form = VoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if vote:
        db.session.delete(vote)
        db.session.commit()
        return {"messages": "Vote has been deleted successfully!"}, 200
    else:
        new_vote = Vote_question(
            user_id = current_user.id,
            question_id = question_id,
            up = form.data["is_vote"]
        )

        db.session.add(new_vote)
        db.session.commit()

        return new_vote.to_dict(),201

# create/delete an down vote for a question
@vote_routes.route("/question/<int:question_id>/down", methods=["POST"])
@login_required
def create_vote_down_question(question_id):
    question = Question.query.get(question_id)
    if question.owner_id == current_user.id:
        return {"errors": "You can not vote your own question!"}, 403
    vote = Vote_question.query.filter(Vote_question.user_id == current_user.id).filter(Vote_question.question_id == question_id).all()

    form = VoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if vote:
        db.session.delete(vote)
        db.session.commit()
        return {"messages": "Vote has been deleted successfully!"}, 200
    else:
        new_vote = Vote_question(
            user_id = current_user.id,
            question_id = question_id,
            down = form.data["is_vote"]
        )

        db.session.add(new_vote)
        db.session.commit()

        return new_vote.to_dict(),201


# get votes of current user for answers
@vote_routes.route("/current/answers")
def get_myvotes_answers():
    votes = Vote_answer.query.filter(Vote_answer.userId == current_user.id).all()
    return {"Votes": [
        votes.to_dict_with_answer() for vote in votes
    ]}, 200

# get votesNum of an answer
@vote_routes.route("/answer/<int:answer_id>")
def get_vote_answer(answer_id):
    votes = Vote_answer.query.filter(Vote_answer.answer_id == answer_id).all()
    total_num = 0
    for vote in votes:
        if vote.up:
            total_num += 1
        if vote.down:
            total_num -= 1
    return {"voteNum": total_num}

# create/delete an up vote for a answer
@vote_routes.route("/answer/<int:answer_id>/up", methods=["POST"])
@login_required
def create_vote_up_answer(answer_id):
    print("+++++", answer_id)
    answer = Answer.query.get(answer_id)
    if answer.owner_id == current_user.id:
        return {"errors": "You can not vote your own question!"}, 403
    vote = Vote_answer.query.filter(Vote_answer.user_id == current_user.id).filter(Vote_answer.answer_id == answer_id).all()

    form = VoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not vote:
        new_vote = Vote_answer(
            user_id = current_user.id,
            answer_id = answer_id,
            up = form.data["up"]
        )

        db.session.add(new_vote)
        db.session.commit()

        return new_vote.to_dict(),201

    else:
        if vote[0].up:
            db.session.delete(vote[0])
            db.session.commit()
            return {"messages": "Vote has been deleted successfully!"}, 200
        if vote[0].down:
            vote[0].down = None
            vote[0].up = True
            db.session.commit()
            return vote[0].to_dict(),201

# create/delete an down vote for a answer
@vote_routes.route("/answer/<int:answer_id>/down", methods=["POST"])
@login_required
def create_vote_down_answer(answer_id):
    answer = Answer.query.get(answer_id)
    if answer.owner_id == current_user.id:
        return {"errors": "You can not vote your own question!"}, 403
    vote = Vote_answer.query.filter(Vote_answer.user_id == current_user.id).filter(Vote_answer.answer_id == answer_id).all()

    form = VoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if not vote:
        new_vote = Vote_answer(
            user_id = current_user.id,
            answer_id = answer_id,
            down = form.data["down"]
        )

        db.session.add(new_vote)
        db.session.commit()

        return new_vote.to_dict(),201

    else:
        if vote[0].down:
            db.session.delete(vote[0])
            db.session.commit()
            return {"messages": "Vote has been deleted successfully!"}, 200

        if vote[0].up:
            vote[0].up = None
            vote[0].down = True
            db.session.commit()
            return vote[0].to_dict(),201
