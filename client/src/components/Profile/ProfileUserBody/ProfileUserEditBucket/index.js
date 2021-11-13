import React, { useState } from 'react';
import BucketForms from './ProfileEditForms/userBucketsEdits';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const ProfileUserEditBucket = () => {
  const [navData, setNavData] = useState('Create');

  const [state] = useState({
    tags: ['Create', 'To Do', 'In Progress', 'Complete'],
  });

  return (
    <Col sm={8} md={8} lg={8}>
      <Card className='shadow h-100'>
        <Card.Body>
          <Card.Title>
            <Nav fill variant='tabs' defaultActiveKey='1'>
              {/* DYNAMICALLY CREATING NAVBAR ITEMS */}
              {state.tags.map((item, i) => {
                return (
                  <Nav.Item key={i}>
                    <Nav.Link eventKey={i + 1} className='text-dark px-0' onClick={(e) => setNavData(e.target.text)}>
                      {item}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Card.Title>
          {/* PASSING THE ACTIVE NAV TAB TO THE BUCKET FORMS AS A PROP INORDER TO DISPLAY CONTENT */}
          <BucketForms handleBucketForm={navData} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProfileUserEditBucket;
