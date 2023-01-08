import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icon from "react-native-vector-icons/MaterialIcons";
import Slider from '@react-native-community/slider';


const Audiorecoding = () => {

    const audioRecorderPlayer = new AudioRecorderPlayer();

    const [startRecorder, setstartRecorder] = useState('00:00:00');
    const [stopRecorder, setstopRecorder] = useState();
    const [pausePlayer, setpausePlayer] = useState();
    const [startPlayer, setstartPlayer] = useState();
    const [stopPlayer, setstopPlayer] = useState();
    const [recoding, setrecoding] = useState(false);
    const [sound, setsound] = useState(false);
    const [recordSecs, setrecordSecs] = useState();

    const onStartRecord = async () => {
        console.log('called');
        const result = await audioRecorderPlayer.startRecorder();
        console.log(result);

    };

    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setstopRecorder({
            recordSecs: 0,
        });
        console.log(result);
    };

    const onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer('file:////data/user/0/com.musicapp/cache/sound.mp4');
        console.log(msg);
        // audioRecorderPlayer.addPlayBackListener((e) => {
        //     setstartPlayer({
        //         currentPositionSec: e.currentPosition,
        //         currentDurationSec: e.duration,
        //         playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        //         duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        //     });
        // });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 30, color: '#000' }}>{startPlayer?.playTime}</Text>


            <TouchableOpacity style={styles.btn} onPress={onStartRecord}>
                <Icon name='play-arrow' size={25} color={'#000'} />
            </TouchableOpacity>


            <TouchableOpacity style={styles.btn} onPress={onStopRecord}>
                <Icon name='stop' size={25} color={'#000'} />
            </TouchableOpacity>


            <Slider
                style={{ width: 330, height: 40 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
            // value={currentPositionSec}
            // onValueChange={seconds => changeTime(seconds)}
            />

            <TouchableOpacity style={styles.btn} onPress={onPausePlay}>
                <Icon name='pause' size={25} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onStartPlay}>
                <Icon name='play-arrow' size={25} color={'#000'} />
            </TouchableOpacity>





            <TouchableOpacity style={styles.btn} onPress={onStopPlay}>
                <Icon name='stop' size={25} color={'#000'} />
            </TouchableOpacity>

        </View>
    );
}

export default Audiorecoding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginVertical: 5,
        width: 50,
        height: 50,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#FFF',
        elevation: 5,
        justifyContent: 'center',
    }
})
