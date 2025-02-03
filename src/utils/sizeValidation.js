const validSizes = ['S', 'M', 'L', 'XL'];

function validateSizes(sizes) {
  const invalidSizes = sizes.filter((size) => !validSizes.includes(size.size));
  return invalidSizes;
}

module.exports = { validateSizes };
