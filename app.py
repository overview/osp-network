

import os

from osp.citations.hlom.ranking import Ranking
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
            'count':    record.count,
            'rank':     r['rank'],
            'score':    r['score'],
            'author':   record.marc.author(),
            'title':    record.marc.title(),
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

    ranks = ranking.rank()
    return jsonify({'texts': format_ranks(ranks)})


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
