from .db import db, environment, SCHEMA, add_prefix_for_prod
import random

class Question(db.Model):
    __tablename__ = "questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String(200000), nullable=False)
    category = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="questions")
    answers = db.relationship("Answer", back_populates='question', cascade="all, delete")

#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'body': self.body,
            'category': self.category,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }

    def to_dict_all_questions(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'body': self.body,
            'category': self.category,
            'userName': self.user.username,
            'profileImg': self.user.profilepic_url,
            'votesNum': 0,
            'answersNum': len(self.answers),
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }

    def to_dict_my_questions(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'body': self.body,
            'category': self.category,
            'votesNum': 0,
            'answersNum': len(self.answers),
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }

    def to_dict_single_question(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'title': self.title,
            'body': self.body,
            'category': self.category,
            'userName': self.user.username,
            'profileImg': self.user.profilepic_url,
            'votesNum': 0,
            'answersNum': len(self.answers),
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }
