import React from 'react';

import ProfileHeader from './ProfileHeader';
import ProfileUserBody from './ProfileUserBody';

const mainUserProfile = (props) => {
  return (
    <>
      <ProfileHeader userData={props.userData} />
      <ProfileUserBody userData={props.userData} />
    </>
  );
};

export default mainUserProfile;
