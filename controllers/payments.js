module.exports = (app) => {
  app.get('/payments', (req, res) => {
    console.log('Requisição de teste foi recebida');
    res.send('ok');
  });
};
