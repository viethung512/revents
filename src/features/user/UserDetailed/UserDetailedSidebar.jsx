import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function UserDetailedSidebar({ isCurrentUser }) {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
          <Button
            color='teal'
            fluid
            basic
            content='Edit Profile'
            as={Link}
            to='/settings'
          />
        ) : (
          <Button color='teal' fluid basic content='Follow User' />
        )}
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailedSidebar;
