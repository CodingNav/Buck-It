const { AuthenticationError } = require('apollo-server-express');
const { User, BucketList, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const { uploadImage } = require('../utils/imgur');

// Think about what action users can do with and without login
// If things need to happen with login, then the Query needs context and auth error

const resolvers = {
  Query: {
    // Access current user's profile
    me: async (parent, args, context) => {
      if (context.user) {
        // excludes password form User object
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('Not logged in!');
    },
    // Find all users
    users: async () => {
      return User.find();
    },
    // Find a single user
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // Find following information
    followingList: async (parent, { username }) => { 
      return await User.findOne({ username }).populate('following');
    },
    followersList: async (parent, { username }) => {
      return await User.findOne({ username }).populate('followers');
    },
    // Find all bucket lists
    getBucketLists: async (parent, { id }) => {
      return BucketList.find({ createdBy: id });
    },
    // Find a single bucket list
    getBucketList: async (parent, { _id }) => {
      return await BucketList.findOne({ _id });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, username, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ $or: [{ email: email }, { username: username }] });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const checkPassword = await user.checkPassword(password);

      if (!checkPassword) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { userData }, context) => {
      if (context.user) {
        if (userData.picture) {
          userData.picture = await uploadImage(userData.picture);
        }
        if (userData.banner_picture) {
          userData.banner_picture = await uploadImage(userData.banner_picture);
        }
        const user = await User.findById({ _id: context.user._id });
        Object.assign(user, userData);
        await user.save();
        return user;
      }
      throw new AuthenticationError('User not logged in');
    },
    followUser: async (parent, { followId, isFollowing }, context) => {
      if (context.user) {
        if (context.user._id == followId) {
          throw new Error("Can't follow yourself");
        }
        const action = isFollowing ? '$pull' : '$addToSet';
        const followingUser = await User.findByIdAndUpdate({ _id: context.user._id }, { [action]: { following: followId } }, { new: true });
        const followedUser = await User.findByIdAndUpdate({ _id: followId }, { [action]: { followers: context.user._id } }, { new: true });
        return { followingUser, followedUser };
      }
      throw new AuthenticationError('User not logged in');
    },
    addBucketList: async (parent, { listData }, context) => {
      // Check if logged in, then add bucket list to a user's profile
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { bucketList: { listData } } }, { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteBucketList: async (parent, { listId }, context) => {
      // check if logged in, then delete a bucket list from a user's profile
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { bucketList: { listId } } }, { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('User not logged in');
    },
    editBucketList: async(parent, { listId, listData }, context) =>{
      // check if logged in, then allow user to edit bucket list
      if (context.user) {
        const updatedList = await BucketList.findByIdAndUpdate(
          { _id: listId },
          { 
            name: listData.name,
            progress: listData.progress, 

          }
        );

        return updatedList;
      }
    },
    addPost: async (parent, { postData }, context) => {
      // check if logged in, then add a post to a user's bucket list
      if (context.user) {
        const updatedBucketList = await BucketList.findByIdAndUpdate({ _id: context.user.bucketList._id }, { $push: { post: { postData } } }, { new: true });
        return updatedBucketList;
      }
      throw new AuthenticationError('User not logged in');
    },
    deletePost: async (parent, { postId }, context) => {
      // check if logged in then delete a post from a user's bucket list
      if (context.user) {
        const updatedBucketList = await BucketList.findByIdAndUpdate({ _id: context.user.bucketList._id }, { $pull: { post: { postId } } }, { new: true });
        return updatedBucketList;
      }
      throw new AuthenticationError('User not logged in');
    },
    addComment: async (parent, { commentData }, context) => {
      // check if logged in, then add a comment to a post
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate({ _id: context.user.bucketlist.post._id }, { $push: { comment: { commentData } } }, { new: true });
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    },
    deleteComment: async (parent, { commentId }, context) => {
      // check if logged in, then delete a comment from a user's post
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate({ _id: context.user.bucketList.post._id }, { $pull: { comment: { commentId } } }, { new: true });
        return updatedPost;
      }
      throw new AuthenticationError('User not logged in');
    },
  },
};

module.exports = resolvers;
