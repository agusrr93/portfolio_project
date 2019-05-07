const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs")

// create a schema
const adminSchema = new Schema({
  method: {
    type: String,
    enum: "local"
  },
  local: {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  }
});

adminSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.isValidPassword = async function(newPassword) {
  try {
    // console.log("this.local.password", this.local.password);
    // console.log("newPassword", newPassword);
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

// exports the model
module.exports = mongoose.model("Admin", adminSchema);

