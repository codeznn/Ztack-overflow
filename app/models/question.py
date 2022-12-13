from .db import db, environment, SCHEMA, add_prefix_for_prod

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
    user = db.relationship("User", back_populates="quesions")
    answers = db.relationship("Answer", back_populates='question', cascade="all, delete")

#####################################
    # def get_avgstars(self):
    #     if len(self.reviews)>0:
    #         avg=sum(d.stars for d in self.reviews)/ len(self.reviews)
    #         return round(avg,1)
    #     else:
    #         return 0.00

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

    # def to_dict_search(self):
    #     return {
    #         'id': self.id,
    #         'category': self.category,
    #         'name': self.name,
    #         'description': self.description,
    #         'price': self.price,
    #         'stock': self.stock,
    #         'sellerId': self.seller_id,
    #         'previewImage': self.images[0].url,
    #         'avgRating': self.get_avgstars(),
    #         'numReviews': len(self.reviews),
    #         'storeName': self.user.username
    #     }
