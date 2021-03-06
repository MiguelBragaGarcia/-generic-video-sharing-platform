import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppStacks from './routes/AppStacks';

const App: React.FC = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#3052d9" />

        <AppStacks />
      </NavigationContainer>
    </>
  );
};

export default App;
