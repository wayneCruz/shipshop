import { recommendedProducts } from "./recommendedProducts.js";
import { isDiscountedRecommended} from '../utils/discountChecker.js';
import { thousandsSeparators } from "../utils/thousandSeperators.js";
import { formatCurrency } from "../utils/money.js";
import { products } from "./products.js";

//generate the html for the sliding section
export function renderSlidingSection(){

    let html = '';
  
    recommendedProducts.forEach((item) =>{
      const priceNow = isDiscountedRecommended(item.id);
  
        html += `
          <div class="sliding-product js-sliding-product" data-product-id="${item.id}">
            <a href="product-details.html?productId=${item.id}">
              <div class="photo">
                <img src="${item.image[0]}">
              </div>
            </a>
  
            <div class="title">
              ${item.name}
            </div>
  
            <div class="ratings">
              <img src="styles/images/ratings/rating-${item.rating.stars * 10}.png";>
            </div>
  
            <div class="ratings">
              <p>${thousandsSeparators(item.rating.count)}</p>
            </div>
  
            <div class="price">
              <p>${formatCurrency(priceNow)}</p>
            </div>
          </div>
        `;
    })
  
    document.querySelector('.js-gallery').
      innerHTML = html;
  
  getRandomProducts();
}

let recommendedItem = [];

//select a random item using math random by looping through the 
// products array to display a recommended item and if the
//item was repeated it will change the item by selecting another random item
//after selecting 8 items store it to the localstorage
function getRandomProducts(){
  let randomProduct;
  let duplicateItem = false;
  let i = 0;

  while(i < 12){
    randomProduct = products[Math.floor(Math.random()*products.length)];

    duplicateItem = duplicateChecker(randomProduct);

    if (duplicateItem === true){
      randomProduct = products[Math.floor(Math.random()*products.length)];
      i--;
    }else{
      recommendedItem.push(randomProduct);
    }
      i++;
    }
  localStorage.setItem('recommendedProducts', JSON.stringify(recommendedItem));
}

//check if the item is a duplicate of an item in the array
function duplicateChecker(randomProduct){
  let duplicateItem;
  
  recommendedItem.forEach((item) => {
    if(item.id === randomProduct.id){
      duplicateItem = true;
    }
  })
  return duplicateItem;
}