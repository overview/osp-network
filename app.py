

import os

from osp.citations.hlom.ranking import Ranking
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)
ranking = Ranking()


@app.route('/')
def search():
    return render_template('search.html')


@app.route('/rank')
def rank():

    """
    Rank texts.
    """

    ranks = ranking.rank()

    texts = []
    for r in ranks:
        texts.append({
            'rank': r['rank'],
            'count': r['record'].count,
            'score': r['score'],
            'title': r['record'].marc.title(),
            'author': r['record'].marc.author(),
        })

    return jsonify({'texts': texts})


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
