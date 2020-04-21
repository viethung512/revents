import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

function SignedInMenu({ signOut, profile }) {
  const { displayName, avatarUrl } = profile;

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={avatarUrl || '/assets/user.png'} />
      <Dropdown pointing='top left' text={displayName}>
        <Dropdown.Menu>
          <Dropdown.Item text='Create Event' icon='plus' />
          <Dropdown.Item text='My Events' icon='calendar' />
          <Dropdown.Item text='My Network' icon='users' />
          <Dropdown.Item text='My Profile' icon='user' />
          <Dropdown.Item
            text='Settings'
            icon='settings'
            as={Link}
            to='/settings'
          />
          <Dropdown.Item text='Sign Out' icon='power' onClick={signOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
