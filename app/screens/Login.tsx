import { Text, View } from 'react-native';
import React from 'react';


import XInput from '../components/base/XInput';
import XButton from '../components/base/XButton';

const Login = () => {
  return (
    <View >
      <Text >Login</Text>
      
      <View >
        <XInput
          placeholder="Username"
          
          keyboardType="default"
        />
        
      </View>
      <View >
        <XInput
          placeholder="Password"
          
          secureTextEntry
        />
      </View>
      <View >
        <XButton >
          <Text>Login</Text>
        </XButton>
        
      </View>
    </View>
  );
};

export default Login;