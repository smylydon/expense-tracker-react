const model = require("../models/model");

function createCategory(req, res) {
  // const Create = new model.Categories({
  //   type: "Investment",
  //   color: "#fcbe44",
  // });
  if (!req.body) {
    res.status(400).json("Post HTTP Data not provided");
  }
  const { type, color } = req.body;
  const Create = new model.Categories({
    type,
    color,
  });

  Create.save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error while creating Category ${err}`,
      });
    });
}

function getCategory(req, res) {
  const Categories = model.Categories;

  Categories.find({
    _id: req.params.id,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error while getting Category ${err}`,
      });
    });
}

function getAllCategories(req, res) {
  const Categories = model.Categories;

  Categories.find({})
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error while getting Categories ${err}`,
      });
    });
}

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

function getLabels(req, res) {
  const Transaction = model.Transaction;

  Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      const data = result.map((x) => {
        return Object.assign(
          {},
          {
            _id: x._id,
            name: x.name,
            type: x.type,
            amount: x.amount,
            color: x.categories_info["color"],
          }
        );
      });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json("Lookup Collection Crror.");
    });
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  createTranaction,
  getAllTransactions,
  getTransaction,
  deleteTranaction,
  getLabels,
};
