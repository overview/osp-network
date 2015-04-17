

import os

from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def network():
    return render_template('network.html')


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000))
