import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm, initialize } from 'redux-form';
import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { updateProfile } from '../userActions';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const AboutPage = ({ pristine, submitting, handleSubmit }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.firebase);

  useEffect(() => {
    dispatch(initialize('userProfile', profile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleUpdateProfile = values => dispatch(updateProfile(values));

  return (
    <Segment>
      <Header dividing size='large' content='About Me' />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field
            id='status--single'
            name='status'
            component={RadioInput}
            type='radio'
            value='single'
            label='Single'
          />
          <Field
            id='status--relationship'
            name='status'
            component={RadioInput}
            type='radio'
            value='relationship'
            label='Relationship'
          />
          <Field
            id='status--married'
            name='status'
            component={RadioInput}
            type='radio'
            value='married'
            label='Married'
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name='about' component={TextArea} placeholder='About Me' />
        <Field
          name='interests'
          component={SelectInput}
          options={interests}
          value='interests'
          multiple={true}
          placeholder='Select your interests'
        />
        <Field
          width={8}
          name='occupation'
          type='text'
          component={TextInput}
          placeholder='Occupation'
        />
        <Field
          width={8}
          name='origin'
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder='Country of Origin'
        />
        <Divider />
        <Button
          disabled={submitting || pristine}
          size='large'
          positive
          content='Update Profile'
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({ form: 'userProfile' })(AboutPage);
