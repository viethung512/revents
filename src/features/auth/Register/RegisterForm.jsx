import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('emain'),
  password: isRequired('password'),
});

const RegisterForm = ({ handleSubmit, error, invalid, submitting }) => {
  const dispatch = useDispatch();
  const handleRegister = values => dispatch(registerUser(values));

  return (
    <div>
      <Form size='large' onSubmit={handleSubmit(handleRegister)}>
        <Segment>
          <Field
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Field
            name='email'
            type='text'
            component={TextInput}
            placeholder='Email'
          />
          <Field
            name='password'
            type='password'
            component={TextInput}
            placeholder='Password'
          />

          {error && (
            <Label
              basic
              color='red'
              style={{ marginBottom: 14, width: '100%' }}
            >
              {error}
            </Label>
          )}
          <Button
            fluid
            size='large'
            color='teal'
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

export default reduxForm({ form: 'registerForm', validate: validate })(
  RegisterForm
);
