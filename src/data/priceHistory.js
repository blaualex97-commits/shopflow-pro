const priceHistory = {
  1: [4899, 4799, 4699, 4599, 4699, 4499, 4399, 4299],
  2: [1099, 1049, 999, 979, 949, 929, 899, 899],
  3: [6599, 6499, 6399, 6299, 6199, 6099, 5999, 5999],
  4: [929, 899, 879, 849, 829, 799, 769, 749],
};

export function getPriceHistory(productId, currentPrice) {
  const savedHistory = priceHistory[Number(productId)];

  if (savedHistory) {
    return [...savedHistory.slice(0, -1), Number(currentPrice)];
  }

  const price = Number(currentPrice) || 0;

  return [
    Math.round(price * 1.12),
    Math.round(price * 1.1),
    Math.round(price * 1.08),
    Math.round(price * 1.09),
    Math.round(price * 1.05),
    Math.round(price * 1.04),
    Math.round(price * 1.02),
    price,
  ];
}