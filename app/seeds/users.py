from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='Demo', email='demo@gmail.com', password='demo_user', profilepic_url="https://media.istockphoto.com/id/948490226/vector/user-avatar-teacher-a-teacher-in-a-suit-with-glasses.jpg?s=170667a&w=0&k=20&c=OQYVXlP0xiwAOvHUUZcYR3YG3YAiimUNPdXnnLQySg0=")
    user2 = User(
        username='Yasha', email='ysy@gmail.com', password='password', profilepic_url="https://i.pinimg.com/736x/73/7a/a8/737aa886c165f3bd1f41b36b5aa3565e.jpg")
    user3 = User(
        username='Andrea', email='aw@gmail.com', password='password', profilepic_url="https://i.pinimg.com/736x/7e/92/df/7e92df16f7bd582a25ac3f0146ba2b6c.jpg")
    user4 = User(
        username='Fiona', email='nc@gmail.com', password='password', profilepic_url="https://i.pinimg.com/564x/3d/c5/c6/3dc5c6932934ded993e23264e330dc91.jpg")
    user5 = User(
        username='Cici', email='ccc@gmail.com', password='password', profilepic_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_OP03enjb1sjXZo8CWpNSHfWUCxZNwmW1sD_jKGdsBscNg9iB5B6nv3dGEhw482wPE&usqp=CAU")

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
