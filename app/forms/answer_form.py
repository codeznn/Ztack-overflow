from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class AnswerForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(), Length(min=30, max=200000, message="Content must be between 30 and 200000 characters long")])
    # attachment = StringField('title', validators=[DataRequired(), Length(min=1, max=1000, message="attachment must be between 1 and 1000 characters long")])
    # code_snippet = TextAreaField('code_snippet', validators=[DataRequired(), Length(min=10, max=200000, message="CodeSnippet must be between 10 and 200000 characters long")])
