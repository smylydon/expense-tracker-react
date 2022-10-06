module.exports = function (model) {
  return {
    fetchNewModel(name, options) {
      if (model[name]) {
        return new model[name](options);
      } else {
        throw new Error("Model not found");
      }
    },
    get(name) {
      if (model[name]) {
        return model[name];
      } else {
        throw new Error("Model not found");
      }
    },
  };
};
