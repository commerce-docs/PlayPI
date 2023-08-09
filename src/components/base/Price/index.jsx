export default function Price({ product, price }) {
  if (product) {
    return formatPrice(product.price_range.minimum_price.final_price.value);
  }
  return formatPrice(price.minimum_price.final_price.value);
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}
