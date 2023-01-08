import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.btn}
      onPress={() => navigation.navigate('SongList')}>
        <Text>Song List</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.btn}
      onPress={() => navigation.navigate('AL')}>
        <Text>AL</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center'
    }
})