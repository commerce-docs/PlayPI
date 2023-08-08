export function formatPrice(price) {
  return '$' + price.toFixed(2);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
