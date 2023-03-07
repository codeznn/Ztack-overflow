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
    vote_answers = db.relationship("Vote_answer", back_populates='answer', cascade="all, delete")


#####################################


    def get_votes(self):
        vote_num = 0

        for vote in self.vote_answers:
            if vote.is_vote == True:
                vote_num += 1
            elif vote.is_vote == False:
                vote_num -= 1
        return vote_num

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

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'questionId': self.question_id,
            'content': self.content,
            "votesNum": self.get_votes(),
            'attachment': self.attachment,
            'codeSnippet': self.code_snippet,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
            'User': {
                'id': self.user.id,
                'userName': self.user.username,
                'profileImage': self.user.profilepic_url
            }
        }

    def to_dict_with_question(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'questionId': self.question_id,
            'content': self.content,
            'attachment': self.attachment,
            'codeSnippet': self.code_snippet,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
            'Question': {
                'id': self.question.id,
                'ownerId': self.question.owner_id,
                'title': self.question.title,
                'body': self.question.body,
                'category': self.question.category,
                'createdAt': self.question.created_at,
                'updateAt': self.question.updated_at,
            }
    }
