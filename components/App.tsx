import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "./Home";
import IssueDetails from "./IssueDetails";
const MyTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    background: "#152238",
    primary: "rgb(255, 45, 85)",
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="IssueDetails" component={IssueDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
