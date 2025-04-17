import { sizePrice } from "../utils/money.js";
export let cart;

loadFromStorage();

export function loadFromStorage(){
  //Create an array for the cart to store the selected products
  //Store only the productId and quantity
  //Then load the stored data using localstorage
  cart = JSON.parse(localStorage.getItem('cart')) || []
}

countTotalCartQuantity();

//Save the selected product to localstorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//loop through the products array then match the productId
//and then selected productId. Then if it matches get the selected
//value from the select option and store its values. If the
//matchingItem is already existed in the card then update only the quantity
export function addToCart(productId, sizeValue, selectedQuantity){
  let matchingItem;
  let additionalPrice = 0;
  
  if (!selectedQuantity){
    selectedQuantity = '1';
    sizeValue = 'select';
  }

  additionalPrice = sizePrice(sizeValue);
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId && sizeValue === cartItem.sizeValue){
      matchingItem = cartItem;
    }
  });

  if (matchingItem){
    matchingItem.quantity += Number(selectedQuantity);
  }else{
    cart.push({
      productId,
      quantity: Number(selectedQuantity),
      deliveryOptionId: '1',
      additionalPrice,
      sizeValue
    })
  }
  
  saveToStorage();
};

//delete the selected product by creating a new empty 
//cart array then store the products from the previous 
//cart except from the product with the selected productId  
export function removeFromCart(productId, sizeValue){
  let matchingProduct;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId && cartItem.sizeValue === sizeValue){
      matchingProduct = cartItem;
    }
  })
  const index = cart.indexOf(matchingProduct);

  if (index > -1){
    cart.splice(index, 1);
  }
  
  countTotalCartQuantity();

  saveToStorage();
}

//create an object for the pop up 'added message'
//then use clearTimeout to reset the timer for
//each specific product when they are clicked multiple times
const addedMessageTimeouts = {};

//show the added message when the add to cart is clicked
export function showAdded(productId) {
  
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.remove('select-size-show');
  addedMessage.classList.add('added-show');
  
  const previousTimeOutId = addedMessageTimeouts[productId];

  if (previousTimeOutId){
    clearTimeout(previousTimeOutId);
  }

  const timeOutId = setTimeout(() =>{
    addedMessage.classList.remove('added-show');
  }, 2000)

  addedMessageTimeouts[productId] = timeOutId;
}

//add to cart button for viewing the selected product
//show the added message when the add to cart is clicked
//shows a reminder if there was no sizee selected
export function showSelectSize(productId){
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('select-size-show');
  addedMessage.classList.add('added-show');
  
  const previousTimeOutId = addedMessageTimeouts[productId];

  if (previousTimeOutId){
    clearTimeout(previousTimeOutId);
  }

  const timeOutId = setTimeout(() =>{
    addedMessage.classList.remove('select-size-show');
    addedMessage.classList.remove('added-show');
  }, 2000)

  addedMessageTimeouts[productId] = timeOutId;
}

export function clearCart(){
  cart = [];

  countTotalCartQuantity();

  saveToStorage();
}

//update the selected item's quantity by looping to
//the cart and selecting the item by productId and if it
//matches then update its quantity
export function updateItemQuantity(productId, newQuantity){
  cart.forEach((cartItem) =>{
    if (productId === cartItem.productId){
      cartItem.quantity = Number(newQuantity);
    }
  })
  //update the quantity label by using the productId
  //to identify the specific element to update
  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabel.innerHTML = newQuantity;
  
  countTotalCartQuantity();
  saveToStorage();
}

//count the total quantity of cart by looping to the cart
//then store the new quantity to the localstorage
export function countTotalCartQuantity(){
  let cartQuantity;

  cart.forEach((cartItem) => {
     if(!cartQuantity){
        cartQuantity = cartItem.quantity;
      }else{
        cartQuantity += cartItem.quantity;
      }
    })

  if (cartQuantity <= 0 || cartQuantity === undefined){
    cartQuantity = 0;
  }

  localStorage.setItem('totalQuantity', JSON.stringify(cartQuantity));
}


//create a timeoutId outside the function to use it to
//reset the timer when the timer was played multiple times
let timeOutId;

//show an invalid message by adding the css class to display
//the message then remove the class after 2s using setTimeout
export function showInvalidMessage(productId){
  const invalidMessage = document.querySelector(`.js-invalid-quantity-message-${productId}`);

  invalidMessage.classList.add('invalid-quantity-message-show');

  clearTimeout(timeOutId);

  timeOutId = setTimeout(() => {
    invalidMessage.classList.remove('invalid-quantity-message-show');
  }, 2000);
}

export function updateDeliveryOption(productId, deliveryOptionId, sizeValue){
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId && sizeValue === cartItem.sizeValue){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function updateSizeInCart(productId, newSizeValue, prevSizeValue){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId && prevSizeValue === cartItem.sizeValue){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.sizeValue = newSizeValue;
  
  saveToStorage();
}