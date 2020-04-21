import React from 'react';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, matchesField } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import { updatePassword } from '../../auth/authActions';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Please enter your password' }),
  newPassword2: matchesField('newPassword1')({
    message: 'Password does not match',
  }),
});

const AccountPage = ({ error, invalid, submitting, handleSubmit }) => {
  const dispatch = useDispatch();
  const { providerId } = useSelector(
    state => state.firebase.auth.providerData[0]
  );

  const handleUpdatePassword = values => dispatch(updatePassword(values));

  const accountContent =
    providerId &&
    (providerId === 'password' ? (
      <div>
        <Header color='teal' sub content='Change password' />
        <p>Use this form to update your account settings</p>
        <Form onSubmit={handleSubmit(handleUpdatePassword)}>
          <Field
            width={8}
            name='newPassword1'
            type='password'
            pointing='left'
            inline={true}
            component={TextInput}
            basic={true}
            placeholder='New Password'
          />
          <Field
            width={8}
            name='newPassword2'
            type='password'
            inline={true}
            basic={true}
            pointing='left'
            component={TextInput}
            placeholder='Confirm Password'
          />
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Divider />
          <Button
            size='large'
            positive
            content='Update Password'
            disabled={invalid || submitting}
          />
        </Form>
      </div>
    ) : providerId === 'facebook.com' ? (
      <div>
        <Header color='teal' sub content='Facebook Account' />
        <p>Please visit Facebook to update your account settings</p>
        <Button type='button' color='facebook'>
          <Icon name='facebook' />
          Go to Facebook
        </Button>
      </div>
    ) : (
      <div>
        <Header color='teal' sub content='Google Account' />
        <p>Please visit Google to update your account settings</p>
        <Button type='button' color='google plus'>
          <Icon name='google plus' />
          Go to Google
        </Button>
      </div>
    ));

  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {accountContent}
    </Segment>
  );
};

export default reduxForm({ form: 'account', validate: validate })(AccountPage);
