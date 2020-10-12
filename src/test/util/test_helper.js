const mongoose = require("mongoose");
const mocha = require("mocha");

mongoose.Promise = global.Promise;

const Planet = require("../../models/planet");

setTimeout(() => {
  beforeEach(async () => {
    mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    mongoose.connection
      .once("open", () => {
        done();
      })
      .on("error", (error) => {
        console.warn("Atenção: ", error);
      });
  });

  afterEach(async () => {
    Planet.deleteMany({}).then(() => {
      done();
    });
  });
});
