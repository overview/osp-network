

import os

from osp.common.config import config
from osp.citations.hlom.utils import prettify_field
from osp.citations.hlom.ranking import Ranking
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


def format_ranks(ranks):

    """
    Construct a list of hydrated texts for the client.

    Args:
        ranks (list): A ranked list of texts.

    Returns:
        dict: The formatted list.
    """

    texts = []
    for r in ranks:

        record = r['record']

        texts.append({
            'id':       record.id,
            'title':    prettify_field(record.marc.title()),
            'author':   prettify_field(record.marc.author()),
            'rank':     r['rank'],
            'count':    record.count,
        })

    return texts


@app.route('/')
def search():
    return render_template('search.html')


@app.route('/rank')
def rank():

    """
    Rank texts.
    """

    ranking = Ranking()

    # Filter state.
    state = request.args.get('state')
    if state: ranking.filter_state(state)

    # Filter institution.
    inst = request.args.get('inst')
    if inst: ranking.filter_institution(inst)

    return jsonify({
        'texts': format_ranks(ranking.rank())
    })


@app.route('/institutions')
def institutions():

    """
    Search institutions.
    """

    q = request.args.get('q')

    # Query Elasticsearch.
    docs = config.es.search('osp', 'institution', body={
        'size': 100,
        'query': {
            'multi_match': {
                'query': q,
                'fields': ['name', 'city'],
                'type': 'phrase_prefix'
            }
        },
        'sort': [{
            'count': {
                'order': 'desc'
            }
        }]
    })

    # Flatten out the results.
    results = []
    for d in docs['hits']['hits']:
        results.append({
            'id':       d['_id'],
            'count':    d['_source']['count'],
            'name':     d['_source']['name'],
            'state':    d['_source']['state'],
            'city':     d['_source']['city'],
        })

    return jsonify({
        'institutions': results
    })


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
