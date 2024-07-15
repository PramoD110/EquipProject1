import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

const MyContext = createContext();

const MyContextProvider = ({children}) => {
  const [sharedValue, setSharedValue] = useState('This is a shared value');
  const [userToken, setUserToken] = useState();
  const [userData, setUserData] = useState();

  return (
    <MyContext.Provider
      value={{
        sharedValue,
        setSharedValue,
        setUserToken,
        userToken,
        setUserData,
        userData,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext, MyContextProvider};
