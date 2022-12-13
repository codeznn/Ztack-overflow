from .db import db, environment, SCHEMA, add_prefix_for_prod

class Answer(db.Model):
    __tablename__ = "answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    content = db.Column(db.String(200000), nullable=False)
    attachment = db.Column(db.String(1000), nullable=True)
    code_snippet = db.Column(db.String(200000), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="answers")
    question = db.relationship("Question", back_populates='answers')
    votes = db.relationship("Vote", back_populates='answer', cascade="all, delete")


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'questionId': self.question_id,
            'content': self.content,
            'attachment': self.attachment,
            'codeSnippet': self.code_snippet,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }
