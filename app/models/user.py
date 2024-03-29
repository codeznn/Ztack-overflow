from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profilepic_url = db.Column(db.String(1000), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

# relationship attributes
    questions = db.relationship("Question", back_populates="user", cascade="all, delete")
    answers = db.relationship("Answer", back_populates="user", cascade="all, delete")
    vote_questions = db.relationship("Vote_question", back_populates="user", cascade="all, delete")
    vote_answers = db.relationship("Vote_answer", back_populates="user", cascade="all, delete")
    comment_answers = db.relationship("Comment_answer", back_populates="user", cascade="all, delete")
    comment_questions = db.relationship("Comment_question", back_populates="user", cascade="all, delete")
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImage': self.profilepic_url
        }
