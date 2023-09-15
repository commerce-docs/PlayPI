/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it.
*/

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
