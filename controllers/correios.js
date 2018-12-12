module.exports = (app) => {
  app.post('/correios/calculo-prazo', (req, res) => {
    const deliveryData = req.body;

    const correiosSOAPClient = new app.services.correiosSOAPClient();
    correiosSOAPClient.calculaPrazo(deliveryData, (error, result) => {
      if (error) {
        res.status(500).send(error);
      }
      console.log('the deadline was generated');
      res.json(result);
    });
  });
};
