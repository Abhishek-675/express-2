const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
   static addProduct(id, productPrice, productSize) {
    // Fetch the prev cart
    fs.readFile(p, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0};
        if (!err) {
            cart = JSON.parse(fileContent);
        }
        // analyse the cart -> find existing product
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedPorduct;

        // const sameSize = cart.products.find((prod) => {
        //     if (prod.id === id && prod.size === productSize) return true;
        //     else return false;
        // })
        // const sameSize = existingProductIndex === -1 ? false : cart.products[existingProductIndex].productSize === productSize;

        // const sameSize = existingProductIndex === -1 ? false : cart.products[existingProductIndex].size === productSize;
        // const sameSize = cart.products.find(prod => prod.size === productSize);
        
        // add new product/ increase quantity
        if (existingProduct) {
            updatedPorduct = {...existingProduct};
            updatedPorduct.qty = updatedPorduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedPorduct;
        } else {
            updatedPorduct = { id: id, qty: 1, size: productSize};
            cart.products = [...cart.products, updatedPorduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
        });
    });
   }
}