export default function Price({ productDetails, price }) {
  if (productDetails) {
    return formatPrice(
      productDetails.price_range.minimum_price.final_price.value
    );
  }
  return formatPrice(price.minimum_price.final_price.value);
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}
