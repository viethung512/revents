import React, { Fragment } from 'react';
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

const parseDate = date => {
  if (typeof date === 'string') {
    return format(new Date(date), 'EEEE do LLLL');
  }

  return format(date.toDate(), 'EEEE do LLLL');
};

function UserDetailedDescription({
  user: { displayName, createdAt, about, interests, occupation, origin },
}) {
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon='smile outline' content={`About ${displayName}`} />
            <p>
              I am a: <strong>{occupation || 'tbn'}</strong>
            </p>
            <p>
              Originally from <strong>{origin || 'tbn'}</strong>
            </p>
            {createdAt && (
              <p>
                Member Since:{' '}
                <strong>{createdAt && parseDate(createdAt)}</strong>
              </p>
            )}
            {about && (
              <Fragment>
                <p>Description of user</p>
                <p>{about}</p>
              </Fragment>
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon='heart outline' content='Interests' />
            <List>
              {interests &&
                (interests.length > 0 ? (
                  interests.map((interest, index) => (
                    <Item key={index}>
                      <Icon name='heart' />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))
                ) : (
                  <p>No interests</p>
                ))}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailedDescription;
