const mongoose = require('mongoose');
const config = require('../../src/config/config');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://"+config.mongoose.cosmosHost+":"+config.mongoose.cosmosPort+"/"+config.mongoose.cosmosDB+"?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tyree@", {
      auth: {
        user: config.mongoose.cosmosUser,
        password: config.mongoose.cosmosPassword
      },
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
