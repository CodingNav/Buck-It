import React from 'react';
import Auth from '../../../utils/auth';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BoxArrowLeft } from 'react-bootstrap-icons';

const LogoutButton = () => {
  return (
    <LinkContainer to='/'>
      <Nav.Link
        onClick={Auth.logout}
        style={{
          color: 'white',
        }}
      >
        {/* Logout Icon */}
        <BoxArrowLeft size={36} />
      </Nav.Link>
    </LinkContainer>
  );
};

export default LogoutButton;