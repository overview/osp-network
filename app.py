

import os

from osp.common.config import config
from osp.citations.hlom.utils import prettify_field
from osp.citations.hlom.ranking import Ranking
from flask import Flask, render_template, request, jsonify
from flask.ext.cache import Cache
from functools import lru_cache


app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'redis'})


@cache.memoize(86400)
def rank(keywords=None, state=None, institution=None):

    """
    Pull text rankings.

    Args:
        keywords (str)
        state (str)
        institution (int)

    Returns:
        list: A ranked list of texts.
    """

    ranking = Ranking()

    # Apply filters.
    if keywords: ranking.filter_keywords(keywords)
    if state: ranking.filter_state(state)
    if institution: ranking.filter_institution(institution)

    results = ranking.rank()

    texts = []
    for r in results['ranks']:

        record = r['record']

        texts.append({
            'id':       record.id,
            'title':    prettify_field(record.marc.title()),
            'author':   prettify_field(record.marc.author()),
            'rank':     r['rank'],
            'count':    record.count,
        })

    return {
        'count': results['count'],
        'texts': texts
    }


@app.route('/')
def search():
    return render_template('search.html')


@app.route('/rank')
def rank_api():

    """
    Rank texts.
    """

    texts = rank(
        request.args.get('keywords'),
        request.args.get('state'),
        request.args.get('inst')
    )

    return jsonify(texts)


@app.route('/institutions')
def inst_api():

    """
    Search institutions.
    """

    q = request.args.get('q')

    # Match `name`, when a query is provided.
    if q:
        query = {
            'multi_match': {
                'query': q,
                'type': 'phrase_prefix',
                'fields': ['name', 'city']
            }
        }

    # If the query is empty, load everything.
    else: query = {'match_all': {}}

    # Query Elasticsearch.
    docs = config.es.search('osp', 'institution', body={
        'size': 100,
        'query': query,
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

    return jsonify({'institutions': results})


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
