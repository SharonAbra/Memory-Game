const exp = require('express');
const cors = require('cors');
const env = require('dotenv');
env.config();
const DB = require('./modules/db_module.js');

const app = exp();
app.use(cors());

app.get('/colors', (req,res)=> {
    DB.getAllColors()
    .then(data => {
      res.send(data)
    })
    .catch(e => {
      res.send('Things are not working as expected')
    })
})

app.get('/animals', (req,res)=> {
  DB.getAllAnimals()
  .then(data => {
    res.send(data)
  })
  .catch(e => {
    res.send('Things are not working as expected')
  })
})

app.listen(process.env.PORT, () => {
});