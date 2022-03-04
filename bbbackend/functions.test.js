const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

test("test db query user joe", async () => {
  let result = await userServices.findUserByNameAndPassword("joe", "joejoe");
  console.log(result);
  console.log(result[0]);
  console.log(result[0].username);

  expect(result[0].username).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});
