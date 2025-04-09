module.exports = function (callback) {
    setInterval(() => {
      const price = (Math.random() * (30000 - 25000) + 25000).toFixed(2);
      callback(price);
    }, 1000);
  };