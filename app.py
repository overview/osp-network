

import os

from osp.common.config import config
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


@app.route('/')
def search():
    return render_template('search.html')


@app.route('/rank')
def rank():

    """
    TODO: Ranking API.
    """

    return jsonify({'test': True})


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
