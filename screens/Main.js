import React from 'react';
import { Store } from '../Provider';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Create from '../screens/Create';
import Home from '../screens/Home';

import isEmpty from '../utils/isEmpty';

import { restoreUser } from "../actions";

const Stack = createStackNavigator();

const Main = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    restoreUser(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {
          state.isLoading ?
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            :
            isEmpty(state.user) ?
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isAuth ? 'push' : 'pop',
                  }}
                />

                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
              :
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerShown: true,
                  }}
                />

                <Stack.Screen
                  name="Create"
                  component={Create}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;