const restify = require('restify');

function ClientCards() {
  this._client = restify.createJsonClient({ url: 'http://localhost:3001' });
}

ClientCards.prototype.auth = function (card, callback) {
  this._client.post('/cards/auth', card, callback);
};

module.exports = () => ClientCards;
