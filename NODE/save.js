// App.js - Utilisation des opérations CRUD avec Knex
// Manipuler (ajout des infos sur les fonctions)

const dbproduct = require('./productsModel');
const dbcategory = require('./categoriesModel');
const dborder = require('./ordersModel');


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  // Create categories
  const categories = [
    {
      name: "Boissons chaudes",
      products: [
        { name: "Matcha", quantity: 100, price: 6 },
        { name: "Caffe latte", quantity: 187, price: 5.5 },
        { name: "Latte Macchiato", quantity: 198, price: 6.5 },
        { name: "Hot Chocolate", quantity: 95, price: 6 },
        { name: "Cappucino", quantity: 225, price: 4.5 },
        { name: "Ristretto", quantity: 246, price: 5 },
      ]
    },
    {
      name: "Boissons froides",
      products: [
        { name: "Iced Brown Sugar ", quantity: 189, price: 6 },
        { name: "Iced Latte", quantity: 148, price: 6 },
        { name: "Iced Cappuccino", quantity: 228, price: 5.5 },
        { name: "Cold Brew Latte", quantity: 147, price: 5.5 },
        { name: "Iced Shaken Espresso ", quantity: 189, price: 4.5 },
        { name: "Iced Matcha Latte", quantity: 137, price: 6 },
      ]
    },
    {
      name: "Sandwichs",
      products: [
        { name: "Egg Tomato Sandwich", quantity: 56, price: 6.5 },
        { name: "Vegetarian Sandwich", quantity: 32, price: 7 },
        { name: "Ham and Cheese Sandwich", quantity: 47, price: 7.5 },
        { name: "Hot Dog", quantity: 47, price: 7.5 },
      ]
    },
    {
      name: "Desserts",
      products: [
        { name: "Brownie", quantity: 31, price: 6 },
        { name: "Cinnamon Roll", quantity: 23, price: 6 },
        { name: "Chocolate Roll", quantity: 87, price: 6 },
        { name: "Ice Cream", quantity: 69, price: 7 },
      ]
    }
  ]

  for (const category of categories) {
    const categoryId = await dbcategory.createCategory(category.name);
    for (const product of category.products) {
      await dbproduct.createProduct(product.name, product.quantity, product.price, categoryId[0]);
    }
  }

  const allCategories = await dbcategory.getAllCategories();
  console.log('Nous vous proposons dans notre carte Starbucks :', allCategories);

  clientOrders = product.name, product.quantity, product.price;

  const allOrders = await dborder.getAllOrders();
  console.log('Voici votre addition de votre commande :', allOrders);
}

main().catch(err => console.error(err));