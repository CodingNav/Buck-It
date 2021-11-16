import React, { useState } from 'react';

// BOOTSTRAP COMPONENTS
import { Form, Button } from 'react-bootstrap';

const UserEditSettings = (props) => {
  console.log(props);

  const [formState, setFormState] = useState({});

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // ON FORM SUBMIT
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      return false;
    }
    delete formState.confirmPassword;

    props.updateProfile(event, formState);
  };

  // UPDATING "formState" BASED ON INPUT CHANGES
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    console.log(name, files[0]);
    setFormState({
      ...formState,
      [name]: files[0],
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {/* EMAIL */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control type='email' name='email' defaultValue={props.userData.email} onChange={handleChange} />
        </Form.Group>
        {/* PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          <Form.Control type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} />
        </Form.Group>
        {/* CONFIRM PASSWORD */}
        <p className='mb-2' style={{ display: formState.password !== '' && formState.password !== formState.confirmPassword && formState.confirmPassword !== '' ? 'block' : 'none', color: 'red' }}>
          Passwords don't match
        </p>
        {/* ABOUT ME */}
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='bio'>About Me</Form.Label>
          <Form.Control as='textarea' name='bio' placeholder='Current bio is empty' defaultValue={props.userData.bio} onChange={handleChange} rows={3} />
        </Form.Group>
        {/* PROFILE PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control type='file' name='picture' accept='image/*' onChange={handleFileChange} />
        </Form.Group>

        {/* BANNER PHOTO */}
        <Form.Group className='mb-2'>
          <Form.Label>Profile Banner</Form.Label>
          <Form.Control type='file' name='banner_picture' accept='image/*' onChange={handleFileChange} />
        </Form.Group>
        {/* PRIVACY RADIO */}
        <Form.Check className='mb-2' type='switch' id='custom-switch' name='privacy_mode' defaultChecked={props.userData.privacy_mode} onChange={(e) => setFormState({ ...formState, privacy_mode: e.target.checked })} label='Private' />

        {/* UPDATE BUTTON  */}
        <Button variant='success' type='submit'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default UserEditSettings;