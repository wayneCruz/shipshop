  //load the cart quantity by getting the saved data from
  //the localstorage then update the HTML using DOM
  export function updateCartQuantity (){
    const cartQuantity = `${JSON.parse(localStorage.getItem('totalQuantity'))} items` || '';
    const headerElement = document.querySelector('.js-checkout-header-middle-section');

    const html =
    `
    Checkout (<a class="return-to-home-link 
    js-checkout-header-quantity"
    href="store.html">${cartQuantity} items</a>)
    `
    headerElement.innerHTML = html;
  }