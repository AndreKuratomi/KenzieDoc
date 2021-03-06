from flask import Flask
import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


def init_app(app: Flask):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = bool(
        os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS'))
    app.config['JSON_SORT_KEYS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['EMAIL_PASSWORD'] = os.environ.get("EMAIL_PASSWORD")
    app.config['EMAIL_ADDRESS'] = os.environ.get("EMAIL_ADDRESS")
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
