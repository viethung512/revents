import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

// actions
import { login } from '../authActions';

const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const handleLogin = ({ email, password }) => dispatch(login({ email }));

  return (
    <Form error size='large' onSubmit={handleSubmit(handleLogin)}>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        <Button fluid size='large' color='teal'>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
