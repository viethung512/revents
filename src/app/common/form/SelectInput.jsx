import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

function SelectInput({
  input: { value, onChange },
  width,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error },
}) {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value={
          value
            ? value
            : Object.prototype.toString.call(value) !== '[object Array]'
            ? []
            : null
        }
        onChange={(e, data) => onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
      />
      {touched && !!error && (
        <Label basic color='red' pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default SelectInput;
