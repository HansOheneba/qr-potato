import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "F61428669617AAD31ADB3343B3156"