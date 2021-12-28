const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  customer: String,
  crust: String,
  cheese: String,
  sauce: String,
  toppings: [String]
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = {
  schema: pizzaSchema,
  model: Pizza
};
