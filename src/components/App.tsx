import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Issue} from '../reducers/issuesReducer';
import Bookmarks from './Bookmarks';
import Home from './Home';
import IssueDetails from './IssueDetails';
import Issues from './Issues';
import {NavigationHeaderItem} from './Generic';

export type NavigationParamList = {
  Home: {};
  Issues: {
    organization: string;
    repository: string;
  };
  IssueDetails: {
    issue: Issue;
  };
  Bookmarks: {};
};

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends NavigationParamList {}
  }
}

const AppTheme = {
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
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer theme={AppTheme} ref={navigationRef}>
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
            headerStyle: {
              backgroundColor: AppTheme.colors.background,
            },
            headerTitle: '',
            headerLeft: () => {
              return (
                <NavigationHeaderItem
                  title={'Bookmarks'}
                  onPress={() => {
                    navigationRef.goBack();
                  }}
                />
              );
            },
          }}
        />

        <Stack.Screen
          name="Issues"
          component={Issues}
          options={{
            headerStyle: {
              backgroundColor: AppTheme.colors.background,
            },
            headerTitle: '',
            headerLeft: () => {
              return (
                <NavigationHeaderItem
                  title={'Issues'}
                  onPress={() => {
                    navigationRef.goBack();
                  }}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="IssueDetails"
          component={IssueDetails}
          options={{
            headerStyle: {
              backgroundColor: AppTheme.colors.background,
            },
            headerTitle: '',
            headerLeft: () => {
              return (
                <NavigationHeaderItem
                  onPress={() => {
                    navigationRef.goBack();
                  }}
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
