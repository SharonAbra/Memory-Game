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

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false}
//   }
// });

const getAllColors = () => {
    return db.select('id','name').from('colors').whereIn('id', [1,2,3]);
  }

  const getAllAnimals = () => {
    return db.select('id','name', 'url').from('animals');
  }


module.exports = {
  getAllColors,
  getAllAnimals
}
