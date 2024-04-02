const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    let exists = await knex.schema.hasTable('orders');
    if (!exists) {
      await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.timestamp('date').defaultTo(knex.fn.now()); 
        table.decimal('total'); 
      });
      console.log('La table "orders" a été créée avec succès.');
    } else {
      console.log('La table "orders" existe déjà.');
    }

    exists = await knex.schema.hasTable('products');
    if (!exists) {
      await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name'); 
        table.integer('quantity');
        table.integer('price');
        table.integer('category_id');
      });
      console.log('La table "products" a été créée avec succès.');
    } else {
      console.log('La table "products" existe déjà.');
    }

    exists = await knex.schema.hasTable('categories');
    if (!exists) {
      await knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name'); 
      });
      console.log('La table "categories" a été créée avec succès.');
    } else {
      console.log('La table "categories" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();
