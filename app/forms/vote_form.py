from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class VoteForm(FlaskForm):
    is_vote = BooleanField('isVote', validators=[DataRequired()])
