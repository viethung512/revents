import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

// components
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

function NavBar({ history }) {
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignIn = () => setAuthenticated(true);
  const handleSignOut = () => {
    setAuthenticated(false);
    history.push('/');
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src='/assets/logo.png' alt='logo' />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        <Menu.Item as={NavLink} to='/people' name='People' />
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
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} />
        )}
      </Container>
    </Menu>
  );
}

export default withRouter(NavBar);
