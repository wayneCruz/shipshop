import { formatCurrency } from '../utils/money.js';
import { isDiscounted } from '../utils/discountChecker.js';
import {thousandsSeparators} from '../utils/thousandSeperators.js';

export function searchFunction(){
  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const searchKey = document.querySelector('.js-search-bar').value;

    window.location.href = `store.html?search=${searchKey}`;    
  })

  document.querySelector('.js-search-bar')
  .addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      const searchKey = document.querySelector('.js-search-bar').value;

      window.location.href = `store.html?search=${searchKey}`;  
    }
  })
}

export function getProduct(productId){
  let matchingProduct;
  
  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

//generates the HTML for the products in grid
export function renderProducts(){
  let html = '';

  const productsHTML = document.querySelector('.js-products-container');

  products.forEach((item) =>{
    const priceNow = (isDiscounted(item.id));

    html += `
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
              <button class="buy">Buy now</button>
            </div>

            <div class="added-to-cart js-added-to-cart-${item.id}">
              <img src="styles/icons/checkmark.png">
              Added
            </div>
            
          </div>
    `;
  });

  return productsHTML.innerHTML = html;
}

export const products =[
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    discount: {
      discounted: true,
      discountPercentage: 14
    },
    sizes: true,
    image: [
        "styles/images/products/Under-Armour-Men's-Rival-Fleece-Hoodie.jpg",
        "styles/images/products/Under-Armour-Men's-Rival-Fleece-Hoodie-1.jpg",
        "styles/images/products/Under-Armour-Men's-Rival-Fleece-Hoodie-2.jpg",
        "styles/images/products/Under-Armour-Men's-Rival-Fleece-Hoodie-3.jpg"
    ],
    banner: "styles/images/products-banner/Under-Armour-Men's-Rival-Fleece-Hoodie-banner.jpg",
    name: "Under Armour Men's Rival Fleece Hoodie",
    rating: {
      stars: 4.5,
      count: 15375
    },
    priceCents: 5995,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shirt", "mens", "cloth"]
  },

  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
      "styles/images/products/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts.jpg",
      "styles/images/products/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts-1.jpg",
      "styles/images/products/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts-2.jpg",
      "styles/images/products/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts-3.jpg"
    ],
    banner: "styles/images/products-banner/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts-banner.jpg",
    name: "Men's Henley Shirts Classic Casual Basic Tee Shirts Long Sleeve Cotton Button T Shirts",
    rating: {
      stars: 4,
      count: 76
    },
    priceCents: 2699,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '60%Cotton, 35%Polyester, 5%Spandex',
        'Machine Wash',
        'Imported',
        'Button'
      ],
    },
    aboutItem: [
      '【Material】:This mens Long sleeve henley shirt super soft and lightweight,good stretch and free movement,comfortable to wear,all of which will give you more comfort.',
      "【Design】:This Classic Long sleeve men's henley shirts , round neck, Long sleeve, featured 3 button detail, color contrast collar and line design, highlight the unique design on the garment Perfect gift for families, friends and boyfriend.",
      "【Feature】:This men henley t-shirts has a round neckline button design,splice basic henley shirts,lightweight fabric,slim fit, pullover sweatshirt, brings you simple and effortless style along with comfort with suit for any casual occasions.",
      "【Occasion】:The mens fashion henley shirts comfortable and slim fit casual wear, suit for any casual occasions, such as daily wear, Office, Work, Date, Party, Travel, Street, Sports, Beach etc.",
      "【Note】:Machine washable.These classic henley t shirts don't shrink.Please carefully refer to the tshirts size chart before ordering.Any problem about our product, please feel free to contact with us,we will respond and resolve your issues in a timely manner. Look forward to your choice."
    ],
    moreProductDetails: {
      packageDimensions: '15.07 x 10.28 x 2.48 inches; 1.08 Pounds',
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'December 15, 2018',
      manufacturer: 'Amazon Essentials',
      asin: 'B07BJKT519',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shirt", "mens", "cloth"]
  },

  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    discount: {
      discounted: true,
      discountPercentage: 10
    },
    sizes: true,
    image: [
      "styles/images/products/Full-Sleeves-Hoodies-for-Men-Sweatshirt-for-Men-Unisex-Hoodies.jpg",
      "styles/images/products/Full-Sleeves-Hoodies-for-Men-Sweatshirt-for-Men-Unisex-Hoodies1.jpg",
      "styles/images/products/Full-Sleeves-Hoodies-for-Men-Sweatshirt-for-Men-Unisex-Hoodies2.jpg",
      "styles/images/products/Full-Sleeves-Hoodies-for-Men-Sweatshirt-for-Men-Unisex-Hoodies3.jpg",
    ],
    banner: "styles/images/products-banner/Men's-Henley-Shirts-Classic-Casual-Basic-Tee-Shirts-Long-Sleeve-Cotton-Button-T-Shirts-banner.jpg",
    name: "Full Sleeves Hoodies for Men | Sweatshirt for Men | Unisex Hoodies",
    rating: {
      stars: 5,
      count: 103
    },
    priceCents: 3500,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '60%Cotton, 35%Polyester, 5%Spandex',
        'Machine Wash',
        'Imported',
        'Button'
      ],
    },
    aboutItem: [
      '【Material】:This mens Long sleeve henley shirt super soft and lightweight,good stretch and free movement,comfortable to wear,all of which will give you more comfort.',
      "【Design】:This Classic Long sleeve men's henley shirts , round neck, Long sleeve, featured 3 button detail, color contrast collar and line design, highlight the unique design on the garment Perfect gift for families, friends and boyfriend.",
      "【Feature】:This men henley t-shirts has a round neckline button design,splice basic henley shirts,lightweight fabric,slim fit, pullover sweatshirt, brings you simple and effortless style along with comfort with suit for any casual occasions.",
      "【Occasion】:The mens fashion henley shirts comfortable and slim fit casual wear, suit for any casual occasions, such as daily wear, Office, Work, Date, Party, Travel, Street, Sports, Beach etc.",
      "【Note】:Machine washable.These classic henley t shirts don't shrink.Please carefully refer to the tshirts size chart before ordering.Any problem about our product, please feel free to contact with us,we will respond and resolve your issues in a timely manner. Look forward to your choice."
    ],
    moreProductDetails: {
      packageDimensions: '15.07 x 10.28 x 2.48 inches; 1.08 Pounds',
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'December 15, 2018',
      manufacturer: 'Amazon Essentials',
      asin: 'B07BJKT519',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shirt", "mens", "cloth"]
  },

  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    discount: {
      discounted: true,
      discountPercentage: 20
    },
    sizes: false,
    image: [
        "styles/images/products/rice-cooker.jpg",
        "styles/images/products/rice-cooker1.jpg",
        "styles/images/products/rice-cooker2.jpg",
        "styles/images/products/rice-cooker3.jpg"
    ],
    banner: "styles/images/products-banner/rice-cooker.jpg",
    name: "Crock-Pot 7 Quart Oval Manual Slow Cooker, Stainless Steel (SCV700-S-BR), Versatile Cookware for Large Families or Entertaining",
    rating: {
      stars: 4.5,
      count: 3584
    },
    priceCents: 4999,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Product Dimensions'
      ],
      types: [
        'Crock-Pot',
        'Stainless Steel',
        'Stoneware',
        '16.9"D x 11.8"W x 10.4"H'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["appliances", "rice cooker", "cook", "kitchen"]
  },

  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/triple-rice-cooker1.jpg",
        "styles/images/products/triple-rice-cooker.jpg",
        "styles/images/products/triple-rice-cooker2.jpg",
        "styles/images/products/triple-rice-cooker3.jpg"
    ],
    banner: "styles/images/products-banner/rice-cooker.jpg",
    name: "Triple Slow Cooker, 3 * 1.5 Quarts Buffet Servers and Warmers, 3 Pots Buffet Slow Cooker Adjustable Temp Lid Rests Stainless Steel Manual Silver for Parties Holidays Families",
    rating: {
      stars: 4.5,
      count: 1209
    },
    priceCents: 8999,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Product Dimensions'
      ],
      types: [
        'Crock-Pot',
        'Stainless Steel',
        'Stoneware',
        '16.9"D x 11.8"W x 10.4"H'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["appliances", "rice cooker", "cook", "kitchen"]
  },

  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/blender.jpg",
        "styles/images/products/blender1.jpg",
        "styles/images/products/blender2.jpg",
        "styles/images/products/blender3.jpg"
    ],
    banner: "styles/images/products-banner/rice-cooker.jpg",
    name: "Ninja BL610 Professional 72 Oz Countertop Blender with 1000-Watt Base and Total Crushing Technology for-Smoothies, Ice and Frozen Fruit, Black",
    rating: {
      stars: 4.5,
      count: 105432
    },
    priceCents: 7259,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Product Dimensions'
      ],
      types: [
        'Crock-Pot',
        'Stainless Steel',
        'Stoneware',
        '16.9"D x 11.8"W x 10.4"H'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["appliances", "rice cooker", "cook", "kitchen"]
  },

  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    discount: {
      discounted: true,
      discountPercentage: 15
    },
    sizes: false,
    image: [
        "styles/images/products/oven.jpg",
        "styles/images/products/oven1.jpg",
        "styles/images/products/oven2.jpg",
        "styles/images/products/oven3.jpg"
    ],
    banner: "styles/images/products-banner/rice-cooker.jpg",
    name: "Smart Oven Air Fryer Pro and Convection Oven, Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 105432
    },
    priceCents: 39995,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Product Dimensions'
      ],
      types: [
        'Crock-Pot',
        'Stainless Steel',
        'Stoneware',
        '16.9"D x 11.8"W x 10.4"H'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["appliances", "rice cooker", "cook", "kitchen"]
  },

  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-backless.jpg",
        "styles/images/products/women-backless1.jpg",
        "styles/images/products/women-backless2.jpg",
        "styles/images/products/women-backless3.jpg"
    ],
    banner: "styles/images/products-banner/women-shirt-banner.jpg",
    name: "Silk Pajamas Set for Women Satin Backless Lingerie Pjs Cami Top and Shorts Nightwear",
    rating: {
      stars: 4.5,
      count: 5878
    },
    priceCents: 1999,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shirt", "womens", "cloth", "pajama", "dress"]
  },

  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-hoodie.jpg",
        "styles/images/products/women-hoodie1.jpg",
        "styles/images/products/women-hoodie2.jpg",
        "styles/images/products/women-hoodie3.jpg"
    ],
    banner: "styles/images/products-banner/women-shirt-banner.jpg",
    name: "Womens 2 Piece Outfits Lounge Hoodie Sweatsuit Sets Oversized Sweatshirt Baggy Fall Fashion Sweatpants with Pockets",
    rating: {
      stars: 4.5,
      count: 2585
    },
    priceCents: 4799,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shirt", "womens", "cloth", "pajama", "dress"]
  },

  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-shoe-white.jpg",
        "styles/images/products/women-shoe-white1.jpg",
        "styles/images/products/women-shoe-white.jpg",
        "styles/images/products/women-shoe-white1.jpg"
    ],
    banner: "styles/images/products-banner/women-shoes-banner.jpg",
    name: "Women's Loven Sneaker",
    rating: {
      stars: 4.5,
      count: 29939
    },
    priceCents: 2758,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shoes", "womens", "sneakers", "sports"]
  },

  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-sneakers.jpg",
        "styles/images/products/women-sneakers1.jpg",
        "styles/images/products/women-sneakers2.jpg",
        "styles/images/products/women-sneakers3.jpg"
    ],
    banner: "styles/images/products-banner/women-shoes-banner.jpg",
    name: "Skechers Women's Hands Free Slip-ins Summits Dazzling Haze Sneaker",
    rating: {
      stars: 4.5,
      count: 10794
    },
    priceCents: 4500,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shoes", "womens", "sneakers", "sports"]
  },

  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/men-shoes-puma.jpg",
        "styles/images/products/men-shoes-puma1.jpg",
        "styles/images/products/men-shoes-puma2.jpg",
        "styles/images/products/men-shoes-puma3.jpg"
    ],
    banner: "styles/images/products-banner/men-shoes-banner.jpg",
    name: "PUMA Mens Club 5v5 Sneaker",
    rating: {
      stars: 4,
      count: 1094
    },
    priceCents: 4595,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shoes", "mens", "sneakers", "sports"]
  },

  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    discount: {
      discounted: true,
      discountPercentage: 5
    },
    sizes: true,
    image: [
        "styles/images/products/men-vans-shoes.jpg",
        "styles/images/products/men-vans-shoes1.jpg",
        "styles/images/products/men-vans-shoes2.jpg",
        "styles/images/products/men-vans-shoes3.jpg"
    ],
    banner: "styles/images/products-banner/men-shoes-banner.jpg",
    name: "Vans Men's Seldan Sneaker",
    rating: {
      stars: 5,
      count: 2537
    },
    priceCents: 4495,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["shoes", "mens", "sneakers", "sports"]
  },

  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/women-watch-gold.jpg",
        "styles/images/products/women-watch-gold1.jpg",
        "styles/images/products/women-watch-gold2.jpg",
        "styles/images/products/women-watch-gold.jpg"
    ],
    banner: "styles/images/products-banner/accessories-banner.jpg",
    name: "Nine West Women's Floral Dial Bracelet Watch",
    rating: {
      stars: 4.5,
      count: 11254
    },
    priceCents: 1387,
    productDetails: {
      indicators: [
        'Material',
        'Origin',
        'Item width',
        'Clasp type'
      ],
      types: [
        'Metal',
        'UK',
        '37 millimeters',
        'Push Button Foldover Clasp With Safety'
      ]
    },
    aboutItem: [
      'Domed mineral crystal lens; light champagne dial with gold-tone hands and crystal accented markers',
      'Gold-tone adjustable link bracelet; fold over clasp with double push-button safety',
      'Inner band circumference: 7 inches'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["accessories", "watch", "womens"]
  },

  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/women-bracelet.jpg",
        "styles/images/products/women-bracelet1.jpg",
        "styles/images/products/women-bracelet2.jpg",
        "styles/images/products/women-bracelet3.jpg"
    ],
    banner: "styles/images/products-banner/accessories-banner.jpg",
    name: "Anne Klein Women's Premium Crystal Accented Gold-Tone Charm Bracelet Watch",
    rating: {
      stars: 4.5,
      count: 1057
    },
    priceCents: 5304,
    productDetails: {
      indicators: [
        'Material',
        'Origin',
        'Item width',
        'Clasp type'
      ],
      types: [
        'Metal',
        'UK',
        '37 millimeters',
        'Push Button Foldover Clasp With Safety'
      ]
    },
    aboutItem: [
      'Domed mineral crystal lens; light champagne dial with gold-tone hands and crystal accented markers',
      'Gold-tone adjustable link bracelet; fold over clasp with double push-button safety',
      'Inner band circumference: 7 inches'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["accessories", "watch", "womens"]
  },

  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/men-chino-shorts.jpg",
        "styles/images/products/men-chino-shorts1.jpg",
        "styles/images/products/men-chino-shorts2.jpg",
        "styles/images/products/men-chino-shorts3.jpg"
    ],
    banner: "styles/images/products-banner/Under-Armour-Men's-Rival-Fleece-Hoodie-banner.jpg",
    name: `Men's Classic-Fit 9" Chino Short`,
    rating: {
      stars: 4.5,
      count: 36971
    },
    priceCents: 1896,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["men", "shorts", "cloth"]
  },

  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    discount: {
      discounted: true,
      discountPercentage: 10
    },
    sizes: true,
    image: [
        "styles/images/products/men-shorts-black.jpg",
        "styles/images/products/men-shorts-black1.jpg",
        "styles/images/products/men-shorts-black2.jpg",
        "styles/images/products/men-shorts-black3.jpg"
    ],
    banner: "styles/images/products-banner/Under-Armour-Men's-Rival-Fleece-Hoodie-banner.jpg",
    name: `Men's Performance Tech Loose-Fit Shorts (Available in Big & Tall), Pack of 2`,
    rating: {
      stars: 4.5,
      count: 71644
    },
    priceCents: 1900,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["men", "shorts", "cloth"]
  },

  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    discount: {
      discounted: true,
      discountPercentage: 12
    },
    sizes: true,
    image: [
        "styles/images/products/women-shorts-white.jpg",
        "styles/images/products/women-shorts-white1.jpg",
        "styles/images/products/women-shorts-white2.jpg",
        "styles/images/products/women-shorts-white3.jpg"
    ],
    banner: "styles/images/products-banner/women-sports-banner.jpg",
    name: `Women's Sweat Shorts with Pockets Cotton French Terry Drawstring Summer Workout Casual Lounge Shorts`,
    rating: {
      stars: 4.5,
      count: 794
    },
    priceCents: 2398,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["womens", "shorts", "cloth"]
  },

  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    discount: {
      discounted: true,
      discountPercentage: 7
    },
    sizes: true,
    image: [
        "styles/images/products/women-leggings.jpg",
        "styles/images/products/women-leggings1.jpg",
        "styles/images/products/women-leggings2.jpg",
        "styles/images/products/women-leggings3.jpg"
    ],
    banner: "styles/images/products-banner/women-sports-banner.jpg",
    name: `Women's High Waisted Yoga Capris with Pockets, Tummy Control Non See Through Workout Athletic Running Capri Leggings`,
    rating: {
      stars: 4.5,
      count: 24170
    },
    priceCents: 2298,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["womens", "shorts", "cloth", "leggings"]
  },

  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    discount: {
      discounted: true,
      discountPercentage: 42
    },
    sizes: true,
    image: [
        "styles/images/products/men-shirt-blue.jpg",
        "styles/images/products/men-shirt-blue1.jpg",
        "styles/images/products/men-shirt-blue2.jpg",
        "styles/images/products/men-shirt-blue3.jpg"
    ],
    banner: "styles/images/products-banner/men-shirt-banner.jpg",
    name: `Men's Henley Shirts Cotton Long Sleeve T-Shirts 3 Button Pocket Tops Lightweight Casual Basic Tee`,
    rating: {
      stars: 4.5,
      count: 370
    },
    priceCents: 2599,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["mens", "shirts", "cloth"]
  },

  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/men-polo.jpg",
        "styles/images/products/men-polo1.jpg",
        "styles/images/products/men-polo2.jpg",
        "styles/images/products/men-polo3.jpg"
    ],
    banner: "styles/images/products-banner/men-shirt-banner.jpg",
    name: `Men's Striped Polo Shirt Short Sleeve Casual Color Block Graphic Tee Collared Golf Shirts for Men`,
    rating: {
      stars: 4.5,
      count: 1048
    },
    priceCents: 1699,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["mens", "shirts", "cloth"]
  },

  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-white-shirt.jpg",
        "styles/images/products/women-white-shirt1.jpg",
        "styles/images/products/women-white-shirt2.jpg",
        "styles/images/products/women-white-shirt3.jpg"
    ],
    banner: "styles/images/products-banner/women-shirt-banner2.jpg",
    name: `Womens Basic T Shirts Summer Tops 2025 Crop Short Sleeve Y2k Tee Cute Gym Fashion Workout Clothes`,
    rating: {
      stars: 5,
      count: 2045
    },
    priceCents: 999,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["womens", "shirts", "cloth"]
  },

    {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: true,
    image: [
        "styles/images/products/women-shortsleeve.jpg",
        "styles/images/products/women-shortsleeve1.jpg",
        "styles/images/products/women-shortsleeve2.jpg",
        "styles/images/products/women-shortsleeve3.jpg"
    ],
    banner: "styles/images/products-banner/women-shirt-banner.jpg",
    name: `Women's Short Sleeve Summer Tops 2025 Trendy Ribbed Knit Button Up Tight Basic Tees Shirts Going Out Y2K Clothes`,
    rating: {
      stars: 5,
      count: 151
    },
    priceCents: 1499,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["womens", "shirts", "cloth"]
  },

  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    discount: {
      discounted: true,
      discountPercentage: 7
    },
    sizes: false,
    image: [
        "styles/images/products/electric-kettle.jpg",
        "styles/images/products/electric-kettle1.jpg",
        "styles/images/products/electric-kettle2.jpg",
        "styles/images/products/electric-kettle3.jpg"
    ],
    banner: "styles/images/products-banner/rice-cooker.jpg",
    name: "Electric Kettle, 1.5L Borosilicate Glass Countertop Water Heater and Boiler for Coffee or Tea, BPA-Free, Auto Shut-Off, Boil-Dry Protection",
    rating: {
      stars: 4.5,
      count: 51314
    },
    priceCents: 1999,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Product Dimensions'
      ],
      types: [
        'Crock-Pot',
        'Stainless Steel',
        'Stoneware',
        '16.9"D x 11.8"W x 10.4"H'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["appliances", "electric", "cook", "kitchen"]
  },

  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/headset.jpg",
        "styles/images/products/headset1.jpg",
        "styles/images/products/headset2.jpg",
        "styles/images/products/headset3.jpg"
    ],
    banner: "styles/images/products-banner/gaming-banner.jpg",
    name: "Wireless Gaming Headset, 2.4GHz Bluetooth Gaming Headphones with Noise Cancelling Microphone, 3D Stereo Sound",
    rating: {
      stars: 4.5,
      count: 360
    },
    priceCents: 2899,
    productDetails: {
      indicators: [
        'Brand',
        'Color',
        'Material',
        'Impedance'
      ],
      types: [
        'KOFIRE',
        'Stainless Steel',
        'Stoneware',
        '32 Ohm'
      ]
    },
    aboutItem: [
      'Generous Capacity: 7-quart slow cooker that comfortably serves 9+ people or fits a 7-pound roast',
      'Cooking Flexibility: High or low slow cooking settings, with convenient warm function for ideal serving temperature',
      'Convenient: Set it and forget it feature enables you to cook while at work or performing daily tasks',
      'Minimal Clean-Up: One-pot cooking reduces dishes; lid and removable stoneware are dishwasher safe'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'mens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["electronics", "electric", "game", "sounds"]
  },

  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/women-bag-leather.jpg",
        "styles/images/products/women-bag-leather1.jpg",
        "styles/images/products/women-bag-leather2.jpg",
        "styles/images/products/women-bag-leather3.jpg"
    ],
    banner: "styles/images/products-banner/women-bag-banner.jpg",
    name: "Handbags for Women Designer Fashion Purses Top Handle Satchel Shoulder Bags 2pcs with Small Wallet",
    rating: {
      stars: 4,
      count: 100
    },
    priceCents: 5995,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'womens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["women", "bag", "storage"]
  },

  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/women-bag-pink.jpg",
        "styles/images/products/women-bag-pink1.jpg",
        "styles/images/products/women-bag-pink2.jpg",
        "styles/images/products/women-bag-pink3.jpg"
    ],
    banner: "styles/images/products-banner/women-bag-banner.jpg",
    name: "Triple Compartments Purses and Handbags for Women Fashion Ladies Satchel Shoulder Top Handle Bag",
    rating: {
      stars: 4,
      count: 501
    },
    priceCents: 3299,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'womens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["women", "bag", "storage"]
  },

  {
    id: "1c079479-8586-494f-ab53-219325432536",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/men-bag-black.jpg",
        "styles/images/products/men-bag-black1.jpg",
        "styles/images/products/men-bag-black2.jpg",
        "styles/images/products/men-bag-black3.jpg"
    ],
    banner: "styles/images/products-banner/men-bag-banner.jpg",
    name: "Mens Shoulder Bags Crossbody, Large Sling Bag with Water Bottle Holder, Travel Hiking Chest Bag Daypack",
    rating: {
      stars: 4,
      count: 989
    },
    priceCents: 3999,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'womens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["mens", "bag", "storage"]
  },

  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    discount: {
      discounted: false,
      discountPercentage: 0
    },
    sizes: false,
    image: [
        "styles/images/products/men-bag-gray.jpg",
        "styles/images/products/men-bag-gray1.jpg",
        "styles/images/products/men-bag-gray2.jpg",
        "styles/images/products/men-bag-gray3.jpg"
    ],
    banner: "styles/images/products-banner/men-bag-banner.jpg",
    name: "Lanola Water-resistant Canvas Backpack with Anti-Theft Pocket, Daypacks Fits 15.6 Inch Laptop for Men Perfect for Work, Travel, Daily Use (Grey)",
    rating: {
      stars: 4,
      count: 230
    },
    priceCents: 3499,
    productDetails: {
      indicators: [
        'Fabric Type',
        'Care Instructions',
        'Origin',
        'Closure Type'
      ],
      types: [
        '80% Cotton, 20% Polyester',
        'Machine Wash',
        'Imported',
        'Pull on'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'womens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["mens", "bag", "storage"]
  },

  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    discount: {
      discounted: true,
      discountPercentage: 24
    },
    sizes: false,
    image: [
        "styles/images/products/lenovo-laptop.jpg",
        "styles/images/products/lenovo-laptop1.jpg",
        "styles/images/products/lenovo-laptop2.jpg",
        "styles/images/products/lenovo-laptop3.jpg"
    ],
    banner: "styles/images/products-banner/gaming-banner.jpg",
    name: "Lenovo IdeaPad 3i Chromebook, 15.6” FHD Display, Intel Celeron N4500, 8GB RAM, 64GB eMMC, 1920x1080 px, 720p Camera, Chrome OS, Abyss Blue",
    rating: {
      stars: 4,
      count: 230
    },
    priceCents: 28999,
    productDetails: {
      indicators: [
        'Brand',
        'Model Name',
        'Hard Disk Size',
        'CPU Model'
      ],
      types: [
        'Lenovo',
        'IdealPad 3',
        '64 GB',
        'Celeron P4500'
      ]
    },
    aboutItem: [
      'Ultra-soft cotton-blend fleece with brushed inside for extra warmth.',
      'Front kangaroo pocket.',
      'Ribbed cuffs & bottom hem.',
      'UA Rival Fleece Hoodie, Black, XS'
    ],
    moreProductDetails: {
      itemModelNumber: 'MAE55017FL18',
      department: 'womens',
      dateFirstAvailable: 'September 30, 2022',
      manufacturer: 'Under Armour',
      asin: 'B0BGVRTRKD',
      bestSellersRank: "#84 in Our Brands (See Top 100 in Our Brands) #4 in Men's Jeans",
      productDescription: "Amazon Essentials is focused on creating affordable, high-quality, and long-lasting everyday clothing you can rely on. Our line of men's must-haves includes polo shirts, chino pants, classic-fit shorts, casual button-downs, and crew-neck tees. Our consistent sizing takes the guesswork out of shopping, and each piece is put to the test to maintain the highest standards in quality and comfort."
    },
    keywords: ["electornics", "laptop", "computer", "gaming"]
  },
];