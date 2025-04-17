import {thousandsSeparators} from './utils/thousandSeperators.js';
import { selectedItemAddToCart } from './utils/controlls.js';
import { renderFooter } from './footer.js';

//generate the section for the sponsored items
//items will be selected randomly using math random then displays the selected sponsored item
export function renderRightSection(selectedItemID){
  const selectedRandom = Math.random();
  let sponsoredItem = {
    name: `Men's Full-Zip Hooded Fleece Sweatshirt`,
    image: 'men-cozy-fleece-zip-up-hoodie-red.jpg',
    priceCents: 2400,
    rating: {
      stars: 4.5,
      count: 3157
    }
  };

  
  if(selectedRandom < 1/3){
    sponsoredItem = {
      name: `Men's Full-Zip Hooded Fleece Sweatshirt`,
      image: 'men-cozy-fleece-zip-up-hoodie-red.jpg',
      priceCents: 2400,
      rating: {
        stars: 4.5,
        count: 3157
      }
    }
  }else if (selectedRandom < 2/3){
    sponsoredItem = {
      name: `Plain Hooded Fleece Sweatshirt`,
      image: 'plain-hooded-fleece-sweatshirt-yellow.jpg',
      priceCents: 2200,
      rating: {
        stars: 4.5,
        count: 317
      }
    }
  }else {
    sponsoredItem = {
      name: `Women's Fleece Jogger Sweatpant`,
      image: 'women-french-terry-fleece-jogger-camo.jpg',
      priceCents: 2700,
      rating: {
        stars: 4.5,
        count: 248
      }
    }
  }
  
  let html = '';

  const productRightSection = document.querySelector('.js-product-right-section');

  html = `
  <!--buttons for the product-->
    <div class="buttons">
      <div class="buy-message-text js-buy-message">
      </div>
      <button class="cart js-add-to-cart js-add-to-cart-${selectedItemID}" data-product-id="${selectedItemID}">Add to cart</button>

      <div class="line">
        <div class="added-to-cart js-added-to-cart-${selectedItemID}">
          <img src="styles/icons/checkmark.png">
          Added
        </div>
      </div>
    </div>

    <!--sponsored product-->
    <div class="sponsored">
        <div class="image-container">
          <img src="styles/images/sponsored-images/${sponsoredItem.image}">
        </div>
        <div>
          <p class="title">${sponsoredItem.name}</p>
        </div>
        
        <div class="ratings-container">
            <p class="count">${sponsoredItem.rating.stars}</p>
            <img src="styles/images/ratings/rating-${sponsoredItem.rating.stars * 10}.png">  
            <p class="feedback-count">${thousandsSeparators(sponsoredItem.rating.count)}</p>  
        </div>

        <div class="price">
          <p class="text">&#36;${(sponsoredItem.priceCents / 100).toFixed(2)}</p>
        </div>

        <div class="feedback-link">
          Sponsored <img src="styles/icons/info.svg">
        </div>
      </div>
    </div>
  `;

  productRightSection.innerHTML = html;

  selectedItemAddToCart();
}


renderFooter();