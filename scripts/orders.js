import {orders} from './data/orders.js';
import {addToCart, countTotalCartQuantity} from './data/cart.js'; 
import { getProduct, searchFunction} from './data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderFooter } from './footer.js';

function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    ordersHTML += `
        <div class="order-container js-order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D ddd hh:mma')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>
  
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="js-products-container-${order.id}">
            ${renderProductsHTML(order)}
          </div>
        </div>
    `;
  });

  if(orders.length <= 0) {
    ordersHTML =`
      <p class="no-items-text">(No Items)</p>
      <a href="store.html">
        <button class="order-empty-button">Shop Now</button> 
      </a>
    `;
  }

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersHTML;

  document.querySelector('.js-cart-quantity')
    .innerHTML = JSON.parse(localStorage.getItem('totalQuantity'));
}

renderOrders();

function renderProductsHTML(order) {
  const items = order.products;
  let productsHTML = '';

  items.forEach((item) => {
    const matchingProduct = getProduct(item.productId);

    productsHTML += `           
      <div class="order-details-container js-order-details-container">

        <div class="order-details js-order-details">
          <div class="product-image-container">
            <img src="${matchingProduct.image[0]}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${item.estimatedDelivery}
            </div>
            <div class="product-quantity">
              Quantity: ${item.quantity}
            </div>
            <button class="buy-again-button js-buy-again-button js-buy-again-button-${order.id + item.prductId} button-primary" data-product-id="${item.productId}">
              <img class="buy-again-icon" src="/styles/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>

        </div>
      </div>
    `;
  });

  return productsHTML;
}

document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    const productId = button.dataset.productId;

    button.addEventListener('click', () => {
      addToCart(productId);
      countTotalCartQuantity();

      document.querySelector('.js-cart-quantity')
        .innerHTML = JSON.parse(localStorage.getItem('totalQuantity'));
    })
  });

searchFunction();

renderFooter();