import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bio
      picture
      banner_picture
      followers
      following
      privacy_mode
      bucketList
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      picture
      banner_picture
      followers
      following
      privacy_mode
      bucketList
    }
  }
`;

export const GET_FOLLOWING = gql`
  query followingList($username: String!) {
    followingList(username: $username) {
      following {
        username
        picture
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query followersList($username: String!) {
    followersList(username: $username) {
      followers {
        username
        picture
      }
    }
  }
`;

export const GET_BUCKETLISTS = gql`
  query bucketLists($userId: String!) {
    bucketLists(userId: $userId) {
      bucketList {
        _id
        name
        progress
        createdBy
        # I did not include the comments here
      }
    }
  }
`;

export const GET_BUCKETLIST = gql`
  query getBucketList($id: String!) {
    getBucketList(_id: $id) {
        name
        progress
    }
  }
`;
