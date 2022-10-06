module.exports = function transactionController(models) {
  return {
    createTranaction(req, res) {
      if (!req.body) {
        res.status(400).json("Post HTTP Data not provided");
      }
      const { name, type, amount } = req.body;
      const Create = models.fetchNewModel("Transaction", {
        name,
        type,
        amount,
      });

      Create.save()
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error while creating Transaction ${err}`,
          });
        });
    },

    getTransaction(req, res) {
      const Transaction = models.get("Transaction");

      Transaction.find({
        _id: req.params.id,
      })
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error while getting Transaction ${err}`,
          });
        });
    },

    getAllTransactions(req, res) {
      const Transaction = models.get("Transaction");

      Transaction.find({})
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error while getting transaction ${err}`,
          });
        });
    },

    deleteTranaction(req, res) {
      if (!req.body) {
        res.status(400).json("Post HTTP Data not provided");
      }

      const Transaction = models.get("Transaction");

      Transaction.deleteOne(req.body)
        .then(() => {
          res.status(205).json(`Transaction ${req.params.id} deleted.`);
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error while deleting Transaction ${err}`,
          });
        });
    },
  };
};
