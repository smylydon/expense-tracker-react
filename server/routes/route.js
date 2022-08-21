const routes = require("express").Router();
const controllers = require("../controller/controller");

routes.route("/api/category").get(controllers.getAllCategories);
routes.route("/api/category/:id").get(controllers.getCategory);
routes.route("/api/category").post(controllers.createCategory);

routes.route("/api/transaction").get(controllers.getAllTransactions);
routes.route("/api/transaction/:id").get(controllers.getTransaction);

routes.route("/api/transaction").post(controllers.createTranaction);
routes.route("/api/transaction").delete(controllers.deleteTranaction);

routes.route("/api/labels").get(controllers.getLabels);

module.exports = routes;
