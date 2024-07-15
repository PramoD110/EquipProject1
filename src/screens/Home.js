import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyContext} from '../AppContext/MyContext ';

export default function Home({navigation}) {
  const {setUserToken, userData} = useContext(MyContext);
  const [data, setData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    fetch('http://10.0.2.2:5000/api/auth/getuser')
      .then(response => response.json())
      .then(result => {
        if (result && Array.isArray(result.user)) {
          const filteredData = result.user.filter(
            item => String(item?.phone_number) === String(userData),
          );
          setData(filteredData[0]);
        } else {
          console.error('Expected an array but got:', result);
        }
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('authToken')
      .then(() => {
        setUserToken(null);
        navigation.navigate('Login');
      })
      .catch(error => console.error('error is', error));
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <View style={styles.homeContainer}>
      <Text>
        {getGreeting()}, {data && data?.first_name + data?.last_name}
      </Text>
      <Text>welcome to the Home Screen!</Text>

      <View style={styles.logoutButtonContainer}>
        <Button
          onPress={handleLogout}
          style={styles.logoutButton}
          size={'lg'}
          borderRadius="full"
          colorScheme="error">
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
  logoutButton: {
    // padding: 10,
    width: '50%',
  },
});
