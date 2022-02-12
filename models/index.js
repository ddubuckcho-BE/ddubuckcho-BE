const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017/ddubuckcho', {
      ignoreUndefined: true,
    })
    .catch((error) => {
      console.error(err);
    });
};

module.exports = connect;
