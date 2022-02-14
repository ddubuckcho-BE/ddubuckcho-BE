const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL || 'mongodb://test:test@localhost:27017/ddubuckcho', {
      ignoreUndefined: true,
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connect;
