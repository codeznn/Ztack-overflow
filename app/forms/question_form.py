from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=10, max=255, message="Title must be between 10 and 255 characters long")])
    body = TextAreaField('body', validators=[DataRequired(), Length(min=30, max=200000, message="Body must be between 10 and 200000 characters long")])
    # category = StringField('category', validators=[DataRequired(), Length(min=1, max=255, message="Category must be between 1 and 255 characters long")])
