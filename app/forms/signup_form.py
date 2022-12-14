from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.html5 import URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length, InputRequired
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=6, max=255, message="Username must be between 6 to 255 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(max=255, message="Email must be less than 255 characters"), Email()])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=255, message="Password must be between 6 to 255 characters")])
    # url = URLField('url', validators=[InputRequired()])
