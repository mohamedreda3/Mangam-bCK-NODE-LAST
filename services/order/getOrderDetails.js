const Get_Order_Details = require("../../repositories/order");
const get_Order_Details = new Get_Order_Details();
const Group = require("../../functions/groupProducts");

module.exports = class {
  constructor() {}

  async getDetails(req, res) {
    const user_id = req?.query?.user_id;
    const order_id = req?.query?.order_id;
// console.log(user_id);
    try {
      let {
        order,
        product,
        colors,
        images,
        customerReviews,
        props,
        props_values,
        shipping,
      } = await get_Order_Details.getOrderDetails(user_id, order_id);

      let products = product;
      Group({ products, colors, images, customerReviews, props, props_values });
      if (order && order.length) {
        order[0].products = products;
        order[0].shipping = shipping;
        res.send(
          order.length
            ? { status: 1, message: order }
            : { status: 0, message:[] }
        );
      } else {
        res.status(404).send({ status: 0, message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 0, message: "Internal Server Error" });
    }
  }
};
