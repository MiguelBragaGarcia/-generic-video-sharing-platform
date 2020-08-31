import React from 'react';
import {Text, StatusBar} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Text>Olá mundo</Text>
    </>
  );
};

export default App;
