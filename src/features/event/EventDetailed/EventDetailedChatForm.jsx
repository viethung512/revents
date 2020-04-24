import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { reduxForm, Field, reset } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';
import { addEventComment } from '../eventActions';

function EventDetailedChatForm({
  handleSubmit,
  eventId,
  closeForm,
  parentId,
  form,
}) {
  const dispatch = useDispatch();

  const handleCommentSubmit = values => {
    dispatch(addEventComment(eventId, values, parentId));
    dispatch(reset(form));
    if (parentId !== 0) {
      closeForm();
    }
  };
  return (
    <Form reply onSubmit={handleSubmit(handleCommentSubmit)}>
      <Field name='comment' type='text' component={TextArea} rows={2} />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  );
}

export default reduxForm({ Fields: 'comment' })(EventDetailedChatForm);
