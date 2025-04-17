import { renderSlidingSection } from './data/slidingSection.js';
import { addToCartButton, controlSlidingSection } from './utils/controlls.js';
import { thousandsSeparators } from './utils/thousandSeperators.js';
import { formatCurrency } from './utils/money.js';
import { isDiscounted } from './utils/discountChecker.js';
import { products, searchFunction } from './data/products.js';
import { renderFooter } from "./footer.js";

let productsHTML = '';
    
  const url = new URL(window.location.href);
  const searchKey = url.searchParams.get('search');
  
  let filteredProducts = products;

  if(searchKey){
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((word) => {
        if(word.toLowerCase().includes(searchKey.toLowerCase())){
          matchingKeyword = true;
        }
      });
      return matchingKeyword ||
        product.name.toLowerCase().includes(searchKey.toLowerCase());
    })
  }

  filteredProducts.forEach((item) => {
    const priceNow = (isDiscounted(item.id));
    
    productsHTML += `
          <div class="product-info js-product-info js-product-info-${item.id}" 
          data-product-id="${item.id}">

          <a href="product-details.html?productId=${item.id}">
            <div class="photo">
              <img src=${item.image[0]}>
            </div>
          </a>

          <div class="sale-tag sale-tag-hide js-sale-tag" data-discounted="${item.discount.discounted}">
            &#37;${item.discount.discountPercentage} OFF
          </div>

          <!--input 14% off discount at the top left corner of the photo-->

          <div class="title">
            ${item.name}
          </div>

          <div class="ratings">
            <img src="styles/images/ratings/rating-${item.rating.stars * 10}.png"> 
            <p>${thousandsSeparators(item.rating.count)}</p>
          </div>
  
          <div class="price">
            $${formatCurrency(priceNow)}
          </div>
          
      <!--buttons for the product-->
          <div class="buttons">
            <button class="cart js-add-to-cart" data-product-id="${item.id}">Add to cart</button>
          </div>

          <div class="added-to-cart js-added-to-cart-${item.id}">
            <img src="styles/icons/checkmark.png">
            Added
          </div>
          
        </div>
    `;
  })

  document.querySelector('.js-products-container').innerHTML = productsHTML;

  //add a sale tag css if the item is discounted
  document.querySelectorAll('.js-sale-tag').
  forEach((link) => {
    const discounted = link.dataset.discounted;

    if(discounted === 'true'){
      link.classList.add('sale-tag-show');
      link.classList.remove('sale-tag-hide');
    }
  })


  document.querySelectorAll('.js-product-info').
    forEach((link) =>{
      link.addEventListener('click', () => {

        const productId = link.dataset.productId;

        localStorage.setItem('productId', JSON.stringify(productId));
      })
  });

addToCartButton();

searchFunction();

renderSlidingSection();

controlSlidingSection();

renderFooter();