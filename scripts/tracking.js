import {getProduct, searchFunction} from './data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderFooter } from './footer.js';

async function renderHTML() {
  const url = new URL(window.location.href);
  let matchingOrder;

  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');
  const orders = JSON.parse(localStorage.getItem('orders'));

  orders.forEach((order) => {
    if(order.id === orderId){
      matchingOrder = order;
      }
  });

  const matchingItem = getOrderItem(orders, orderId, productId);
  const product = getProduct(productId);

  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingItem.estimatedDeliveryTime);

  const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime) * 100);
  const deliveryString = dayjs(matchingItem.estimatedDeliveryTime).format('dddd, MMMM D');

  let html = '';

  html = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryString}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingItem.quantity}
        </div>

        <img class="product-image" src="${product.image[0]}">

        <div class="progress-labels-container">
          <div class="progress-label js-progress-preparing">
            Preparing
          </div>
          <div class="progress-label js-progress-shipped">
            Shipped
          </div>
          <div class="progress-label js-progress-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = html;

  const progressBar = document.querySelector('.js-progress-bar');
  progressBar.style.width = `${deliveryProgress}%`;

  if(deliveryProgress <= 30){
    document.querySelector('.js-progress-preparing').classList.add('current-status');
  }else if(deliveryProgress <= 99){
    document.querySelector('.js-progress-shipped').classList.add('current-status');
  }else if(deliveryProgress >= 100){
    document.querySelector('.js-progress-delivered').classList.add('current-status');
  }

  document.querySelector('.js-cart-quantity')
    .innerHTML = JSON.parse(localStorage.getItem('totalQuantity'));
}

renderHTML();

function getOrderItem(orders, orderId, productId) {
  let matchingOrder;
  let matchingItem;

  orders.forEach((order) => {
    if(order.id === orderId){
      matchingOrder = order;

      const items = matchingOrder.products;

      items.forEach((item) => {
        if(item.productId === productId){
          matchingItem = item;
        }
      })
    }
  })

  return matchingItem;
}

searchFunction();
renderFooter();