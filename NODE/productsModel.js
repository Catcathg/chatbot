// db.js - Fichier pour gérer les opérations CRUD avec Knex (créer les fonctions d'appel)
const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createProduct(name, quantity, price, category_id) {
  return await knex('products').insert({ name, quantity, price, category_id });
}

// Read
async function getAllProducts() {
  return await knex.select().from('products');
}

async function getProductById(id) {
  return await knex('products').where({ id }).first();
}

// Update
async function updateProduct(id, quantity) {
  return await knex('products').where({ id }).update({ quantity });
}

// Delete
async function deletProduct(id) {
  return await knex('products').where({ id }).del();
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deletProduct
};

// npm install knex sqlite3