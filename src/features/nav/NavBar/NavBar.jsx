import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Link, NavLink, withRouter, useHistory } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

// components
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

// actions
import { openModal } from '../../modals/modalActions';

function NavBar(props) {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  let history = useHistory();
  const {
    auth: { isLoaded, isEmpty },
    profile,
  } = useSelector(state => state.firebase);

  const authenticated = isLoaded && !isEmpty;

  const handleSignIn = () => dispatch(openModal('LoginModal'));
  const handleRegister = () => dispatch(openModal('RegisterModal'));
  const handleSignOut = () => {
    firebase.logout();
    history.push('/');
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src='/assets/logo.png' alt='logo' />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/events' name='Events' />
        {authenticated && (
          <Fragment>
            <Menu.Item as={NavLink} to='/people' name='People' />
            <Menu.Item as={NavLink} to='/test' name='Test' />
            <Menu.Item>
              <Button
                as={Link}
                to='/createEvent'
                floated='right'
                positive
                inverted
                content='Create Event'
              />
            </Menu.Item>
          </Fragment>
        )}
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} profile={profile} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} register={handleRegister} />
        )}
      </Container>
    </Menu>
  );
}

export default withRouter(NavBar);
