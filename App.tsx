import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import {MyContextProvider} from './src/AppContext/MyContext ';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyContextProvider>
          <MainStack />
        </MyContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
