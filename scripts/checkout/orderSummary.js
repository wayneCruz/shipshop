import {cart, removeFromCart, updateItemQuantity,
        showInvalidMessage, updateDeliveryOption, updateSizeInCart} from '../data/cart.js';
import {getProduct, products} from '../data/products.js';
import {formatCurrency, updatePrice} from '../utils/money.js';
import { isDiscounted } from '../utils/discountChecker.js';
import {updateCartQuantity} from './checkoutHeader.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let cartSummaryHTML = '';
  let isThereAProduct;
  
  updateCartQuantity();

  let totalCheckOutQuantity = JSON.parse(localStorage.getItem('totalQuantity'));

  //loop through the cart then match the productId on the cart
  //to the productId on the saved data in products array
  //then generate the HTML for each products in the cart using DOM
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;
    
    products.forEach((product) => {
      if (product.id === productId){
        matchingProduct = product;
        isThereAProduct = true;

        const orderSummary = document.querySelector('.js-order-summary');
        orderSummary.classList.remove('no-items-style');
      }
    });
    
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
  
    const dateString = calculateDeliveryDate(deliveryOption);

    //check the price if discounted is true in the array
    //also load the original price
    let priceNow = (isDiscounted(matchingProduct.id));
    let originalPrice = matchingProduct.priceCents;
    let sizeId;

    if(!isSizeThere(matchingProduct.id)){
      sizeId = 'none';
    }else{
      sizeId = matchingProduct.id;
    }

    //save the generated HTML on a variable
    cartSummaryHTML +=`
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image[0]}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(priceNow + cartItem.additionalPrice)}
            </div>
            <div class="invalid-quantity-message js-invalid-quantity-message-${matchingProduct.id}">
              Invalid Selected Quantity!
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}" data-size-value="${cartItem.sizeValue}">
                Delete
              </span>
              <input class="input-update-quantity is-editing-quantity js-input-update-quantity js-input-update-quantity-${matchingProduct.id}" type="text" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary is-editing-quantity js-save-quantity-link js-save-quantity-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Save
              </span>
            </div>
            <div class="js-product-size product-size" data-size-id="${sizeId}">
              <div>Size: <span class="selected-size js-selected-size-${matchingProduct.id}">${cartItem.sizeValue}</span></div>
              <select class="js-select-size-${matchingProduct.id} select-size is-editing-quantity">
                <option selected value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  //generate the HTML for the options for delivery
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents
        === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
        data-size-value="${cartItem.sizeValue}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id + cartItem.sizeValue}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    })
    return html;
  }

  displayNoItems();

  //display the message No Items if there's no products
  //stored in the cart
  function displayNoItems(){
    totalCheckOutQuantity = JSON.parse(localStorage.getItem('totalQuantity'));

    if (totalCheckOutQuantity === 0){
      isThereAProduct = false;
    }

    if (isThereAProduct === false){
      cartSummaryHTML = `
        <p>(No Items)</p>
        <a href="store.html">
          <button class="cart-empty-button">Shop Now</button> 
        </a>
      `;
      const orderSummary = document.querySelector('.js-order-summary');

      orderSummary.innerHTML = cartSummaryHTML;
      
      orderSummary.classList.add('no-items-style');
    }
  }

  //generate the HTML for the products in the cart
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  //select all the delete link using queryselector and add
  //an eventlistener to all of them to make it functional
  //using DOM use the remove() to remove the HTML of the
  //selected product
  document.querySelectorAll('.js-delete-link')
  .forEach((link) =>{
    link.addEventListener('click', () =>{
      const productId = link.dataset.productId;
      const sizeValue = link.dataset.sizeValue;
      removeFromCart(productId, sizeValue);

      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  //using queryselector loop to all the update link and
  //when they are clicked hide the delete link and show the
  //input and save link
  document.querySelectorAll('.js-update-quantity')
    .forEach((link) =>{
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const selectedSave = document.querySelector(`.js-save-quantity-${productId}`);
        const selectedInput = document.querySelector(`.js-input-update-quantity-${productId}`);
        const selectedDelete = document.querySelector(`.js-delete-link-${productId}`);
        const selectSize = document.querySelector(`.js-select-size-${productId}`);
        const selectedSize = document.querySelector(`.js-selected-size-${productId}`);

        selectedSave.classList.remove('is-editing-quantity');
        selectedInput.classList.remove('is-editing-quantity');
        selectedDelete.classList.add('is-editing-quantity');
        selectedSize.classList.add('is-editing-quantity');
        selectSize.classList.remove('is-editing-quantity');
        
      })
    })

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () =>{
        const productId = link.dataset.productId;
        const newSizeValue = document.querySelector(`.js-select-size-${productId}`).value;
        const prevSizeValue = document.querySelector(`.js-selected-size-${productId}`).innerHTML;
        
        updateSizeInCart(productId, newSizeValue, prevSizeValue);
        saveQuantity(productId);
        updatePrice(productId, newSizeValue);

        renderOrderSummary();
        renderPaymentSummary();
      })
  })

  document.querySelectorAll('.js-input-update-quantity')
    .forEach((link) => {
      link.addEventListener('keydown', (event) =>{
        if (event.key === 'Enter'){
          const productId = link.dataset.productId;
          saveQuantity(productId);
          renderPaymentSummary();
        }
      })
    })

  //save the newly inputed quantity 
  function saveQuantity(productId){
    const selectedSave = document.querySelector(`.js-save-quantity-${productId}`);
    const selectedInput = document.querySelector(`.js-input-update-quantity-${productId}`);
    const selectedDelete = document.querySelector(`.js-delete-link-${productId}`);
    const selectSize = document.querySelector(`.js-select-size-${productId}`);
    const selectedSize = document.querySelector(`.js-selected-size-${productId}`);
    
    selectedDelete.classList.remove('is-editing-quantity');
    selectedSave.classList.add('is-editing-quantity');
    selectedInput.classList.add('is-editing-quantity');
    selectedSize.classList.remove('is-editing-quantity');
    selectSize.classList.add('is-editing-quantity');
    
    const newQuantity = document.querySelector(`.js-input-update-quantity-${productId}`).value;

    if (newQuantity <= 0 || newQuantity > 1000){
      showInvalidMessage(productId);
    }else{
      updateItemQuantity(productId, newQuantity);
      updateCartQuantity();
    }
  }

  document.querySelectorAll('.js-delivery-option').
  forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      const sizeValue = element.dataset.sizeValue;
      
      updateDeliveryOption(productId, deliveryOptionId, sizeValue);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  sizeRenderer();
}

function isSizeThere(productId){
  const matchingProduct = getProduct(productId);
  let size;

  if (matchingProduct.sizes === false){
    size = false;
  }else{
     size = true
  }
  return size;
}

function sizeRenderer(){
  document.querySelectorAll('.js-product-size')
  .forEach((element) => {
    const sizeId = element.dataset.sizeId;

    if(sizeId === 'none'){
      element.classList.add('product-size-none');
    }
  })
}



