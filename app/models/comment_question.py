from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment_question(db.Model):
    __tablename__ = "comment_questions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=True)
    content = db.Column(db.String(200000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

# relationship attributes
    user = db.relationship("User", back_populates="comment_questions")
    question = db.relationship("Question", back_populates='comment_questions')


#####################################

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'questionId': self.question_id,
            'content': self.content,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
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
            'content': self.content,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'content': self.content,
            'createdAt': self.created_at,
            'updateAt': self.updated_at,
            'User': {
                'id': self.user.id,
                'userName': self.user.username,
                'profileImage': self.user.profilepic_url
            }
        }
