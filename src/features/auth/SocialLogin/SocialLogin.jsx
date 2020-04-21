import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { socialLogin } from '../authActions';

function SocialLogin(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        type='button'
        style={{ marginBottom: '10px' }}
        fluid
        color='facebook'
        onClick={() => dispatch(socialLogin('facebook'))}
      >
        <Icon name='facebook' /> Login with Facebook
      </Button>

      <Button
        type='button'
        fluid
        color='google plus'
        onClick={() => dispatch(socialLogin('google'))}
      >
        <Icon name='google plus' />
        Login with Google
      </Button>
    </div>
  );
}

export default SocialLogin;
