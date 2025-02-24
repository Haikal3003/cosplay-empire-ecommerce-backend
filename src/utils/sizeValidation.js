const validSizes = ['S', 'M', 'L', 'XL'];

function validateSizes(sizes) {
  if (!Array.isArray(sizes)) {
    return ['Sizes must be an array'];
  }

  const invalidSizes = sizes.filter((size) => typeof size !== 'object' || !validSizes.includes(size.size));

  return invalidSizes;
}

module.exports = { validateSizes };
