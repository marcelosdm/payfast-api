function PaymentDAO(connection) {
  this._connection = connection;
}

PaymentDAO.prototype.save = function (payment, callback) {
  this._connection.query('INSERT INTO payments SET ?', payment, callback);
};

PaymentDAO.prototype.findById = function (id, callback) {
  this._connection.query('select * from payments where id = ?', [id], callback);
};

module.exports = () => PaymentDAO;
