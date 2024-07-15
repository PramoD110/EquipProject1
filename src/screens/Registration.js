import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {Input, VStack, Button, Image, HStack, Toast} from 'native-base';

const defaultData = {
  first_name: '',
  last_name: '',
  phone_number: '',
  password: '',
};
export default function Registration({navigation}) {
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
    fetch('http://10.0.2.2:5000/api/auth/register', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(result => {
        Toast.show({
          title: 'Success',
          description: 'Registration successfully',
          placement: 'top',
          bgColor: 'success.900',
        });
        setdata(defaultData);
        navigation.navigate('Login');
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
            value={data.first_name}
            size="md"
            variant="rounded"
            mx="3"
            placeholder="First Name"
            w="100%"
            bg={'white'}
            inputMode="text"
            onChangeText={value => handleChange('first_name', value)}
          />
          <Input
            value={data.last_name}
            variant="rounded"
            mx="3"
            placeholder="Last Name"
            w="100%"
            bg={'white'}
            inputMode="text"
            onChangeText={value => handleChange('last_name', value)}
          />
          <Input
            value={data.phone_number}
            variant="rounded"
            mx="3"
            placeholder="Mobile Number"
            w="100%"
            bg={'white'}
            inputMode="tel"
            maxLength={10}
            onChangeText={value => handleChange('phone_number', value)}
          />
          <Input
            value={data.password}
            variant="rounded"
            mx="3"
            placeholder="Password"
            w="100%"
            bg={'white'}
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
            Register
          </Button>
        </View>

        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{position: 'absolute', alignSelf: 'flex-end'}}>
            <Text style={{color: '#ef4444', fontWeight: 'bold', fontSize: 15}}>
              LOGIN
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
