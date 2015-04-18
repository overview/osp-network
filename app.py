

import os

from osp.common.config import config
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


@app.route('/')
def network():
    return render_template('network.html')


@app.route('/search')
def search():

    """
    Run a fulltext search against the index.
    """

    q = request.args.get('q')

    results = config.es.search('network', 'node', body={
        'size': 100,
        'query': {
            'multi_match': {
                'query': q,
                'fields': ['_all'],
                'type': 'phrase_prefix'
            }
        }
    })

    return jsonify(results)


@app.route('/neighbors')
def neighbors():
    pass


@app.route('/node')
def node():
    pass


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
