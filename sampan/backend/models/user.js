const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  mongoosePaginate = require('mongoose-paginate')
  bcrypt = require("bcryptjs");

// create a schema
const userSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"]
    },
    local: {
      firstname: {
        type: String,
        lowercase: true,
        match: [/^[a-zA-Z]/, "Alphabet only"] // Letter Only
      },
      lastname: {
        type: String,
        lowercase: true,
        match: [/^[a-zA-Z]/, "Alphabet only"] // Letter Only
      },
      password: {
        type: String,
        minlength: [6, "Minimum Character 6"],
        maxlength: [14, "Maximum Character 14"],
        required: [true, "Password is required"]
      },
      email: {
        type: String,
        match: [/\S+@\S+\.\S+/],
        lowercase: true,
        required: [true, "Email is required"]
      },
      avatar: {
        type: String,
        required: false
      },
      username: {
        type: String,
        lowercase: true,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
      },
      phone: {
        type: Number,
        match: [0 - 9], // Number Only
        unique: [true, "Phone already exists"]
      },
      address: {
        type: String
      },
      trainingId: {
        type: Schema.Types.ObjectId,
        ref: "Training",
        default: null
      },
      cityId: {
        type: Schema.Types.ObjectId,
        ref: "City"
      },
      deletedAt: {
        type: Date,
        default: null
      },
      review: [{
        type: Schema.Types.ObjectId, ref: 'ReviewUser'
      }]
    },
    google: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    facebook: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    verify: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be Unique"
});

userSchema.pre("save", async function(next) {
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

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    return null;
  }
};
userSchema.plugin(mongoosePaginate)
// exports the model
module.exports = mongoose.model("User", userSchema);
