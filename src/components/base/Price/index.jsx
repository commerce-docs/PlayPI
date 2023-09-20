/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
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
