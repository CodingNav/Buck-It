import React from 'react';

import ProfileUserDetails from './ProfileUserDetails';
import ProfileUserEditBucket from './ProfileUserEditBucket';

import { Container, Row } from 'react-bootstrap';

const ProfileUserBody = (props) => {
  //////////////////////////////////////////////////////////////
  // CSS STYLING
  //////////////////////////////////////////////////////////////
  let editProfileCardStyle = {
    fontFamily: 'Rubik',
  };
  //////////////////////////////////////////////////////////////

  return (
    <Container className='pb-2' style={editProfileCardStyle} fluid>
      <Row>
        <>
          <ProfileUserDetails userData={props.userData} />
          <ProfileUserEditBucket userData={props.userData} />
        </>
      </Row>
    </Container>
  );
};

export default ProfileUserBody;
