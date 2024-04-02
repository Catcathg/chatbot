// db.js - Fichier pour gérer les opérations CRUD avec Knex (créer les fonctions d'appel)
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createOrder(date, total) {
  return await knex('orders').insert({ date, total });
}

// Read
async function getAllOrders() {
  return await knex.select().from('orders');
}

async function getOrderById(id) {
  return await knex('orders').where({ id }).first();
}

// Update
async function updateOrder(id, price) {
  return await knex('orders').where({ id }).update({ price });
}

// Delete
async function deletOrder(id) {
  return await knex('orders').where({ id }).del();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deletOrder,
};

// npm install knex sqlite3