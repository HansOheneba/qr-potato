from app import app
from flask import render_template, flash, redirect
from app.forms import LoginForm

@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Hans'}
    return render_template('index.html', title='Home', user=user)