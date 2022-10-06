module.exports = function categoryController(models) {
  return {
    createCategory(req, res) {
      // const Create = new model.Categories({
      //   type: "Investment",
      //   color: "#fcbe44",
      // });
      if (!req.body) {
        res.status(400).json("Post HTTP Data not provided");
      }
      const { type, color } = req.body;

      const Create = models.fetchNewModel("Categories", {
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
    },

    getCategory(req, res) {
      const Categories = models.get("Categories");

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
    },

    getAllCategories(req, res) {
      const Categories = models.get("Categories");

      Categories.find({})
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error while getting Categories ${err}`,
          });
        });
    },
  };
};
