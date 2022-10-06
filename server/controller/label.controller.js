module.exports = function LabelController(models) {
  function getLabels(req, res) {
    const Transaction = models.get("Transaction");

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

  return {
    getLabels,
  };
};
