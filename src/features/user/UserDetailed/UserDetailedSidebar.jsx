import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function UserDetailedSidebar(props) {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button
          color='teal'
          fluid
          basic
          content='Edit Profile'
          as={Link}
          to='/settings'
        />
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailedSidebar;
