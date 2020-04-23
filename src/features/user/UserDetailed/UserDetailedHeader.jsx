import React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';
import differenceInYears from 'date-fns/differenceInYears';
import LazyLoad from 'react-lazyload';

const calculateAge = dateOfBirth => {
  if (!dateOfBirth) {
    return 'unknown age';
  }
  return differenceInYears(Date.now(), dateOfBirth.toDate());
};

function UserDetailedHeader({
  user: { avatarUrl, displayName, dateOfBirth, occupation, city },
}) {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image avatar size='small' src='/assets/user.png' />
              }
            >
              <Item.Image avatar size='small' src={avatarUrl} />
            </LazyLoad>
            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{displayName}</Header>
              <br />
              <Header as='h3'>{occupation}</Header>
              <br />
              <Header as='h3'>
                {calculateAge(dateOfBirth)}, Live in {city || 'unknow city'}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
}

export default UserDetailedHeader;
