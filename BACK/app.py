from flask import Flask
from flask_cors import CORS
from controllers.word_search_controller import sopa_bp

app = Flask(__name__)
CORS(app)

# Registrar el Blueprint
app.register_blueprint(sopa_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 