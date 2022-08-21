import _ from "lodash";

export function getSum(transaction, type) {
  const amountSum = _(transaction)
    .groupBy("type")
    .map((obj, key) => {
      if (!type) return _.sumBy(obj, "amount");
      return {
        type: key,
        color: obj[0].color,
        total: _.sumBy(obj, "amount"),
      };
    })
    .value();

  return amountSum;
}

export function getLabels(transaction) {
  const amountSum = getSum(transaction, "type");
  const total = _.sum(getSum(transaction));
  const percentage = _(amountSum)
    .map((obj) => _.assign(obj, { percent: (100 * obj.total) / total }))
    .value();

  return percentage;
}

export function chartData(transaction) {
  const backgroundColor = _(transaction)
    .map((t) => t.color)
    .uniq()
    .value();
  const dataValue = getSum(transaction);

  const confg = {
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: dataValue,
          backgroundColor,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return confg;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
