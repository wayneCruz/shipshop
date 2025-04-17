import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from '../utils/isWeekend.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0 
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  })
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){  
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isSatSun(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}

export function displayDeliveryDetails(){
  return {
    fastest: getFastestDelivery(),
    free: getFreeDelivery()
  }
}

function getFastestDelivery(){
  let deliveryDate = dayjs();

  let remainingDays = 1;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isSatSun(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }
  const fastestDateString = deliveryDate.format('dddd, MMMM D');
  return fastestDateString;
}

function getFreeDelivery(){
  let deliveryDate = dayjs();

  let remainingDays = 7;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isSatSun(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }
  const freeDateString = deliveryDate.format('dddd, MMMM D');
  return freeDateString;
}