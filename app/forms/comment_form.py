from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(), Length(min=1, max=1000, message="Content must be between 30 and 200000 characters long")])
