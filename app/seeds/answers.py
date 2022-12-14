from app.models import db, Answer, environment, SCHEMA
from datetime import datetime

def seed_answers():
    answer1 = Answer(
        owner_id=2,
        question_id=1,
        content="The best coding question from the selection is the most specific to the problem that you are trying to solve. Referring to the recursion problem will also help others give the best answer by using that example to show a difficult concept, such as approaching a recursive algorithm, in action.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer2 = Answer(
        owner_id=3,
        question_id=1,
        content="Write down everything you do understand about the problem;Write down everything you don't understand about the problem;Write down a specific question;Eliminate unnecessary words from the question.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer3 = Answer(
        owner_id=4,
        question_id=2,
        content="An Express router can do anything an Express application can do except listen for requests on the network. Also, route handlers defined on an Express router don't have an exact URL until they are connected to an Express application.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer4 = Answer(
        owner_id=5,
        question_id=2,
        content="Connect to other Express routers; Define route handlers;Bind middleware.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer5 = Answer(
        owner_id=2,
        question_id=3,
        content="A default scope is automatically applied to queries on the model, while a non-default scope needs to be explicitly called to be applied. If a user should able to see the description attribute of an item most of the time but should not be able to see it a few times, then a non-default scope should be applied, so that the item's data sent to the client will the description attribute most of the time by default unless explicitly applied by the server for a few situations.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer6 = Answer(
        owner_id=5,
        question_id=3,
        content="non-default scope",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer7 = Answer(
        owner_id=1,
        question_id=4,
        content="The BOM allows you to communicate with the browser in JS, while the DOM allows you to manipulate HTML elements in JS.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer8 = Answer(
        owner_id=1,
        question_id=5,
        content="In synchronous code, the commands excute one after the other in order, which means 'slow' function will block excution of further functions. In asynchronous code, the commands are not guaranteed to occur one after the other; an asynchronous function will not block execution of further functions.One application of asynchronicity is the ability to run so called 'background tasks' -- this could be useful say in a banking application where we would like to 'timeout' a user, after a specific away time.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    answer9 = Answer(
        owner_id=1,
        question_id=6,
        content="The message queue(first in first out)is used to track events that have occured but cannot be processed yet because the stack is already busy processing other commands. Once the stack is available(call stack become empty). the 'message' or event handler that is at the front of the queue will be moved to the stack for evaluation.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )


    db.session.add(answer1)
    db.session.add(answer2)
    db.session.add(answer3)
    db.session.add(answer4)
    db.session.add(answer5)
    db.session.add(answer6)
    db.session.add(answer7)
    db.session.add(answer8)
    db.session.add(answer9)

    db.session.commit()



def undo_answers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()
