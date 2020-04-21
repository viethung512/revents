import React from 'react';
import { Form } from 'semantic-ui-react';

function RadioInput({ input, id, witdth, type, label }) {
  return (
    <Form.Field>
      <div className='ui radio'>
        <input id={id} {...input} type={type} />{' '}
        <label htmlFor={id}>{label}</label>
      </div>
    </Form.Field>
  );
}

export default RadioInput;
