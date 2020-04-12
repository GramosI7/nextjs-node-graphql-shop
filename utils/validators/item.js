module.exports = valideCreateItem = (title, description, price) => {
  const errors = {};
  if (title.trim() === "") errors.title = "Title must be not empty.";
  if (description === "") errors.description = "Description must be not empty.";
  if (price === 0) errors.price = "Price must be more than 0.";
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
