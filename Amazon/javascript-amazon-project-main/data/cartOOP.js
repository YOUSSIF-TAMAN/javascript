import { products } from "../data/products.js";

class Cart {
  localSTorageKey = undefined;
  cart ;

  constructor(localSTorageKey) {
    this.localSTorageKey = localSTorageKey;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    let cartData = JSON.parse(localStorage.getItem(this.localSTorageKey));
    if (cartData) {
      this.cart = cartData;
    } else {
      this.cart = [
        {
          productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOption: 1
        },
        {
          productID: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOption: 1
        }
      ];
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem(this.localSTorageKey, JSON.stringify(this.cart));
  }

  addtocart(productID) {
    let matchProd;
    this.cart.forEach((prod) => {
      if (productID === prod.productID) {
        matchProd = prod;
      }
    });

    if (matchProd) {
      matchProd.quantity += 1;
    } else {
      this.cart.push({
        productID: productID,
        quantity: 1,
        deliveryOption: '1'
      });
    }

    this.saveCartToLocalStorage();
  }

  cartQuantity() {
    let cartQuantity = 0;
    this.cart.forEach((prod) => {
      cartQuantity += prod.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  }

  deleteFromCart(prodId) {
    let newCart = [];
    this.cart.forEach((product) => {
      if (product.productID !== prodId) {
        newCart.push(product);
      }
    });

    this.cart = newCart;
    this.saveCartToLocalStorage();
  }

  selectDelOption(productID, deliveryOption) {
    let matchProd;
    this.cart.forEach((prod) => {
      if (productID === prod.productID) {
        matchProd = prod;
      }
    });

    if (matchProd) {
      matchProd.deliveryOption = deliveryOption;
    }

    this.saveCartToLocalStorage();
  }

  matchProductId(cartProductId) {
    let matchProd;
    products.forEach((product) => {
      if (product.id === cartProductId) {
        matchProd = product;
      }
    });
    return matchProd;
  }
}

export let newCart = new Cart('cart');
