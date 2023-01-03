from app.models import db, Vote, environment, SCHEMA

def seed_votes():
    vote1 = Vote(
        user_id=1,
        answer_id=1,
        is_vote=True
    )
    vote2 = Vote(
        user_id=3,
        answer_id=1,
        is_vote=True
    )
    vote3 = Vote(
        user_id=4,
        answer_id=1,
        is_vote=True
    )
    vote4 = Vote(
        user_id=2,
        answer_id=2,
        is_vote=True
    )
    vote5 = Vote(
        user_id=4,
        answer_id=2,
        is_vote=True
    )
    vote6 = Vote(
        user_id=5,
        answer_id=3,
        is_vote=True
    )
    vote7 = Vote(
        user_id=1,
        answer_id=4,
        is_vote=True
    )
    vote8 = Vote(
        user_id=5,
        answer_id=5,
        is_vote=True
    )
    vote9 = Vote(
        user_id=2,
        answer_id=6,
        is_vote=True
    )

    db.session.add(vote1)
    db.session.add(vote2)
    db.session.add(vote3)
    db.session.add(vote4)
    db.session.add(vote5)
    db.session.add(vote6)
    db.session.add(vote7)
    db.session.add(vote8)
    db.session.add(vote9)

    db.session.commit()



def undo_votes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM votes")

    db.session.commit()
