const ProductRepository = require("../../repositories/product");
const productRepository = new ProductRepository();
const Group = require("../../functions/groupProducts");

module.exports = class {
  constructor() {}
  async searchProduct(req, res) {
    const { products, images, colors, customerReviews, props, props_values } =
      await productRepository.searchProduct(req?.body?.token);
    const product = Group({
      products,
      images,
      colors,
      customerReviews,
      props,
      props_values,
    });

    res.send(
      product.length
        ? { status: 1, message: product }
        : { status: 0, message:[] }
    );
  }
};
