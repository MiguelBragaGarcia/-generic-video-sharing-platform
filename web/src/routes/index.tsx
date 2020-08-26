import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import ShowVideo from '../pages/ShowVideo';
import Results from '../pages/Results';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot" component={ForgotPassword} />
    <Route path="/results" component={Results} />

    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/video/:video_id" component={ShowVideo} />

    <PrivateRoute path="/profile" component={Profile} />
  </Switch>
);

export default Routes;
