const env = require('dotenv');
env.config();

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false}
  }
});

const getAllClothes = () => {
  return db.select('id','name', 'url').from('clothes');
}

const getAllAnimals = () => {
  return db.select('id','name', 'url').from('animals');
}

const getAllKitchen = () => {
  return db.select('id','name', 'url').from('kitchen');
}

const getAllMusic = () => {
  return db.select('id','name', 'url').from('music');
}

const getAllHome = () => {
  return db.select('id','name', 'url').from('home');
}

const getAllJobs = () => {
  return db.select('id','name', 'url').from('jobs');
}

module.exports = {
  getAllClothes,
  getAllAnimals,
  getAllKitchen,
  getAllMusic,
  getAllHome,
  getAllJobs
}
