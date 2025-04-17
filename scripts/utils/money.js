import {cart} from '../data/cart.js';

export function formatCurrency(num){
  return (Math.round(num) / 100).toFixed(2);
}

export function sizePrice(sizeValue){
  let additionalPrice = 0;

  if (sizeValue === 'medium'){
    additionalPrice = 200;
  }else if (sizeValue === 'large'){
    additionalPrice = 400;
  }

  return additionalPrice;
}

export function updatePrice(productId, newSizeValue){
  let priceNow;
  let matchingItem;
  let additionalPrice = sizePrice(newSizeValue);

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId && newSizeValue === cartItem.sizeValue){
      matchingItem = cartItem;
    }
  });
  
  matchingItem.additionalPrice = additionalPrice;
  localStorage.setItem('cart', JSON.stringify(cart));
}