from app import app
from flask import render_template, flash, redirect
from app.forms import QRCodeForm
import qrcode
import io
import base64


@app.route("/", methods=["GET", "POST"])
def index():
    form = QRCodeForm()
    qr_code_data = None
    modal_open = False  # Tracks if the modal should remain open

    if form.validate_on_submit():
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(form.data.data)
        qr.make(fit=True)
        img = qr.make_image(fill="black", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        qr_code_data = base64.b64encode(buffer.read()).decode("utf-8")
        modal_open = True  # Keep modal open after generating QR code

    return render_template(
        "index.html", form=form, qr_code_data=qr_code_data, modal_open=modal_open
    )
