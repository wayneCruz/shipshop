export default function isSatSun(date){
  const dayOfWeek = date.format('dddd');

  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}