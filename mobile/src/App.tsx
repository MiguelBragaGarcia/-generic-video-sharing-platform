import React from 'react';
import { StatusBar } from 'react-native';

import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Dashboard />
    </>
  );
};

export default App;
