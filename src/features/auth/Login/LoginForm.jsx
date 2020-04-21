import React from 'react';
import { useDispatch } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

// actions
import { login } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password'),
});

const LoginForm = ({ handleSubmit, error, invalid, submitting }) => {
  const dispatch = useDispatch();
  const handleLogin = values => dispatch(login(values));

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
        {error && (
          <Label basic color='red' style={{ marginBottom: 14, width: '100%' }}>
            {error}
          </Label>
        )}
        <Button
          fluid
          size='large'
          color='teal'
          disabled={invalid || submitting}
        >
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export default reduxForm({ form: 'loginForm', validate: validate })(LoginForm);
