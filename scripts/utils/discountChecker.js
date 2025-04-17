import {products} from '../data/products.js';
import { recommendedProducts } from '../data/recommendedProducts.js';

//check if there's a discount on the selected item by checking the boolean discount if true
export function isDiscounted(productId){
  let selectedItem;
  
  products.forEach((item) => {
    if(item.id === productId){
      selectedItem = item;
    }
  })

  let discountCents;
  let discountPercent;
  let priceNow;

  if (selectedItem.discount.discounted === true){
    discountPercent = selectedItem.discount.discountPercentage / 100;
    discountCents = (discountPercent * selectedItem.priceCents).toFixed(2);
    priceNow = selectedItem.priceCents - discountCents;
  }else{
    priceNow = selectedItem.priceCents;
  }

  return priceNow;
}

export function isDiscountedRecommended(productId){
  let selectedItem;
  
  recommendedProducts.forEach((item) => {
    if(item.id === productId){
      selectedItem = item;
    }
  })

  let discountCents;
  let discountPercent;
  let priceNow;

  if (selectedItem.discount.discounted === true){
    discountPercent = selectedItem.discount.discountPercentage / 100;
    discountCents = (discountPercent * selectedItem.priceCents).toFixed(2);
    priceNow = selectedItem.priceCents - discountCents;
  }else{
    priceNow = selectedItem.priceCents;
  }

  return priceNow;
}