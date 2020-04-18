import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

// components
import SettingsNav from './SettingsNav';

// pages
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';

function SettingsDashboard(props) {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Redirect exact from='/settings' to='/settings/basic' />
        <Route path='/settings/basic' component={BasicPage} />
        <Route path='/settings/about' component={AboutPage} />
        <Route path='/settings/photos' component={PhotosPage} />
        <Route path='/settings/account' component={AccountPage} />
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
}

export default SettingsDashboard;
