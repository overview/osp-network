

import os

from osp.citations.hlom.ranking import Ranking
from osp.citations.hlom.utils import prettify_field
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)
ranking = Ranking()


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
            'title':    prettify_field(record.marc.title()),
            'author':   prettify_field(record.marc.author()),
            'count':    record.count,
            'rank':     r['rank'],
            'score':    r['score'],
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

    ranking.reset()
    ranks = ranking.rank()

    return jsonify({'texts': format_ranks(ranks)})


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
