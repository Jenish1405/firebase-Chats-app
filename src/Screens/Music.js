import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

const Music = () => {

    const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
    audioRecorderPlayer.setSubscriptionDuration(0.09);

    const path = "https://samplesongs.netlify.app/Death%20Bed.mp3"



    const onstart = async () => {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer(path);
        console.log(msg);
        // audioRecorderPlayer.addPlayBackListener(e => {
        //   setcurrentPositionSec(e.currentPosition);
        //   setcurrentDurationSec(e.duration);
        //   setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        //   setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        //   return;
        // });
    }

    const onPausePlay = async() => {
        //audioRecorderPlayer.pausePlayer();
        console.log('onPausePlay');
        await audioRecorderPlayer.pausePlayer();
    }

    const onStopPlay = async () => {
        console.log('onStopPlay');
        await audioRecorderPlayer.stopPlayer();
        await audioRecorderPlayer.removePlayBackListener();
    }

    return (
        <View>
            <TouchableOpacity
            onPress={onPausePlay}>
                <Text>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={onstart}>
                <Text>play</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={onStopPlay}>
                <Text>asdv</Text>
            </TouchableOpacity>
            <Text>Music</Text>
        </View>
    )
}

export default Music

const styles = StyleSheet.create({})