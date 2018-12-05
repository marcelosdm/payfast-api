const app = require('./config/custom-express')();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
