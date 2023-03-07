from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vote_answer(db.Model):
    __tablename__ = "vote_answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')), nullable=True)
    is_vote = db.Column(db.Boolean, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="vote_answers")
    answer = db.relationship("Answer", back_populates='vote_answers')


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'answerId': self.answer_id,
            'isVote': self.is_vote,
        }
