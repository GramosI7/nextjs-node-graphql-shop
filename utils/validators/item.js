export const valideCreateItem = (title, description, price, image) => {
  const errors = {};
  if (title.trim() === "") errors.title = "Please, title must be not empty.";
  // if (image.length < 3) errors.image = "Please, add 3 images in total.";
  if (price === 0) errors.price = "Please, price must be more than 0.";
  if (description.trim() === "") errors.description = "Please, description must be not empty.";
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
