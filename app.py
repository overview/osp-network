

import os

from osp.common.config import config
from osp.citations.hlom.network import GephiNetwork
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


# Load the network.
npath = os.path.join(app.root_path, 'hlom.gexf')
graph = GephiNetwork.from_gexf(npath)


@app.route('/')
def network():
    return render_template('network.html')


@app.route('/search')
def search():

    """
    Run a fulltext search against the index.
    """

    q = request.args.get('q')

    # Search all fields when query is provided.
    if q:
        query = {
            'multi_match': {
                'query': q,
                'fields': ['_all'],
                'type': 'phrase_prefix'
            }
        }

    # If the query is empty, load all documents.
    else:
        query = {
            'match_all': {}
        }

    results = config.es.search('network', 'node', body={
        'query': query,
        'size': 100,
        'sort': [{
            'degree': {
                'order': 'desc'
            }
        }],
        'highlight': {
            'fields': {
                'title': {
                    'number_of_fragments': 1,
                    'fragment_size': 1000
                },
                'author': {
                    'number_of_fragments': 1,
                    'fragment_size': 1000
                },
                'publisher': {
                    'number_of_fragments': 1,
                    'fragment_size': 1000
                },
            }
        }
    })

    return jsonify(results)


@app.route('/neighbors')
def neighbors():

    """
    Given all nodes adjacent to a node.
    """

    cn = request.args.get('cn')

    return jsonify({
        'neighbors': graph.neighbors(cn)[:100]
    })


@app.route('/node')
def node():
    pass


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
