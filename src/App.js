import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListing from './screens/ProductListing';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductListing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ProductListing' component={ProductListing}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App