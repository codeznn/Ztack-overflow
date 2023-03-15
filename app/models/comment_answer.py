from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment_answer(db.Model):
    __tablename__ = "comment_answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')), nullable=True)
    content = db.Column(db.String(200000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="comment_answers")
    answer = db.relationship("Answer", back_populates='comment_answers')


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'answerId': self.answer_id,
            'content': self.content,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }
