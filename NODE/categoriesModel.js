// db.js - Fichier pour gérer les opérations CRUD avec Knex (créer les fonctions d'appel)

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createCategory(name) {
  return await knex('categories').insert({ name });
}

// Read
async function getAllCategories() {
  return await knex.select().from('categories');
}

async function getCategoryById(id) {
  return await knex('categories').where({ id }).first();
}

// Update
async function updateCategory(id, name) {
  return await knex('categories').where({ id }).update({ name });
}

// Delete
async function deletCategory(id) {
  return await knex('categories').where({ id }).del();
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deletCategory,
};

// npm install knex sqlite3