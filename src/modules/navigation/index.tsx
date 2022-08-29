import {
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Bookmarks from '../bookmarks/screens/Bookmarks';
import Home from '../home/screens';
import {Issue} from '../issues';
import {NavigationHeaderItem} from '../issues/components';
import IssueDetails from '../issues/screens/IssueDetails/IssueDetails';
import Issues from '../issues/screens/Issues';

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends NavigationParamList {}
  }
}

export type NavigationParamList = {
  Home: {};
  Issues: {};
  IssueDetails: {
    issue: Issue;
  };
  Bookmarks: {};
};

type NavigationProps = {
  theme: Theme;
};

const Navigation = ({theme}: NavigationProps) => {
  const Stack = createNativeStackNavigator<NavigationParamList>();
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
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
              backgroundColor: theme.colors.background,
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
              backgroundColor: theme.colors.background,
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
              backgroundColor: theme.colors.background,
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

export default Navigation;
