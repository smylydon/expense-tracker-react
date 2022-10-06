const routes = require("express").Router();
const model = require("../models/model");
const modelWrapper = require("../models/wrapper")(model);

const transactionController = require("../controller/transaction.controller")(
  modelWrapper
);
const categoryController = require("../controller/category.controller")(
  modelWrapper
);
const labelController = require("../controller/label.controller")(modelWrapper);

routes.route("/api/category").get(categoryController.getAllCategories);
routes.route("/api/category/:id").get(categoryController.getCategory);
routes.route("/api/category").post(categoryController.createCategory);

routes.route("/api/transaction").get(transactionController.getAllTransactions);
routes.route("/api/transaction/:id").get(transactionController.getTransaction);

routes.route("/api/transaction").post(transactionController.createTranaction);
routes.route("/api/transaction").delete(transactionController.deleteTranaction);

routes.route("/api/label").get(labelController.getLabels);

module.exports = routes;
