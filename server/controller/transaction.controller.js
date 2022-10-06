const model = require("../models/model");

function createTranaction(req, res) {
  if (!req.body) {
    res.status(400).json("Post HTTP Data not provided");
  }
  const { name, type, amount } = req.body;
  const Create = new model.Transaction({
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
}

function getTransaction(req, res) {
  const Transaction = model.Transaction;

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
}

function getAllTransactions(req, res) {
  const Transaction = model.Transaction;

  Transaction.find({})
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error while getting transaction ${err}`,
      });
    });
}

function deleteTranaction(req, res) {
  if (!req.body) {
    res.status(400).json("Post HTTP Data not provided");
  }

  const Transaction = model.Transaction;

  Transaction.deleteOne(req.body)
    .then(() => {
      res.status(205).json(`Transaction ${req.params.id} deleted.`);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error while deleting Transaction ${err}`,
      });
    });
}

module.exports = {
  createTranaction,
  getAllTransactions,
  getTransaction,
  deleteTranaction,
};
