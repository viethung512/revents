import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({
  input: { value, onChange, onBlur },
  width,
  placeholder,
  dateFormat,
  timeFormat,
  meta: { touched, error },
  ...rest
}) {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          value
            ? Object.prototype.toString.call(value) !== '[object Date]'
              ? value.toDate()
              : value
            : null
        }
        value={value}
        onChange={onChange}
        onChangeRaw={e => e.preventDefault()}
        onBlur={(e, val) => onBlur(val)}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
      />
      {touched && !!error && (
        <Label basic color='red' pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default DateInput;
