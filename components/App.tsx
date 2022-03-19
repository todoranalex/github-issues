import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Bookmarks from './Bookmarks';

import Home from './Home';
import IssueDetails from './IssueDetails';
const MyTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: 'black',
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="firstRoute"
        screenOptions={{
          tabBarActiveBackgroundColor: '#212121',
          tabBarInactiveBackgroundColor: '#212121',
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#BFBFBF',
          headerShown: false,
          tabBarItemStyle: {paddingBottom: 16},
          tabBarStyle: {paddingBottom: 0},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={32} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={Bookmarks}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="bookmark" size={32} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={IssueDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
