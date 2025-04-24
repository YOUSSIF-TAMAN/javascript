import { cartQuantity,addtocart } from "../data/cart.js";   
import {products} from "../data/products.js"
import { productPrice } from "./common.js";
import '../data/cartOOP.js';
let productsHtml = ``;
products.forEach((products) => {
	productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${products.getprice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

           ${products.clothingCharHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-Id="${products.id}">
            Add to Cart
          </button>
        </div>
`;

});
document.querySelector('.js-product-grid')
  .innerHTML = productsHtml;
  



document.querySelectorAll('.js-add-to-cart')
	.forEach((button) => {
		button.addEventListener('click', () => {
      const productID = button.dataset.productId;
      addtocart(productID);
      cartQuantity();
      console.log(cart);
	
		});
});	
