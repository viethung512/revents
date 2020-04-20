import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';

function EventActivity(props) {
  return (
    <Fragment>
      <Header attached='top' content='Recent activity' />
      <Segment attached>
        <p>Recent activity</p>
      </Segment>
    </Fragment>
  );
}

export default EventActivity;
