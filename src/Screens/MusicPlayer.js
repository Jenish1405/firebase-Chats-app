import { FlatList, StyleSheet, Text, View, Image, Animated, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { songlist } from '../helper/data1'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ProssingBar from '../componets/ProssingBar';
import Slider from '@react-native-community/slider';


const MusicPlayer = () => {

    const { width } = useWindowDimensions();
    const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
    audioRecorderPlayer.setSubscriptionDuration(0.09);

    const [currentIndex, setcurrentIndex] = useState(0);
    const [isAlreadyPlay, setisAlreadyPlay] = useState(false);

    const [currentPositionSec, setcurrentPositionSec] = useState(0);
    const [currentDurationSec, setcurrentDurationSec] = useState(0);
    const [playTime, setplayTime] = useState('00:00:00');
    const [duration, setduration] = useState('00:00:00');


    const scrollX = useRef(new Animated.Value(0)).current;

    const viewItemchange = useRef(({ viewableItems }) => {
        setcurrentIndex(viewableItems[0].index);
    }).current;

    const slidesRef = useRef(null);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const onStopPress = async () => {
        console.log('onStopPlay');
        await audioRecorderPlayer.stopPlayer();
        await audioRecorderPlayer.removePlayBackListener();
    }


    const handleStart = () => {
        setisAlreadyPlay(true);
        audioRecorderPlayer.startPlayer(songlist[currentIndex].url);
        audioRecorderPlayer.setVolume(1.0);

        audioRecorderPlayer.addPlayBackListener(async (e) => {
            if (e.currentPosition === e.duration) {
                audioRecorderPlayer.stopPlayer();
            }
            let percent = Math.round(
                (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100
            );

            setcurrentPositionSec(e.currentPosition / 1000)
            setcurrentDurationSec(e.duration / 1000)
            setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
            setduration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
        });
    }

    const handlePause = async () => {
        setisAlreadyPlay(false);
        await audioRecorderPlayer.pausePlayer();
    }

    const handleNext = async () => {
        if (currentIndex < songlist.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
        handlePause();
        onStopPress();
    }

    const handleBack = async () => {
        if (currentIndex < songlist.length + 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
        handlePause();
        onStopPress();
    }

    const changeTime = async (seconds) => {
        // audioRecorderPlayer.seekToPlayer(seconds * 102)
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <FlatList
                    data={songlist}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles.Scontainer, { width }]}>
                                <Image source={{ uri: item.artwork }} style={{ height: 200, width: 200, borderRadius: 100, }} />
                            </View>
                        )
                    }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })
                    }
                    scrollEventThrottle={10}
                    onViewableItemsChanged={viewItemchange}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef} />

                <View style={{ marginTop: -100 }}>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: '#000' }}>{songlist[currentIndex].title}</Text>
                    <Text style={{ fontSize: 17 }}>{songlist[currentIndex].artist}</Text>
                </View>

                <View style={{ width: '90%' }}>
                    <Slider
                        style={{ width: 330, height: 40 }}
                        minimumValue={0}
                        maximumValue={currentDurationSec}
                        minimumTrackTintColor="red"
                        maximumTrackTintColor="#000000"
                        value={currentPositionSec}
                        // onTouchMove={value => console.log(value)}
                        onPointerMove={value => console.log(value)}
                        // onValueChange={value => audioRecorderPlayer.seekToPlayer(value * 1000)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, alignSelf: 'center', top: -10 }}>

                        <Text>{playTime}</Text>
                        <Text>{duration}</Text>

                    </View>
                </View>



                <View style={styles.Tcontainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <MaterialIcons name="skip-previous" size={45} />
                    </TouchableOpacity>


                    {isAlreadyPlay ? <TouchableOpacity onPress={handlePause}>
                        <MaterialIcons name="pause" size={45} />
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={handleStart}>
                            <MaterialIcons name="play-arrow" size={45} />
                        </TouchableOpacity>
                    }


                    <TouchableOpacity onPress={handleNext}>
                        <MaterialIcons name="skip-next" size={45} />
                    </TouchableOpacity>

                </View>

            </View>

        </View >
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    Scontainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Tcontainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 200,
        width: '90%'
    }
})