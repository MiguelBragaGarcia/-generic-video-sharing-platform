import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';

const App = createStackNavigator();

function AppStack() {
  return (
    <>
      <App.Navigator screenOptions={{ headerShown: false }}>
        <App.Screen name="Dashboard" component={Dashboard} />
        <App.Screen name="Search" component={Search} />
      </App.Navigator>
    </>
  );
}

export default AppStack;
