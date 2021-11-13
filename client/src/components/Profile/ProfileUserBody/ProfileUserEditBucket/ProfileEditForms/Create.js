import React from 'react';

//////////////////////////////////////////////////////////
// Bootstrap Components
//////////////////////////////////////////////////////////
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

const BucketFormsCreate = (props) => {
  return (
    <div>
      {props.handleCreateForm === 'Create' && (
        <>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='Create' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control as='textarea' placeholder='Description' rows={3} />
            </Form.Group>
          </Form>
          <Button variant='primary'>To Do</Button> <Button variant='warning'>In Progress</Button> <Button variant='success'>Complete</Button>{' '}
        </>
      )}
    </div>
  );
};

export default BucketFormsCreate;