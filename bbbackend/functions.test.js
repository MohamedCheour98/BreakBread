const userServices = require("./models/user-services");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { test } = require("prettier");

test("test db query user Joe", async () => {
  let result = await userServices.findUserByName("joe");
  console.log(result);
  console.log(result[0]);
  console.log(result[0].name);

  expect(result[0].name).toBe("joe");
  expect(result[0].password).toBe("joejoe");
});
