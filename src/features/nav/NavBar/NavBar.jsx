import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, withRouter, useHistory } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

// components
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

// actions
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

function NavBar(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const { authenticated, currentUser } = auth;
  let history = useHistory();

  const handleSignIn = () => dispatch(openModal('LoginModal'));
  const handleRegister = () => dispatch(openModal('RegisterModal'));
  const handleSignOut = () => {
    dispatch(logout());
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
          <SignedInMenu signOut={handleSignOut} user={currentUser} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} register={handleRegister} />
        )}
      </Container>
    </Menu>
  );
}

export default withRouter(NavBar);
