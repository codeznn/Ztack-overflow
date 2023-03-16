from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vote_question(db.Model):
    __tablename__ = "vote_questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=True)
    up = db.Column(db.Boolean, nullable=False)
    down = db.Column(db.Boolean, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="vote_questions")
    question = db.relationship("Question", back_populates='vote_questions')


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'questionId': self.question_id,
            'up': self.up,
            'down': self.down,
        }

    def to_dict_with_question(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'Question': {
                'id': self.question.id,
                'ownerId': self.question.owner_id,
                'title': self.question.title,
                'body': self.question.body,
                'category': self.question.category,
                'createdAt': self.question.created_at,
                'updateAt': self.question.updated_at,
            },
            'up': self.up,
            'down': self.down,
        }
