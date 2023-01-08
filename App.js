import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import PlayerScreen from './src/componets/PlayerScreen'
import Music from './src/Screens/Music'
import SongList from './src/Screens/SongList'
import MusicPlayer from './src/Screens/MusicPlayer'
import Task from './src/Screens/Task'
import StackSrc0 from './src/Screens/StackSrc'
import { handlePermission } from './src/helper/AudioPermissions'
import Audiorecoding from './src/Screens/Audiorecoding'
import AudioCut from './src/Screens/AudioCut'
import StackSrc from './Src1/Componets/StackSrc'
import { requestUserPermission, notificationListener } from './Src1/Componets/NotifivationServices'
import store from './store'
import { Provider } from 'react-redux'

const App = () => {

  useEffect(() => {
    handlePermission();
    requestUserPermission();
    notificationListener();
  }, [])

  return (

    // Muics

    // <View style={styles.container}>
    //  <PlayerScreen /> 
    //   {/* <Music /> */}
    // <SongList />
    // </View>
    // <SongList />
    // <MusicPlayer />
    // <Task />
    // <StackSrc0 />
    // <Audiorecoding />
    // <AudioCut />

    // Chats
    // <Provider store={store} >
      <StackSrc />
    // {/* </Provider> */}


  )
}

export default App

const styles = StyleSheet.create({

})