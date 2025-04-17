import {cart, clearCart} from '../data/cart.js';
import {getProduct} from '../data/products.js';
import { getDeliveryOption, calculateDeliveryDate } from '../data/deliveryOption.js';
import { formatCurrency } from '../utils/money.js';
import { isDiscounted } from '../utils/discountChecker.js';
import { addOrder } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let priceNow;
  let originalPrice;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const additionalPrice = cartItem.additionalPrice;

    priceNow = (isDiscounted(product.id));
    priceNow += additionalPrice;
    originalPrice = product.priceCents;

    productPriceCents += priceNow * cartItem.quantity;
  
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  })

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  const totalItems = JSON.parse(localStorage.getItem('totalQuantity')) || '0';

  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="js-checkout-header-quantity">items (${totalItems})</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="js-place-order place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
  .addEventListener('click', async () => {
    const now = dayjs();

    if(cart.length >= 1) {
      const products = cart.map(cartItem => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
          return {
            estimatedDeliveryTime: calculateDeliveryDate(deliveryOption),      
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            sizeValue: cartItem.sizeValue
          }
      })
      
        addOrder({
          id: Math.random().toString(16).slice(2),
          orderTime: now,
          products,
          totalCostCents: totalCents
        });
  
        clearCart();
        window.location.href = 'orders.html';
    }else{
      console.log("no item in cart")
    }
  });
}