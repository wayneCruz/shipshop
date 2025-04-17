export function renderFooter() {
  const html = `<div class="footer-logo-container">

        <a href="home.html">
          <img src="styles/icons/shop-logo.png">
          
          <div class="footer-logo-text">
            <p>ShipShop</p>
            <span>All Rights Reserved. 2025.</span>
          </div>
        </a>
      </div>
      
      <div class="all-rights-container">
        <ul class="all-rights-list">
          <li>
            Developed by: <strong>Wayne Cruz</strong>
          </li>
          <li class="account-icon-li">
            <a href="https://x.com/@UzumakiWayney" target="_blank">
              <img src="/styles/icons/X-icon-white.svg" alt="x-account"/>
            </a>
            <a href="https://github.com/wayneCruz" target="_blank">
            <img src="/styles/icons/github-icon-white.svg" alt="github-account"/>
            </a>
            <a href="https://www.linkedin.com/in/nylbert-wayne-cruz-128832339" target="_blank">
            <img src="/styles/icons/linkedin-icon-white.svg" alt="linkedin-account"/>
            </a>
            </li>
        </ul>
      </div>
    `;
  
  document.querySelector('.js-footer-container').innerHTML = html;
}