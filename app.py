

import os

from flask import Flask


app = Flask(__name__)


@app.route('/')
def index():
    return 'network'


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000))
