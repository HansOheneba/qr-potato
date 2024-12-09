from flask import render_template, request, jsonify
from app import app
from app.forms import QRCodeForm
import qrcode
import io
import base64


@app.route("/", methods=["GET"])
def index():
    form = QRCodeForm()
    return render_template("index.html", form=form)


@app.route("/generate", methods=["POST"])
def generate_qr():
    form = QRCodeForm()
    if form.validate_on_submit():
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(form.data.data)
        qr.make(fit=True)
        img = qr.make_image(fill="black", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        qr_code_data = base64.b64encode(buffer.read()).decode("utf-8")
        return jsonify({"success": True, "qr_code_data": qr_code_data})
    return jsonify({"success": False, "errors": form.errors})
