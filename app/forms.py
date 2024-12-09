# app/forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL, Optional

class QRCodeForm(FlaskForm):
    data = StringField(
        "Provide the URL to generate a unique QR code for easy sharing.",
        validators=[
            DataRequired(message="This field cannot be empty."),
            # Optional validator for either text or URL validation
            Optional(),
        ],
    )
    submit = SubmitField('Generate')
