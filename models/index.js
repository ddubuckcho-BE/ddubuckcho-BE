const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/ddubuckcho', {
      user: "test",
      pass: "test",
      ignoreUndefined: true,
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connect;
