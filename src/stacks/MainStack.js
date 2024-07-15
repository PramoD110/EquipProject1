import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import {MyContext} from '../AppContext/MyContext ';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function MainStack() {
  const {userToken} = useContext(MyContext);
  const [asyncToken, setAsyncToken] = useState();

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setAsyncToken(token);
      } catch (error) {
        console.error('Failed to retrieve token', error);
      }
    };

    fetchAuthToken();
  }, []);

  return (
    <Stack.Navigator>
      {userToken || asyncToken ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
