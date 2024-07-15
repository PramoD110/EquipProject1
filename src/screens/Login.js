import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Input, VStack, Button, Image, Toast, Icon, HStack} from 'native-base';
import {MyContext} from '../AppContext/MyContext ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const defaultData = {
  phone_number: '',
  password: '',
};

export default function Login({navigation}) {
  const {setUserToken, setUserData} = useContext(MyContext);
  const [data, setdata] = useState(defaultData);
  const [show, setShow] = useState(false);

  const handleChange = (name, value) => {
    setdata(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const handleSubmit = () => {
    fetch('http://10.0.2.2:5000/api/auth/login', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        AsyncStorage.setItem('authToken', result?.token)
          .then(() => {
            return AsyncStorage.getItem('authToken');
          })
          .then(token => {
            setUserData(data?.phone_number);
            setUserToken(token);
            setdata(defaultData);
            Toast.show({
              title: 'Success',
              description: 'Login successfully',
              placement: 'top',
              bgColor: 'success.900',
            });
          });
      })
      .catch(error => {
        Toast.show({
          title: 'Error',
          description: error.message,
          placement: 'top',
          bgColor: 'error.900',
        });
      });
  };

  return (
    <View style={styles.container}>
      <>
        <View>
          <Image
            borderRadius={100}
            shadow={2}
            source={require('../images/logo.png')}
            alt="Alternate Text"
            size="xl"
          />
        </View>
        <VStack space="2.5" mt="4">
          <Input
            variant="rounded"
            mx="3"
            placeholder="Mobile Number"
            w="100%"
            bg={'white'}
            value={data.phone_number}
            onChangeText={value => handleChange('phone_number', value)}
            keyboardType="number-pad"
            maxLength={10}
          />

          <Input
            variant="rounded"
            mx="3"
            placeholder="Password"
            w="100%"
            bg={'white'}
            value={data.password}
            onChangeText={value => handleChange('password', value)}
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Pressable
                onPress={() => {
                  setShow(!show);
                }}
                key={show ? 'show' : 'hide'}>
                <Image
                  shadow={2}
                  source={
                    show
                      ? require('../images/view.png')
                      : require('../images/hidden.png')
                  }
                  alt="Toggle visibility"
                  size={5}
                  mr={2}
                />
              </Pressable>
            }
          />
        </VStack>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => handleSubmit()}
            style={styles.button}
            size={'lg'}
            borderRadius="full"
            colorScheme="success">
            Login
          </Button>
          <TouchableOpacity>
            <Text style={{textAlign: 'right', color: '#0ea5e9'}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={{position: 'absolute', alignSelf: 'flex-end'}}>
            <Text style={{color: '#ef4444', fontWeight: 'bold', fontSize: 15}}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <HStack style={{marginVertical: 20}} space={15}>
          <TouchableOpacity>
            <Image
              shadow={2}
              source={require('../images/google.png')}
              alt="Alternate Text"
              size={10}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              shadow={2}
              source={require('../images/facebook.png')}
              alt="Alternate Text"
              size={10}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              shadow={2}
              source={require('../images/apple.png')}
              alt="Alternate Text"
              size={10}
            />
          </TouchableOpacity>
        </HStack>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffe4e6',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginVertical: 20,
    alignSelf: 'flex-end',
    padding: 10,
    width: '50%',
  },
});
