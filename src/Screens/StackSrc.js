import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Task from './Task';
import SongList from './SongList';
import AudioCut from './AudioCut';
import AL from './AL';

const Stack = createStackNavigator();

const StackSrc = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='SongList' component={SongList} />
            <Stack.Screen name='AudioCut' component={AudioCut} />
            <Stack.Screen name='AL' component={AL} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackSrc

const styles = StyleSheet.create({})