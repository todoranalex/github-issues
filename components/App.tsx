import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Bookmarks from './Bookmarks';
import Home from './Home';
import IssueDetails from './IssueDetails';
import Issues from './Issues';

type NavigationParamList = {
  Home: {};
  Issues: {
    organization: string;
    repository: string;
  };
  IssueDetails: {};
  Bookmarks: {};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationParamList {}
  }
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1919',
    primary: 'white',
    text: '#999999',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator<NavigationParamList>();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Issues"
          component={Issues}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="IssueDetails" component={IssueDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
