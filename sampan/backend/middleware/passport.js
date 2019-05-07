const passport = require("passport"),
  jwtStrategy = require("passport-jwt").Strategy,
  { ExtractJwt } = require("passport-jwt"),
  JWT_SECRET = process.env.JWT_SECRET,
  GooglePlusTokenStrategy = require("passport-google-plus-token");
(LocalStrategy = require("passport-local")),
  (LocalStrategyAdmin = require("passport-local"));
User = require("../models/user", (Admin = require("../models/admin")), (mongoose = require("mongoose")), passport.use(

  // JSON WEB TOKENS STRATEGY
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        const { role } = payload;
        let user = null;
        role === "user"
          ? // Find the user specified in token
          (user = await User.findOne({ "local.email": payload.sub }))
          : (user = await Admin.findOne({ "local.email": payload.sub }));
        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
), passport.use(
  // GOOGLE OAUTH STRATEGY
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        done(null, profile);

        // Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("user is already exist!");
          return done(null, existingUser);
        }

        console.log("User doesn't exist in our DB!, we are creating");
        // If new account
        const newUserLocal = new User({
          method: "local",
          local: {
            username: profile.emails[0].value,
            email: profile.emails[0].value,
            password: "123456"
          },
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUserLocal.save();

        done(null, newUserLocal);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
), passport.use(
  // LOCAL STRATEGY
  new LocalStrategy(
    {
      usernameField: "email"
    },

    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });
        // If not, handle its
        if (!user) {
          return done(null, "Wrong Email");
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
          return done(null, "Wrong Password");
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
), passport.use(
  // LOCAL STRATEGY ADMIN
  "admin",
  new LocalStrategyAdmin(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        
        // Find the user given the email
        const admin = await Admin.findOne({ "local.email": email });
        
        // If not, handle it
        if (!admin) {
          return done(null, "Wrong Email");
        }
        // Check if the password is correct
        const isMatch = await admin.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, "Wrong Password");
        }
        // Otherwise, return the user
        // console.log("user from passport", admin);
        done(null, admin);
      } catch (error) {
        done(error, false);
      }
    }
  )
));
