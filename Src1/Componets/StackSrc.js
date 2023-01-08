import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import ChatsSrc from '../Screens/ChatsSrc';
import LoginSrc from '../Screens/LoginSrc';
import SignupSrc from '../Screens/SignupSrc';
import Plususer from '../Screens/Plususer';

const Stack = createStackNavigator();

const StackSrc = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginSrc' component={LoginSrc}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name='SignupSrc' component={SignupSrc}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name='Home' component={Home} options={{
          headerShown: false,
        }} />
        <Stack.Screen name='ChatsSrc' component={ChatsSrc} />

        <Stack.Screen name='Plususer' component={Plususer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackSrc

const styles = StyleSheet.create({})