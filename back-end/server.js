const exp = require('express');
const cors = require('cors');
const env = require('dotenv');
env.config();
const DB = require('./modules/db_module.js');
// const bp = require('body-parser');

const app = exp();
app.use(cors());

// app.use(bp.urlencoded({extended:false}))
// app.use(bp.json());

app.get('/', (req,res)=> {
    DB.getAllColors()
    .then(data => {
      res.send(data)
    })
    .catch(e => {
      res.send('Things are not working as expected')
    })
})

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT)
});