from app.models import db, Question, environment, SCHEMA
from datetime import datetime

def seed_questions():
    question1 = Question(
        owner_id=1,
        title="How to ask a good coding question?",
        body="when I get stuck on a coding problem, I need to ask for help on the Ztack-overflow, so what is a good coding question?",
        category="python",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    question2 = Question(
        owner_id=1,
        title="what can Express router do?",
        body="Could somebody provide one or more of the following things that an Express router can do.",
        category="express",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    question3 = Question(
        owner_id=1,
        title="What kind of scope should you define for the item's model in Sequelize in this scenario",
        body="Scenario: For responses returned from only 2 endpoints in your server, you want to exclude an item's description attribute. The rest of the endpoints that return an item should include that attribute. ",
        category="sql",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    question4 = Question(
        owner_id=2,
        title="What is the main difference between the BOM and the DOM",
        body="I am confused about the differance between BOM and DOM when render the webstite",
        category="html",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    question5 = Question(
        owner_id=3,
        title="What's the difference between asynchronous and synchronous code?",
        body="Could somebody provide one example of an asynchronous function in JavaScript.",
        category="javascript",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    question6 = Question(
        owner_id=4,
        title="What role the 'message queue' plays in the event loop?",
        body="JavaScript uses an event loop model for execution. Describe what role the 'message queue' plays in the event loop.",
        category="javascript",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)

    db.session.commit()



def undo_questions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM questions")

    db.session.commit()
