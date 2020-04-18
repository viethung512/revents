import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// components
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';

// pages
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import TestComponent from '../../features/testarea/TestComponent';

function App() {
  return (
    <Fragment>
      <Route path='/' component={HomePage} exact />
      <Route
        path='/(.+)'
        render={() => (
          <Fragment>
            <NavBar />
            <Container className='main'>
              <Route path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route path='/people' component={PeopleDashboard} />
              <Route path='/profile/:id' component={UserDetailedPage} />
              <Route path='/settings' component={SettingsDashboard} />
              <Route path='/createEvent' component={EventForm} />
              <Route path='/test' component={TestComponent} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
