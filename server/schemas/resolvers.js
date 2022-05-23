// in save book resolver pull username off the contect
// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    getSingleUser: async (parent, args) => {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : args.id }, { username: args.username }],
      });

      if (!foundUser) {
        // if no user found, error out
        throw new AuthenticationError("Can't find this user");
      }

      return foundUser;
    },
  },
  Mutation: {
    saveBook: async (parent, args, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: args.book } }
          );
          return updatedUser; // in apollo only the object is returned by the resolver and apollo maps everything
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    deleteBook: async ({ parent, args, context }) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
          );
          return updatedUser; // in apollo only the object is returned by the resolver and apollo maps everything
        }
        throw new AuthenticationError("You need to be logged in!");
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
  login: async (parent, args) => {
    const user = await User.findOne({ email });
    if (!user) {
      // if no user found, error out
      throw new AuthenticationError("Can't find this user");
    }
    // isCorrectPassword is a custom method fromt the User model that checks the PW
    // and returns a boolean
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      // if bad password, error out
      throw new AuthenticationError("incorrect credentials");
    }
    // assign a token and return it and the authenticated user
    const token = signToken(user);
    return { token, user };
  },
  createUser: async (parent, args) => {
    const user = await User.create(args); // create the user with passed in args
    const token = signToken(user); // assign a token
    return { token, user }; // return the token and user
  },
};

module.exports = resolvers;
