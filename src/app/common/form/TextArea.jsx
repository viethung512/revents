import React from 'react';
import { Form, Label } from 'semantic-ui-react';

function TextArea({
  input,
  rows,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} type={type} rows={rows} />
      {touched && !!error && (
        <Label basic color='red' pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default TextArea;
