from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Question, User, Answer
from app.forms import QuestionForm, AnswerForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)

# get all questions
@question_routes.route("/all")
def get_all_questions():
    questions = Question.query.all()
    return {
        "Questions":[
            question.to_dict_all_questions() for question in questions
        ]
    }

# get top questions sorted by created time
@question_routes.route("/top")
def get_top_questions():
    questions = Question.query.order_by(Question.created_at.desc()).all()
    print("======in questions_routes-topquestions:", questions)
    return {
        "Questions":[
            question.to_dict_all_questions() for question in questions
        ]
    }

# get questions search by keywords
@question_routes.route("/search/<keyword>")
def get_search_questions(keyword):
    questions = Question.query.filter(Question.title.ilike(f"%{keyword}%")).all()
    return { "Questions":[
            question.to_dict_all_questions() for question in questions] }

# get questions of currentUser
@question_routes.route("/current")
@login_required
def get_my_questions():
    questions = Question.query.filter(Question.owner_id == current_user.id).all()
    return {
        "Questions":[
            question.to_dict_my_questions() for question in questions
        ]
    }

# get one question
@question_routes.route("/<int:question_id>")
def get_one_question(question_id):
    question = Question.query.get(question_id)
    # answers = Answer.query.filter(Answer.question_id == question_id).all()

    if question:
        return question.to_dict_single_question()
    else:
        return {"error": "Question couldn't be found", "statusCode": 404}

# create a new question
@question_routes.route("", methods=["POST"])
@login_required
def create_question():
    form = QuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = Question(
            owner_id = current_user.id,
            title = form.data["title"],
            body = form.data["body"],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(data)
        db.session.commit()

        return data.to_dict(), 201

    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# update a question
@question_routes.route("/<int:question_id>", methods=["PUT"])
@login_required
def update_question(question_id):
    form = QuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("============in quetion_routes-update:")

    edit_question = Question.query.get(question_id)

    if not edit_question:
        return {"errors": "Question couldn't be found."}, 404

    if edit_question.owner_id != current_user.id:
        return {"errors": "You are not the owner of this question."}, 403

    if form.validate_on_submit():
        edit_question.title = form.data["title"]
        edit_question.body = form.data["body"]

        db.session.commit()
        return edit_question.to_dict(), 200
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# delete a question
@question_routes.route("/<int:question_id>", methods=["DELETE"])
@login_required
def delete_question(question_id):
    deleted_question = Question.query.get(question_id)

    if deleted_question:
        if deleted_question.owner_id == current_user.id:
            db.session.delete(deleted_question)
            db.session.commit()

            return {"messages": "Question has been deleted successfully!"}, 200
        else:
            return {"errors": "You are not the owner of this question."}, 403
    else:
        return {"errors": "Question couldn't be found."}, 404

# get answers of one question
@question_routes.route("/<int:question_id>/answers")
def get_question_answers(question_id):
    question = Question.query.get(question_id)
    if not question:
        return {"errors": "Question couldn't be found."}, 404

    answers = Answer.query.filter(Answer.question_id == question_id).all()

    return {"Answers": [answer.to_dict_with_user() for answer in answers]}, 200



# create an answer of one question
@question_routes.route("/<int:question_id>/answers", methods=["POST"])
@login_required
def create_answer(question_id):
    question = Question.query.get(question_id)
    if not question:
        return {"errors": "Question couldn't be found."}, 404

    form = AnswerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    existed_answers = Answer.query.filter(Answer.question_id == question_id).all()
    if existed_answers:
        for answer in existed_answers:
            if answer.owner_id == current_user.id:
                return {"errors": ["error: You have already left an answer for this question!"]}, 400

    if form.validate_on_submit():
        data = Answer(
            owner_id = current_user.id,
            question_id = question_id,
            content = form.data["content"],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(data)
        db.session.commit()
        return data.to_dict_with_user(), 201
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
