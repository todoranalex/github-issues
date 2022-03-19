import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Bookmarks from './Bookmarks';
import Home from './Home';
import IssueDetails from './IssueDetails';
import Issues from './Issues';

export type NavigationParamList = {
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
  return (
    <NavigationContainer theme={AppTheme}>
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
            headerStyle: {
              backgroundColor: AppTheme.colors.background,
            },
            headerTitle: '',
            // headerTitleStyle: {
            //   color: AppTheme.colors.primary,
            //   fontSize: 20,
            // },
            // headerBackTitle: 'Issues',
            // headerBackTitleVisible: false,
            headerLeft: () => {
              return (
                <View
                  style={{
                    marginLeft: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    onPress={() => {
                      // navigation.goBack();
                    }}
                    name={'arrow-left'}
                    color={'white'}
                    size={24}
                  />
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: 16,
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    Issues
                  </Text>
                </View>
              );
            },
          }}
        />
        <Stack.Screen name="IssueDetails" component={IssueDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
