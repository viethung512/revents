import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import ModalManager from '../../features/modals/ModalManager';

import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from './NotFound';

function App() {
  return (
    <Fragment>
      <ModalManager />
      <Route path='/' component={HomePage} exact />
      <Route
        path='/(.+)'
        render={() => (
          <Fragment>
            <NavBar />
            <Container className='main'>
              <Switch>
                <Route path='/events' component={EventDashboard} exact />
                <Route path='/events/:id' component={EventDetailedPage} />
                <Route
                  path='/people'
                  component={UserIsAuthenticated(PeopleDashboard)}
                />
                <Route
                  path='/profile/:id'
                  component={UserIsAuthenticated(UserDetailedPage)}
                />
                <Route path='/settings' component={SettingsDashboard} />
                <Route
                  path={['/createEvent', '/manage/:id']}
                  component={UserIsAuthenticated(EventForm)}
                />
                <Route path='/test' component={TestComponent} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
