from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class VoteForm(FlaskForm):
    up = BooleanField('up', validators=[DataRequired()])
    down = BooleanField('up', validators=[DataRequired()])
