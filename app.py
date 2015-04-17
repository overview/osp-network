

import os

from flask import Flask


app = Flask(__name__)


@app.route('/test')
def test():
    return 'test'


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000))
