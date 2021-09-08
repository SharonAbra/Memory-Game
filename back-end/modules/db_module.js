const env = require('dotenv');
env.config();

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: '5433',
    user : 'postgres',
    password : process.env.POSTGRES_PASSWORD,
    database : 'Memory_Game'
  }
});

const getAllColors = () => {
    return db.select('color_id','color_name').from('colors');
  }

  const getAllAnimals = () => {
    return db.select('id','name').from('animals');
  }


module.exports = {
  getAllColors,
  getAllAnimals
}
