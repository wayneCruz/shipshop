import { addToCart,showAdded, showSelectSize, countTotalCartQuantity } from '../data/cart.js';
import { getProduct} from '../data/products.js';
import { isDiscounted } from './discountChecker.js';
import { formatCurrency } from './money.js';
import { displayDeliveryDetails } from '../data/deliveryOption.js';

//create a function to animate the sliding section when the user click the arrow buttons
export function controlSlidingSection(){
  document.querySelectorAll('.js-sliding-product').
  forEach((link) =>{
    link.addEventListener('click', () => {
  
      const productId = link.dataset.productId;
  
      localStorage.setItem('productId', JSON.stringify(productId));
    })
  });
  
  const slidingSection = document.querySelector('.js-sliding-section');
  const leftButton = document.querySelector('.js-sliding-left-button');
  const rightButton = document.querySelector('.js-sliding-right-button');
  slidingSection.style.scrollBehavior = 'smooth';

  leftButton.addEventListener('click', () => {
    slidingSection.scrollLeft -= 500;
  })

  rightButton.addEventListener('click', () => {
    slidingSection.scrollLeft += 500;
  })
}

//function when clicking the add to cart button in the grid items
//store the size of the product as undefined since there was no selected size
export function addToCartButton(){
  countTotalCartQuantity();
  
  const quantityElemtent = document.querySelector('.js-cart-quantity');
  quantityElemtent.innerHTML = JSON.parse(localStorage.getItem('totalQuantity')) || '0';

  document.querySelectorAll('.js-add-to-cart').
  forEach((button) => {

    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      const sizeValue = 'undefined';

      addToCart(productId, sizeValue);
      showAdded(productId);

      countTotalCartQuantity();
      quantityElemtent.innerHTML = JSON.parse(localStorage.getItem('totalQuantity'));
    })
  });
}

//function when clicking the add to cart button on the product that currently viewing
//store the selected size and add additional amount depends on the size
//pop up a message when there's no selected size
export function selectedItemAddToCart(){
  countTotalCartQuantity();
  
  const quantityElemtent = document.querySelector('.js-cart-quantity');
  quantityElemtent.innerHTML = JSON.parse(localStorage.getItem('totalQuantity')) || '0';

  const selectElement = document.querySelector('.js-select-size');
  selectElement.addEventListener('click', renderSelectedSize);

  document.querySelectorAll('.js-add-to-cart').
  forEach((button) => {
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      const selectedItem = getProduct(productId);
      const sizeValue = document.querySelector('.js-select-size').value;
      const popUpMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      if(selectedItem.sizes === true && sizeValue === 'select'){
        popUpMessage.innerHTML = 'Please Select a Size';
        showSelectSize(productId);
      }
      else{
        popUpMessage.innerHTML = `          
          <img src="styles/icons/checkmark.png">
            Added
        `;

        const selectedQuantity = checkSelectedQuantity(selectedItem.id);

        addToCart(productId, sizeValue, selectedQuantity);
        showAdded(productId);
  
        countTotalCartQuantity();
        quantityElemtent.innerHTML = JSON.parse(localStorage.getItem('totalQuantity'));
      }
    })
  });
}

//generate the html for the summary of the product when the customer selects a size
export function renderSelectedSize(){
  const delivery = displayDeliveryDetails();
  const buyMessage = document.querySelector('.js-buy-message');
  const sizeValue = document.querySelector('.js-select-size').value;

  const productId = JSON.parse(localStorage.getItem('productId'));
  const selectedItem = getProduct(productId);
  let additionalPrice = 0;

  const priceNow = (isDiscounted(selectedItem.id));

  if (sizeValue === 'medium'){
    additionalPrice = 200;
  }else if (sizeValue === 'large'){
    additionalPrice = 400;
  }

  if(sizeValue === 'select'){
    buyMessage.innerHTML = `
      <p>To buy, select <span>Size</span></p>
    `;
  }else{
    buyMessage.innerHTML = `
      <div class="price-text">Price: <span>$${formatCurrency(priceNow + additionalPrice)}</span></p>
        <p>FREE delivery on <strong>${delivery.free}</strong>
        <br>Or Fastest delivery on <strong>${delivery.fastest}</strong>
      </div>

      <div class="select-quantity-container">
        Quantity:
        <select class="select-quantity js-select-quantity">
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
    `;
  }
}

export function checkSelectedQuantity(productId){
  const selectedItem = getProduct(productId);
  let selectedQuantity;
  console.log(selectedItem);

  if(selectedItem.sizes === true){
    selectedQuantity = document.querySelector('.js-select-quantity').value;
  }else{
    selectedQuantity = 1;
  }

  console.log(selectedQuantity);
  
  return selectedQuantity;
}

