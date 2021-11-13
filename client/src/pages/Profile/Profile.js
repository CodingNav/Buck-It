import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER } from '../../utils/queries';

// IMPORT FOR THE CONSOLIDATED USER PROFILE PAGES
import MainUserProfile from '../../components/Profile/mainUserProfile';

const Profile = () => {
  let { username } = useParams();

  const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
    variables: { username },
  });

  let userData = data?.user || data?.me || {};

  // console.log(userData);

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <div className='rounded '>
        <MainUserProfile userData={userData} />
      </div>
    </>
  );
};

export default Profile;
