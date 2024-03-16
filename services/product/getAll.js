const ProductRepository = require("../../repositories/product");
const productRepository = new ProductRepository();
const Group = require("../../functions/groupProducts");
module.exports = class {
  constructor() {}
  async getAll(req, res) {
    let type = req?.query?.type;
    let { products, colors, images, customerReviews, props, props_values } =
      await productRepository.getAll(req, res, type);
    Group({ products, colors, images, customerReviews, props, props_values });
    res.send(
      products.length
        ? { status: 1, message: products }
        : { status: 0, message:[] }
    );
  }
};
