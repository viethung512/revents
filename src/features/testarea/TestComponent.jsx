import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementAsync, decrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';

function TestComponent(props) {
  const dispatch = useDispatch();
  const test = useSelector(state => state.test);
  const async = useSelector(state => state.async);

  const { loading, elementName } = async;

  const handleIncrementCounter = e => dispatch(incrementAsync(e.target.name));
  const handleDecrementCounter = e => dispatch(decrementAsync(e.target.name));

  return (
    <div>
      <h1>Test Component</h1>
      <h3>The answer is: {test.data}</h3>
      <Button
        name='increment'
        onClick={handleIncrementCounter}
        positive
        content='Increment'
        loading={loading && elementName === 'increment'}
      />
      <Button
        name='decrement'
        onClick={handleDecrementCounter}
        negative
        content='Decrement'
        loading={loading && elementName === 'decrement'}
      />
      <Button
        onClick={() => dispatch(openModal('TestModal', { data: 42 }))}
        color='teal'
        content='Open Modal'
      />
      <br />
      <hr />
      <TestPlaceInput />
      <SimpleMap />
    </div>
  );
}

export default TestComponent;
