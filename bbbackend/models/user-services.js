const mongoose = require('mongoose');
const userModel = require("./user");
const dotenv = require("dotenv");

dotenv.config();
console.log("mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PWD +
  "@cluster0.g187p.mongodb.net/" +
  process.env.MONGO_DB +
  "?retryWrites=true&w=majority");
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@cluster0.g187p.mongodb.net/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

  /*  mongoose.connect(
    'mongodb://localhost:27017/users',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
).catch(error => console.log(error));*/

async function getUsers(name, job){
    let result;
    if(name && job){
       result = await findUserByJobAndName(name, job);
    }
    else if (name === undefined && job === undefined){
        result = await userModel.find();
    }

    else if (name && !job) {
        result = await findUserByName(name);
    }
    else if (job && !name){
        result = await findUserByJob(job);
    }
    return result;
}

async function findUserById(id){
    try{
        return await userModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    try{
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        console.log(error);
        return false;
    }
}

async function findUserByName(name){
    return await userModel.find({'name':name});
}

async function findUserByJob(job){
    return await userModel.find({'job':job});
}
async function findUserByJobAndName(name , job){
  console.log("fsdfnkjdfnuksdnfk");
    //let user = await findUserByName(name);
    //console.log(user);
    //let result = {(users_list: user)};
   //let users = {users_list: user};
   //return await users.find({'job':job});
   return await userModel.find({'name':name}).find({'job':job});
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
