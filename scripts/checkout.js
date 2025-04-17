import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { renderSlidingSection } from './data/slidingSection.js';
import { searchFunction } from './data/products.js';
import { controlSlidingSection } from './utils/controlls.js';
import { renderFooter } from './footer.js';

renderOrderSummary();
renderPaymentSummary();
renderSlidingSection();
searchFunction();
controlSlidingSection();
renderFooter();