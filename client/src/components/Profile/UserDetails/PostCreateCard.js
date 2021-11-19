// Create Modal for BucketList
import React, { useState } from 'react';
import PostModal from './PostModal';
import '../Profile.css';
import { GET_BUCKETLISTS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../../utils/auth';

import { Card, Col, Form, Button, Row, Stack, Modal } from 'react-bootstrap';

const PostCreateCard = () => {
  const [post, setPost] = useState(false);

  const userId = Auth.getProfile().data._id;
  const { loading, error, data } = useQuery(GET_BUCKETLISTS, {
    variables: { id: userId },
  });

  if (loading) return null;
  if (error) return 'error';

  return (
    <>
      {/* NEED TO CREATE FUNCTIONALITY TO ITERATE THROUGH THE USER BUCKETS */}
      <Col sm={8} md={8} lg={8} className='pb-2'>
        <Card className='shadow mb-2 h-100'>
          <Card.Header>
            <Stack direction='horizontal' gap={3} className='align-items-center justify-content-between'>
              <div className='fs-4'>Buckit List</div>
              <Button onClick={() => setPost(true)} className='buckitListBtnStyle'>
                {/* Create function to create bucket list */}
                {/* <PlusLg size={30} /> */}
                <span className='BuckitListPlus'>+</span>
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            {data.getBucketLists.map((item, index) => (
              <Row className='d-flex flex-row g-2 pb-2' key={index}>
                <Stack direction='horizontal' gap={2}>
                  <Col xs={4} sm={4} md={3} lg={2}>
                    <Form.Select className='pe-4' defaultValue={item.progress}>
                      <option value='To Do'>To Do</option>
                      <option value='In Progress'>In Progress</option>
                      <option value='Complete'>Complete</option>
                    </Form.Select>
                  </Col>
                  <Col xs={8} sm={8} md={9} lg={10}>
                    <div className='scrollForm'>{item.name}</div>
                  </Col>
                </Stack>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Col>

      {/* /////////////////////////////////////////////////// */}
      {/* POST MODAL */}
      {/* /////////////////////////////////////////////////// */}
      <Modal show={post} onHide={() => setPost(false)} backdrop='static' keyboard={false} className='modal-dialog-scrollable modal-md'>
        <PostModal />
      </Modal>
    </>
  );
};

export default PostCreateCard;
