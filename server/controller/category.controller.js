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

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
};
