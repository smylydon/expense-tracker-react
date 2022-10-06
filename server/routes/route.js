const routes = require("express").Router();
const transactionControllers = require("../controller/transaction.controller");
const categoryControllers = require("../controller/category.controller");
const labelControllers = require("../controller/label.controller");

routes.route("/api/category").get(categoryControllers.getAllCategories);
routes.route("/api/category/:id").get(categoryControllers.getCategory);
routes.route("/api/category").post(categoryControllers.createCategory);

routes.route("/api/transaction").get(transactionControllers.getAllTransactions);
routes.route("/api/transaction/:id").get(transactionControllers.getTransaction);

routes.route("/api/transaction").post(transactionControllers.createTranaction);
routes
  .route("/api/transaction")
  .delete(transactionControllers.deleteTranaction);

routes.route("/api/label").get(labelControllers.getLabels);

module.exports = routes;
