const soap = require('soap');

function CorreiosSOAPClient() {
  this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

module.exports = () => CorreiosSOAPClient;

CorreiosSOAPClient.prototype.calculaPrazo = function (args, callback) {
  soap.createClient(this._url, (error, client) => {
    console.log('SOAP client created');

    client.CalcPrazo(args, callback);
  });
};
