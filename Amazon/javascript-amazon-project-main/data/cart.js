import { products } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
}, {
        productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2
}];

function saveCartToLocalStorage() {
  localStorage.setItem('cart' , JSON.stringify(cart));
}

export function addtocart(productID) {
          let matchProd;
          cart.forEach((prod) => {  
                if (productID === prod.productID) {
                  matchProd = prod;
                }
              });

              if (matchProd) {
                matchProd.quantity += 1;
              } else {
                cart.push({
                  productID: productID,
                  quantity: 1,
                  deliveryOption:'1'
                });
  }
  saveCartToLocalStorage();
			
}
export function cartQuantity() {
      let cartQuantity = 0;
      cart.forEach((prod) =>
          {
            cartQuantity += prod.quantity;

      });
  		document.querySelector('.cart-quantity').innerHTML = cartQuantity;
			

}

export function deleteFromCart(prodId) {
  let newCart = [];

  cart.forEach((product) => {
    if (product.productID !==prodId ) {
      newCart.push(product);
    }
  });

  cart = newCart;
  saveCartToLocalStorage();
}


export function selectDelOption(productID , deliveryOption) {
          let matchProd;
          cart.forEach((prod) => {  
                if (productID === prod.productID) {
                  matchProd = prod;
                }
              });
          matchProd.deliveryOption = deliveryOption;
          saveCartToLocalStorage();
}

export function matchProductId(cartProductId) {
   let matchProd;
      products.forEach((product) => {
        if (product.id ===cartProductId ) {
          matchProd = product;
        }
      });
  return matchProd;
}