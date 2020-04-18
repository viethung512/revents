import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';

function TestComponent(props) {
  const dispatch = useDispatch();
  const test = useSelector(state => state.test);

  const handleIncrementCounter = () => dispatch(incrementCounter());
  const handleDecrementCounter = () => dispatch(decrementCounter());

  return (
    <div>
      <h1>Test Component</h1>
      <h3>The answer is: {test.data}</h3>
      <Button onClick={handleIncrementCounter} positive content='Increment' />
      <Button onClick={handleDecrementCounter} positive content='Decrement' />
    </div>
  );
}

export default TestComponent;
