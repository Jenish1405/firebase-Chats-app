import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Trimmer from 'react-native-trimmer'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';


const AudioCut = ({ navigation, route }) => {



    const song = route.params.songData;
    // console.log('song data ===>>', song)
    const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

    const [Select, setSelect] = useState({
        trimmerLeftHandlePosition: 100000,
        trimmerRightHandlePosition: 150000,
    })
    const [Scrubbing, setScrubbing] = useState(10000);
    const [PlayBtn, setPlayBtn] = useState(false);
    const [startTime, setStartTime] = useState('00:00:00');
    const [durationTime, setdurationTime] = useState('00:00:00');
    const [PositionSec, setPositionSec] = useState()
    const [durationSec, setdurationSec] = useState(30000)

    useEffect(() => {
        audioRecorderPlayer.seekToPlayer(Select?.trimmerLeftHandlePosition);
    }, [])

    const handlePlay = () => {
        setPlayBtn(true);
        audioRecorderPlayer.startPlayer(song.url);
        audioRecorderPlayer.setVolume(1.0);

        audioRecorderPlayer.addPlayBackListener(async (e) => {
            if (e.currentPosition === e.duration) {
                audioRecorderPlayer.stopPlayer();
            }
            let percent = Math.round(
                (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100
            );
            setPositionSec(e.currentPosition);
            setScrubbing(e.currentPosition)
            setdurationSec(e.duration);
            setStartTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
            setdurationTime(audioRecorderPlayer.mmssss(Math.floor(e.duration)))

        })
    }

    const handlePause = async () => {
        setPlayBtn(false);
        await audioRecorderPlayer.pausePlayer();
    }

    const onHandleChange = ({ leftPosition, rightPosition }) => {
        setSelect({
            trimmerRightHandlePosition: rightPosition,
            trimmerLeftHandlePosition: leftPosition
        })
    }

    // console.log('1111111', (Select?.trimmerRightHandlePosition / 1000).toFixed())
    // console.log('2222222', (Scrubbing / 1000).toFixed())

    const handleChangs = (value) => {
        audioRecorderPlayer.seekToPlayer(value)
        console.log(value * 1000)
    }

    useEffect(() => {
        if ((Select?.trimmerRightHandlePosition / 1000).toFixed() == (Scrubbing / 1000).toFixed()) {
            handlePause().then(() => {
                onplayBack();
            })
        }
    })



    const onplayBack = async () => {
        audioRecorderPlayer.seekToPlayer(Select?.trimmerLeftHandlePosition)
    }

    return (
        <View style={styles.container}>

            <View style={{ marginBottom: 50, alignItems: 'center' }}>
                {PlayBtn ?
                    <TouchableOpacity style={styles.songbtn}
                        onPress={handlePause}>
                        <Text style={styles.btntext}>Pause</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.songbtn}
                        onPress={handlePlay}>
                        <Text style={styles.btntext}>Play</Text>
                    </TouchableOpacity>
                }
                <View style={{ flexDirection: 'row', marginTop: 50, justifyContent: 'space-between', width: 300 }}>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>{startTime}</Text>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>{durationTime}</Text>
                </View>


            </View>
            <Trimmer
                onHandleChange={onHandleChange}
                scrubberPosition={Scrubbing}
                scaleInOnInit={true}
                totalDuration={durationSec}
                onScrubbingComplete={value => handleChangs(value)}
                trimmerLeftHandlePosition={Select?.trimmerLeftHandlePosition}
                trimmerRightHandlePosition={Select?.trimmerRightHandlePosition}
            />
        </View>
    )
}

export default AudioCut

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    songbtn: {
        width: 100,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5
    }
})