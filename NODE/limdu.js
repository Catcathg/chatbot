var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const dbproduct = require('./productsModel');
const dbcategory = require('./categoriesModel');
const dborder = require('./ordersModel');

(async function () {
    const categories = await dbcategory.getAllCategories();
    console.log(categories)
    const products = await dbproduct.getAllProducts();
    //console.log(products)
    const orders = await dborder.getAllOrders();
    console.log(orders)

    var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
    });

    var WordExtractor = function (input, features) {
        input.split(" ").forEach(function (word) {
            features[word] = 1;
        });
    };

    var intentClassifierCategory = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifierCategory.trainBatch([
        { input: "Boisson chaude", output: "Boissons chaudes" },
        { input: "J'aimerai une boisson chaude", output: "Boissons chaudes" },
        { input: "Je veux une boisson chaude", output: "Boissons chaudes" },
        { input: "Je veux boire une boisson chaude", output: "Boissons chaudes" },
        { input: "Une boisson chaude", output: "Boissons chaudes" },
        { input: "Je veux des boissons chaudes", output: "Boissons chaudes" },
        { input: "J'aimerai une boisson froide", output: "Boissons froides" },
        { input: "Je veux boire boisson froide", output: "Boissons froides" },
        { input: "Boisson froide", output: "Boissons froides" },
        { input: "Je veux boire une boisson fraîche", output: "Boissons froides" },
        { input: "Je veux une boisson froide", output: "Boissons froides" },
        { input: "Sandwichs", output: "Sandwichs" },
        { input: "J'aimerai un sandwich", output: "Sandwichs" },
        { input: "Je veux manger un sandwich", output: "Sandwichs" },
        { input: "Je veux un sandwich", output: "Sandwichs" },
        { input: "J'ai envie d'un Sandwich", output: "Sandwichs" },
        { input: "J'aimerai un dessert", output: "Desserts" },
        { input: "J'aimerai dessert", output: "Desserts" },
        { input: "Je veux un dessert", output: "Desserts" },
        { input: "Desserts", output: "Desserts" },
        { input: "J'ai bien envie d'un petit dessert", output: "Desserts" },
        { input: "Je veux bien un dessert", output: "Desserts" },
        { input: "J'aimerai bien un dessert", output: "Desserts" },
    ]);

    var intentClassifierProduct = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifierProduct.trainBatch([
        { input: "Je veux un matcha", output: "Matcha" },
        { input: "Je veux un caffe latte", output: "Caffe Latte" },
        { input: "Je veux un latte machiatto", output: "Latte Macchiato" },
        { input: "Je veux un hot", output: "Hot Chocolate" },
        { input: "Je veux un cappucinno", output: "Cappucino" },
        { input: "Je veux un ristreto", output: "Ristretto" },
        { input: "Je veux un brown sugar", output: "Iced Brown Sugar" },
        { input: "Je veux un iced latte", output: "Iced Latte" },
        { input: "Je veux un iced cappuccino", output: "Iced Cappuccino" },
        { input: "Je veux un brew latte", output: "Cold Brew Latte" },
        { input: "Je veux un shaken espresso", output: "Iced Shaken Espresso" },
        { input: "Je veux un espresso", output: "Iced Shaken Espresso" },
        { input: "Je veux un matcha latte", output: "Iced Matcha Latte" },
        { input: "Je veux un egg tomato", output: "Egg Tomato Sandwich" },
        { input: "Je veux un vegeterian", output: "Vegetarian Sandwich" },
        { input: "Je veux un ham cheese", output: "Ham and Cheese Sandwich" },
        { input: "Je veux un hot dog", output: "Hot Dog" },
        { input: "Je veux un brownie", output: "Brownie" },
        { input: "Je veux un cinnamon roll", output: "Cinnamon Roll" },
        { input: "Je veux un chocolate roll", output: "Chocolate Roll" },
        { input: "Je veux une glace", output: "Ice Cream" },
        { input: "Je veux un ice", output: "Ice Cream" },
        { input: "Je veux ice cream", output: "Ice cream" },
        { input: "aucun", output: "Aucun" },
        { input: "rien", output: "Rien" },
    ]);

    var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    intentClassifierAccept.trainBatch([
        { input: "Je veux bien", output: "oui" },
        { input: "oui ok", output: "oui" },
        { input: "ça me va", output: "oui" },
        { input: "cela me va", output: "oui" },
        { input: "ok", output: "oui" },
        { input: "très bien", output: "oui" },
        { input: "non ca va aller", output: "non" },
        { input: "non c'est bon", output: "non" },
        { input: "non j'en veux moins finalement", output: "non" },
        { input: "pas besoin", output: "non" },
    ]);


    console.log('Salut :) Bienvenue chez Starbucks !');
    const category_want = prompt("Quelle catégorie vous fait le plus envie chez nous ?");
    predicted_response_category = intentClassifierCategory.classify(category_want);
    console.log(predicted_response_category) 
    
    let current_category = null;
    for (const category of categories) {
        if (category.name === predicted_response_category[0]) {
            current_category = category;
            break;
        }
    }

    if (current_category) {
        current_products = products.filter((product) => product.category_id == current_category.id);
        console.log("Voici la liste des produits disponibles sur la catégorie", predicted_response_category[0]);
        for (const current_product of current_products) {
            console.log(current_product.name, '-', current_product.quantity, 'restants', '(', current_product.price, 'EUR', ')');
        }
    } else {
        console.log("Désolé, la catégorie que vous avez choisie n'est pas disponible.");
    }


    const choixProduct = prompt(`Quel produit souhaitez-vous ?`);
    predicted_response_product = intentClassifierProduct.classify(choixProduct);
    console.log(predicted_response_product)

    if (predicted_response_product && predicted_response_product[0] && (predicted_response_product[0].toLowerCase() === 'aucun' || predicted_response_product[0].toLowerCase() === 'rien')) {
        console.log('Merci et à la prochaine!');
    } else {
        let selectedProduct = current_products.find(product => product.name.toLowerCase() === predicted_response_product[0].toLowerCase());
        if (selectedProduct) {
            const want_qty = prompt(`Combien avez-vous besoin de ${selectedProduct.name} ?`);

            if (want_qty > selectedProduct.quantity) {
                console.log("Désolé, il n'y a pas assez en stock ! :/ ");
                const RespondYesNo = prompt(`Mais vous pouvez peut-être prendre ce qu'il reste de ${selectedProduct.name} : ${selectedProduct.quantity} ?`)
                predicted_response = intentClassifierAccept.classify(RespondYesNo);
                if (predicted_response[0] == 'non') {
                    console.log("D'accord, pas de soucis :) Vous voulez peut-être un autre produit ?")
                    console.log("Voici la liste des produits disponibles sur la catégorie", current_category.name);
                    for (const product of current_products) {
                        console.log(`${product.name} - ${product.quantity} restants (${product.price} EUR)`);
                    }
                    console.log("Quel autre produit vous intéresse ? ;)")
                    predicted_response = intentClassifierProduct.classify(choixProduct); // ajouter la suite => répétition du programme :)
                } else if (predicted_response[0] == 'oui') {
                    console.log("Alors combien en voulez-vous ? :) ")
                }
            } else if (selectedProduct.quantity <= 0) {
                console.log("Il n'y en a plus en stock, désolé ! :'( ")
            } else if (want_qty == selectedProduct.quantity) {
                await dbproduct.updateProduct(selectedProduct.id, selectedProduct.quantity - Number(want_qty));
                console.log(`Vous avez tout pris ! HAHA :D Merci de votre achat. Voici vos ${want_qty} ${selectedProduct.name} :)`);
            } else if (want_qty < selectedProduct.quantity) {
                await dbproduct.updateProduct(selectedProduct.id, selectedProduct.quantity - Number(want_qty));
                console.log(`Merci de votre achat. Voici vos ${want_qty} ${selectedProduct.name} :)`);
                const total = want_qty * selectedProduct.price;
                const date = new Date();
                //const items = [{ product: selectedProduct.name, quantity: want_qty }];
                await dborder.createOrder(date, total);
                console.log(`Voici le récapitulatif de votre commande. Vous avez commandé(e) le ${date}. Voici vos produits :   ${want_qty} ${selectedProduct.name} . Dont le total est de : ${total} EUR .`);
            } else if (selectedProduct.quantity < 0) {
                console.log("La quantité en stock est invalide. Veuillez contacter le gérant. Désolé du dérangement ! :( ")
                await dbproduct.updateProduct(selectedProduct.id, 0);
            }
        }
    }
})()


