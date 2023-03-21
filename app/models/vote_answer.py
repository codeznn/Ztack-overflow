from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vote_answer(db.Model):
    __tablename__ = "vote_answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')), nullable=False)
    up = db.Column(db.Boolean, nullable=True)
    down = db.Column(db.Boolean, nullable=True)

# relationship attributes
    user = db.relationship("User", back_populates="vote_answers")
    answer = db.relationship("Answer", back_populates='vote_answers')


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'answerId': self.answer_id,
            'up': self.up,
            'down': self.down,
        }

    def to_dict_with_answer(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'Answer': {
                'id': self.answer.id,
                'ownerId': self.answer.owner_id,
                'content': self.answer.content,
                'codeSnippet': self.answer.codeSnippet,
                'createdAt': self.answer.created_at,
                'updateAt': self.answer.updated_at,
            },
            'up': self.up,
            'down': self.down,
        }
