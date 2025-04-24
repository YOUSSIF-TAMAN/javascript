import { productPrice } from "./common.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption, matchDeliveryOption } from "../data/delivery.js";
import { products } from "../data/products.js";
import { newCart } from "../data/cartOOP.js";
import { addOrder, orders } from "./ordersummary.js";


function renderCheckout() {
  let cartHtml = ``;
  newCart.cart.forEach((cartItem) => {
    let cartProductId = cartItem.productID;
    let matchProd = newCart.matchProductId(cartProductId);

    let matchDelOption = matchDeliveryOption(cartItem);
    let today = dayjs();
    let deliveryDate = today.add(matchDelOption.days, 'days');
    let date = deliveryDate.format('dddd, MMMM D');
    console.log(matchProd);

    cartHtml += `
     <div class="cart-item-container js-cart-item-${matchProd.id}">
        <div class="delivery-date">
          Delivery date: ${date}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchProd.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchProd.name}
            </div>
            <div class="product-price">
              $${productPrice(matchProd.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-button-cart" data-product-id="${matchProd.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${shippingOptionHtml(matchProd)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-cart-summary').innerHTML = cartHtml;

  document.querySelectorAll('.js-delete-button-cart').forEach((button) => {
    button.addEventListener('click', () => {
      let prodID = button.dataset.productId;
      newCart.deleteFromCart(prodID);
      renderOrderSummary();
      let container = document.querySelector(`.js-cart-item-${prodID}`);
      container.remove();
    });
  });

  function shippingOptionHtml(matchProd) {
    let deliverHtml = ``;
    deliveryOption.forEach((option) => {
      let today = dayjs();
      let deliveryDate = today.add(option.days, 'days');
      let date = deliveryDate.format('dddd, MMMM D');
      let delPrice = option.priceCents === 0 ? 'FREE' : productPrice(option.priceCents);

      deliverHtml += `
        <div class="delivery-option js-delivery-option">
          <input type="radio"
            ${newCart.cart.find(p => p.productID === matchProd.id)?.deliveryOption === option.option ? 'checked' : ''}
            class="delivery-option-input"
            data-delivery-option="${option.option}"
            data-product-id="${matchProd.id}"
            name="delivery-option-${matchProd.id}">
          <div>
            <div class="delivery-option-date">
              ${date}
            </div>
            <div class="delivery-option-price">
              $${delPrice}-Shipping
            </div>
          </div>
        </div>
      `;
    });
    return deliverHtml;
  }

  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', () => {
      const { productId, deliveryOption } = input.dataset;
      newCart.selectDelOption(productId, deliveryOption);
      renderCheckout();
      renderOrderSummary();
    });
  });
}

renderCheckout();

function renderOrderSummary() {
  let PaymentHtml = ``;
  let itemsPrice = 0;
  let shippingPrice = 0;
  let totalPriceBeforeTax = 0;
  let tax = 0;
  let totalPriceAfterTax = 0;

  newCart.cart.forEach((item) => {
    let matchProd = newCart.matchProductId(item.productID);
    let matchDelOption = matchDeliveryOption(item);

    let itemPrice = matchProd.priceCents;
    itemsPrice += itemPrice;

    let shipPrice = matchDelOption.priceCents;
    shippingPrice += shipPrice;
  });

  totalPriceBeforeTax += itemsPrice + shippingPrice;
  tax = totalPriceBeforeTax * 0.1;
  totalPriceAfterTax = totalPriceBeforeTax + tax;

  PaymentHtml += ` 
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div>Items (${newCart.cart.length}):</div>
      <div class="payment-summary-money">$${productPrice(itemsPrice)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${productPrice(shippingPrice)}</div>
    </div>
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${productPrice(totalPriceBeforeTax)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${productPrice(tax)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${productPrice(totalPriceAfterTax)}</div>
    </div>
    <button class="place-order-button button-primary js-place-order">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = PaymentHtml;
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      // window.location.href = 'orders.html';
      console.log(orders);
    });


 
}

renderOrderSummary();
