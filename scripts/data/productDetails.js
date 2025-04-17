import {products, searchFunction} from './products.js';
import {thousandsSeparators} from '../utils/thousandSeperators.js';
import { renderRightSection } from '../productRightSection.js';
import {isDiscounted} from '../utils/discountChecker.js';
import {formatCurrency} from '../utils/money.js';
import {reviews} from './reviews.js';
import { renderSlidingSection } from './slidingSection.js';
import { controlSlidingSection} from '../utils/controlls.js';

let html = '';
let selectedItem;
let originalPrice;
let priceNow;

//load the saved product id to identify which product the user wants to view
const url = new URL(window.location.href)
const productId = url.searchParams.get('productId');

//loop through the products array to identify the item with matching ID
products.forEach((item) => {
  if(item.id === productId){
    selectedItem = item;
  }
})

//check the price if discounted is true in the array
//also load the original price
priceNow = (isDiscounted(selectedItem.id));
originalPrice = selectedItem.priceCents;

//generate the html for the selected product
function renderProductInfo(){
  html = `
    <!--Product Specific Details is in this section(main)-->
      <main class="product-info">
        <div class="left-section">
          <div class="js-front-photo-container front-photo-container">
            <img class ="front-photo js-front-photo"src="${selectedItem.image[0]}" data-image="${selectedItem.image[0]}">
          </div>
          <div class="other-photo-container">
              <img class="js-other-photo js-other-photo-1 other-photo" src="${selectedItem.image[0]}" data-image="${selectedItem.image[0]}" data-image-id="1">
              <img class="js-other-photo js-other-photo-2 other-photo" src="${selectedItem.image[1]}" data-image="${selectedItem.image[1]}" data-image-id="2">
              <img class="js-other-photo js-other-photo-3 other-photo" src="${selectedItem.image[2]}" data-image="${selectedItem.image[2]}" data-image-id="3">
              <img class="js-other-photo js-other-photo-4 other-photo" src="${selectedItem.image[3]}" data-image="${selectedItem.image[3]}" data-image-id="4">
          </div>
        </div>

  <!--Middle Section-->
        <div class="middle-section">

      <!--Product's Name-->    
          <div class="title">
            ${selectedItem.name}
          </div>
      
      <!--Product Ratings-->
          <div class="main-ratings-container">
            <div class="main-ratings">
              <div class="stars js-stars-container js-stars-container-1" data-stars-id="1">
                <p class="count">${selectedItem.rating.stars}</p>
                <img src="styles/images/ratings/rating-${selectedItem.rating.stars * 10}.png">     
              </div>
              <p class="feedback-count">${thousandsSeparators(selectedItem.rating.count)} ratings</p>  
            </div>

            <!--pop up scale of ratings-->
            <div class="ratings-breakdown js-ratings-breakdown js-ratings-breakdown-1 ratings-hide" data-ratings-id="1">

            </div>

          </div>

      <!--Main Price Section-->
          <div class="price js-price-container">

            price here
          </div>

      <!--Size Section-->        
          <div class="size-selector-hide size-selector js-size-selector">
            <p>Size:</p>
            <select class="js-select-size select-size" data-select-size-id="${selectedItem.id}">
              <option selected value="select">Select</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

      <!--Main Product Details-->
          <div class="product-details">
            <div class="title">
              <h3>Product details</h3>
            </div>

            <div class="list">
              <ul class="indicators">
                <li>${selectedItem.productDetails.indicators[0]}</li>
                <li>${selectedItem.productDetails.indicators[1]}</li>
                <li>${selectedItem.productDetails.indicators[2]}</li>
                <li>${selectedItem.productDetails.indicators[3]}</li>
              </ul>
    
              <ul class="types">
                <li>${selectedItem.productDetails.types[0]}</li>
                <li>${selectedItem.productDetails.types[1]}</li>
                <li>${selectedItem.productDetails.types[2]}</li>
                <li>${selectedItem.productDetails.types[3]}</li>
              </ul>
            </div>
          </div>

      <!--Main Product Additional Details-->    
          <div class="about">
            <h3>About this item</h3>
            <ul class="info">
              <li>${selectedItem.aboutItem[0]}</li>
              <li>${selectedItem.aboutItem[1]}</li>
              <li>${selectedItem.aboutItem[2]}</li>
              <li>${selectedItem.aboutItem[3]}</li>
            </ul>
          </div>
        </div>
        
  <!--Right Section of the Main Product-->      
        <div class="right-section js-product-right-section">
          
        </div>
      </main>

      <!--this section contains more details about the product and feedbacks of the customers-->
      <div class="second-half-section">

        <div>
          <h2>Customers frequently viewed</h2>
        </div>

      <!--this section horizontal sliding product display-->
      <div class="sliding-section-container">
        <div class="sliding-arrow-container">
          <img class="sliding-arrow js-sliding-left-button" src="styles/icons/angle-left.svg">  
        </div>
          <div class="sliding-section js-sliding-section">
            <div class="gallery js-gallery">
            </div>
          </div>
        <div class="sliding-arrow-container">
          <img class="sliding-arrow js-sliding-right-button" src="styles/icons/angle-right.svg">   
        </div>
      </div>  

        <div class="more-info">
          <h2>Product details</h2>
      <!--List of product types and details-->
          <ul class="product-details">
            <li><strong>Item model number &#58;</strong> ${selectedItem.moreProductDetails.itemModelNumber}</li>
            <li><strong>Department &#58;</strong> ${selectedItem.moreProductDetails.department}</li>
            <li><strong>Date First Available &#58;</strong> December 15, 2018</li>
            <li><strong>Manufacturer &#58;</strong> ${selectedItem.moreProductDetails.manufacturer}</li>
            <li><strong>ASIN &#58;</strong> ${selectedItem.moreProductDetails.asin}</li>
            <li><strong>Best Sellers Rank&#58;</strong> ${selectedItem.moreProductDetails.bestSellersRank}</li>
            <li class="customer-reviews">Customer Reviews&#58;</li>
          
      <!--Main Ratings of the selected product-->
            <div class="main-ratings-container">
              <div class="main-ratings">
                <div class="stars js-stars-container js-stars-container-2" data-stars-id="2">
                  <p class="count">${selectedItem.rating.stars}</p>
                  <img src="styles/images/ratings/rating-${selectedItem.rating.stars * 10}.png">
                  <p class="feedback-count">${thousandsSeparators(selectedItem.rating.count)}</p>
                </div> 
                  <!--pop up scale of ratings-->
                  <div class="ratings-breakdown js-ratings-breakdown js-ratings-breakdown-2 ratings-hide" data-ratings-id="2">

                  </div>
              </div>
            </div>
          </ul>
        </div>
      
      <!--Product's Description-->
        <div class="product-description">
          <h1>Product Description</h1>
            <img src="${selectedItem.banner}" class="product-banner js-product-banner">

            <p>Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. 
              Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck 
              tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest 
              standards in quality and comfort.</p>
        </div>

  <!--this section contains the ratings and the feedback-->
        <div class="reviews-and-feedback">
          <div class="ratings-breakdown">
            <h2>Customer reviews</h2>
            <div class="main-ratings-container">
              <div class="main-ratings">
                <img src="styles/images/ratings/rating-${selectedItem.rating.stars * 10}.png">   
                <p class="count">${selectedItem.rating.stars} out of 5</p>
              </div>
              <p class="feedback-count">
                ${thousandsSeparators(selectedItem.rating.count)} global ratings
              </p>
            </div>  
              
      <!--5-1 star scale-->
            <div class="ratings-scale-container js-ratings-scale-container">
                
            </div>
  <!--put a drop-down here to show more information-->
              <div class="how-reviews-and-feedback">
                <p>How customer reviews and ratings work</p>
              </div>

              <div class="review-this-product">
                <h3>Review this product</h3>
                <p>Share your thoughts with other customers</p>
                <button>Write a customer review</button>
              </div>
          </div>

    <!--Customer's Comments/Feedback/Ratings Section-->
          <div class="customer-feedback">
            <h3>Top reviews from the customers</h3>
            <div class="customer-list-of-feedbacks js-customer-feedback">
            
            </div>
          </div>
          
        </div>
      </div>
  `;

  document.querySelector('.js-product-details-container').
    innerHTML = html;
  
  //change the document title based on the selected product's title
  document.title = `${selectedItem.name}`;

  responsiveFunctions();
}

//generate the other info such as the price,sliding,section and right section
function renderOtherInfo(){
  renderPrice();
  
  //change the price depends on the selected size
  document.querySelector('.js-select-size'). 
    addEventListener('click', () => {
      const selectedSize = document.querySelector('.js-select-size').value;

      if (selectedSize === 'medium'){
        priceNow = (isDiscounted(selectedItem.id)) + 200;
        originalPrice = selectedItem.priceCents + 200;
      }else if (selectedSize === 'large'){
        priceNow = (isDiscounted(selectedItem.id)) + 400;
        originalPrice = selectedItem.priceCents + 400;
      }else{
        priceNow = (isDiscounted(selectedItem.id));
        originalPrice = selectedItem.priceCents;
      }

      renderPrice();
    })

  renderRightSection(selectedItem.id);
}


//generate the html for price and the needed css
export function renderPrice(){
  const selectedSize = document.querySelector('.js-select-size').value;

  if (selectedSize === 'select' && selectedItem.sizes === true){
    document.querySelector('.js-price-container')
    .innerHTML = `
      <div class="discounted-container">
        <p>Price: <span class="price-now js-price-now">$${formatCurrency(priceNow)} - ${formatCurrency(priceNow + 400)}</span></p>
      </div>
  
      <div class="sale-tag sale-tag-hide js-sale-tag">
        <p class="original js-price-original">&#36;${formatCurrency(originalPrice)} - ${formatCurrency(originalPrice + 400)}</p>
        <p class="sale-text">&#37;${selectedItem.discount.discountPercentage} OFF</p>
      </div>
    `;

    document.querySelector('.js-price-now').classList.remove('price-now-selecting');
    document.querySelector('.js-price-now').classList.add('price-now-select');
  }
  else {
    document.querySelector('.js-price-container')
    .innerHTML = `
      <div class="discounted-container">
        <p>Price: <span class="price-now js-price-now">$${formatCurrency(priceNow)}</span></p>
      </div>
  
      <div class="sale-tag sale-tag-hide js-sale-tag">
        <p class="original js-price-original">&#36;${formatCurrency(originalPrice)}</p>
        <p class="sale-text">&#37;${selectedItem.discount.discountPercentage} OFF</p>
      </div>
    `;
    document.querySelector('.js-price-now').classList.add('price-now-selecting');
    document.querySelector('.js-price-now').classList.remove('price-now-select');
  }

  if (selectedItem.discount.discounted === true){
    const saleTag = document.querySelector('.js-sale-tag');
    saleTag.classList.add('sale-tag-show');
    saleTag.classList.remove('sale-tag-hide');
  }

  if(selectedItem.sizes === true){
    const sizeSelector = document.querySelector('.js-size-selector');
    sizeSelector.classList.remove('size-selector-hide');
  }
}

//when the user hover to the other photo of the product it will change the front photo for better view
//also generate the feedbacks from customers
function responsiveFunctions(){
  renderOtherInfo();

  const frontPhoto = document.querySelector('.js-front-photo-container');

  //place a default value to be selected in other photos
  let selectedId;
  let prevSelectedId = '1';
  let prevSelected = document.querySelector('.js-other-photo-1');
  prevSelected.classList.add('other-photo-hover');

  document.querySelectorAll('.js-other-photo').
    forEach((link) => {
      link.addEventListener('mouseover', () => {
        selectedId = link.dataset.imageId;

        if (prevSelectedId !== selectedId){
          prevSelected.classList.remove('other-photo-hover');
          link.classList.add('other-photo-hover');

          prevSelectedId = selectedId;
          prevSelected = document.querySelector(`.js-other-photo-${selectedId}`);
        }

        const image = link.dataset.image;
        
        frontPhoto.innerHTML = `
          <img class ="front-photo js-front-photo"src="${image}" data-image="${selectedItem.image[0]}">
        `;
      })
    })

  let reviewHTML = '';

  reviews.forEach((feedback) => {

    reviewHTML += `
    <div class="customer-feedback-container">
      <div class="profile">
        <img src="styles/icons/user.svg">
        ${feedback.name}
      </div>
      <div class="ratings">
        <img src="styles/images/ratings/rating-${feedback.stars * 10}.png">
          <strong>${feedback.highlight}</strong>
      </div>
      <div class="product-type">
        ${feedback.productType} &#x7c;<span> Verified Purchase</span>
      </div>
      <div class="comment">
        ${feedback.comment}
      </div>
      <div class="buttons-container">
        <button class="helpful">Helpful</button>
      <div class="line-divider">&#x7c;</div>
        <button class="report">Report</button>
      </div>
    </div>
    `;
  })

  document.querySelector('.js-customer-feedback').
    innerHTML = reviewHTML;
    
  renderSlidingSection();

  controlSlidingSection();
}

renderProductInfo();

renderPopUpRatings();

function renderPopUpRatings(){
  let html = '';

  html =`
      <h2>Customer reviews</h2>
      <div class="close-button js-close-button" data-button-id="${selectedItem.id}"> X </div>
      <div class="main-ratings-container">
        <div class="main-ratings">
          <img src="styles/images/ratings/rating-${selectedItem.rating.stars * 10}.png">     
          <p class="count">${selectedItem.rating.stars} out of 5</p>
        </div>
        <p class="feedback-count">
          ${thousandsSeparators(selectedItem.rating.count)} global ratings
        </p>
      </div>  
        
      <!--5-1 star scale-->
      <div class="ratings-scale-container js-ratings-scale-container">

      </div>

        <div class="customer-review-link js-customer-review-link">
          See customer reviews &gt;
        </div>
  `;

  const ratingsElement = document.querySelectorAll('.js-ratings-breakdown');

  ratingsElement.forEach((element) =>{
      element.innerHTML = html;
    })
  
  document.querySelectorAll('.js-stars-container')
    .forEach((element) => {
    
      element.addEventListener('mouseleave', () => {
        const starsId = element.dataset.starsId;

        const ratings = document.querySelector(`.js-ratings-breakdown-${starsId}`);

        removeRatings(starsId);
      })

      element.addEventListener('click', ()=> {
        const starsId = element.dataset.starsId;

        const ratings = document.querySelector(`.js-ratings-breakdown-${starsId}`);

        displayRatings(starsId, ratings);
      })

      //closes the popUp Ratings when clicking the X button
      document.querySelectorAll('.js-close-button')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const starsId = element.dataset.starsId;
  
          const ratings = document.querySelector(`.js-ratings-breakdown-${starsId}`);
  
          clearTimeout(timeOutId);
          ratings.classList.add('ratings-hide');
          ratings.classList.remove('ratings-show');
        })
      })
    })
}

//this will display the ratings when the customer clicks the stars
//when the viewer is hovering on the pop up message the timer timeout will stop
const ratingsPopupTimeouts = {};
let isHoveringRatings = false;
let timeOutId;

function displayRatings(starsId, ratings){
      
      ratings.classList.remove('ratings-hide');
      ratings.classList.add('ratings-show');
      
      ratings.addEventListener('mouseenter', ()=> {
        clearTimeout(timeOutId);
        isHoveringRatings = true;
        ratings.classList.remove('ratings-hide');
        ratings.classList.add('ratings-show');
      })
    
      ratings.addEventListener('mouseleave', () => {
        isHoveringRatings = false;
        removeRatings(starsId);
      })
}

//remove the pop up ratings after the timeout expires
function removeRatings(starsId){
  const ratings = document.querySelector(`.js-ratings-breakdown-${starsId}`);
  const previousTimeOutId = ratingsPopupTimeouts[starsId];

  if (previousTimeOutId){
    clearTimeout(previousTimeOutId);

  }

  if (isHoveringRatings === false){
    timeOutId = setTimeout(() => {
      ratings.classList.add('ratings-hide');
      ratings.classList.remove('ratings-show');
    }, 2000);
    ratingsPopupTimeouts[starsId] = timeOutId;
  }
}

generateRatingsHTML();

//this will generate the html for the ratings depends on the gathered data
//from the users who rate the product
function generateRatingsHTML(){
  const ratingsContainer = document.querySelectorAll('.js-ratings-scale-container');

  let html = '';
  let totalStars = 0;
  let average = 0;
  let starsScale = [0,0,0,0,0]

  reviews.forEach((review) => {
    if(review.stars === 5){
      starsScale[4]++;
    }else if(review.stars >= 4){
      starsScale[3]++;
    }else if(review.stars >= 3){
      starsScale[2]++;
    }else if (review.stars >= 2){
      starsScale[1]++;
    }else{
      starsScale[0]++;
    }

    totalStars += review.stars;
  })

  average = totalStars / reviews.length;
  let fiveToOneStar = 5;

  starsScale.slice().reverse().forEach((stars) =>{
    const percentage = (stars / reviews.length) * 100;

    html += `
      <div class="ratings-scale js-rating-scale">
        <p>${fiveToOneStar} star</p>
        <meter class="bar" min="0" max="100" value="${percentage}"></meter>
        <p>${percentage}&#37; </p>
      </div>
    `;
    fiveToOneStar--;
  })

  ratingsContainer.forEach((container) => {
    container.innerHTML = html;
  })
}

searchFunction();