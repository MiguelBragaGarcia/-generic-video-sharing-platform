import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface RouteParams {
  search: string;
}

const Search: React.FC = () => {
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  return (
    <View>
      <Text>
        O Texto digitado foi:
        {routeParams.search}
      </Text>
    </View>
  );
};

export default Search;
