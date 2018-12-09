module.exports = (app) => {
  app.get('/payments', (req, res) => {
    console.log('Test request was received');
    res.send('ok');
  });

  app.delete('/payments/payment/:id', (req, res) => {
    const payment = {};
    const { id } = req.params.id;

    payment.id = id;
    payment.status = 'CANCELED';

    const connection = app.parse.connectionFactory();
    const paymentDAO = new app.parse.PaymentDAO(connection);

    paymentDAO.delete(payment);
  });

  app.put('/payments/payment/:id', (req, res) => {
    const payment = {};
    const { id } = req.params.id;

    payment.id = id;
    payment.status = 'CONFIRMED';

    const connection = app.parse.connectionFactory();
    const paymentDAO = new app.parse.PaymentDAO(connection);

    paymentDAO.update(payment, (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(204).send(payment);
    });
  });

  app.post('/payments/payment', (req, res) => {
    req.assert('pay_method', 'Pay method is required').notEmpty();
    req
      .assert('value', 'You must provide a value')
      .notEmpty()
      .isFloat();

    const errors = req.validationErrors();

    if (errors) {
      console.log('Found validation erros');
      res.status(400).send(errors);
      return;
    }

    const payment = req.body;
    console.log('Processing a new payment request');

    payment.status = 'CREATED';
    payment.date = new Date();

    const connection = app.parse.connectionFactory();
    const paymentDAO = new app.parse.PaymentDAO(connection);

    paymentDAO.save(payment, (error, result) => {
      if (error) {
        console.log(`Failed to send to DB. ${error}`);
        res.status(500).send(error);
      } else {
        console.log('Created payment');

        res.location(`/payments/payment/${result.insertId}`);
        res.status(201).json(payment);
      }
    });

    res.send(payment);
  });
};
