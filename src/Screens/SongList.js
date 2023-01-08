import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { songlist } from '../helper/data1'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Icons from "react-native-vector-icons/MaterialIcons";

const SongList = ({ navigation }) => {

    const [play, setplay] = useState(false);
    const [selectsong, setselectsong] = useState();
    const [Song, setSong] = useState(false);

    const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

    const handlesong = async (item) => {
        setselectsong(item);
        setSong(true);
        setplay(true);
        console.log('onStartPlay');
        onStopPress().then(async () => {
            const msg = await audioRecorderPlayer.startPlayer(item.url);
            console.log(msg);
            setselectsong(item);
        })
    }

    const onStopPress = async () => {
        await audioRecorderPlayer.stopPlayer();
    }

    const handlePlay = async (e) => {
        setplay(true);
        audioRecorderPlayer.startPlayer(selectsong.url);
        audioRecorderPlayer.setVolume(1.0);

        audioRecorderPlayer.addPlayBackListener(async (e) => {
            if (e.currentPosition === e.duration) {
                audioRecorderPlayer.stopPlayer();
            }
            let percent = Math.round(
                (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100
            );
        })

    }

    const handlePause = async () => {
        setplay(false);
        await audioRecorderPlayer.pausePlayer();
    }

    const handlesnedata = () => {
        if(play == true) {
            handlePause();
        }
        navigation.navigate('AudioCut', { songData: selectsong });
    }

    return (<>
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 22, fontWeight: '800', textAlign: 'center', marginVertical: 20 }}>Songs List</Text>
            </View>
            <FlatList
                data={songlist}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => handlesong(item)}
                        >
                            <View style={styles.Scontainer}>

                                <View>
                                    <Image source={{ uri: item.artwork }} style={styles.image} />
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#000' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14 }}>{item.artist}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                    )
                }} />
        </View>
        {Song ? <View style={styles.footer}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image source={{ uri: selectsong.artwork }} style={{ width: 40, height: 40, borderRadius: 8, marginLeft: 10 }} />
                </View>
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>{selectsong.title}</Text>
                    <Text style={{ fontSize: 13 }}>{selectsong.artist}</Text>
                </View>
            </View>
            <View style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                {play ?
                    <TouchableOpacity
                        onPress={handlePause}>
                        <Icons name='pause' size={35} color={'#000'} />
                    </TouchableOpacity>
                    : <TouchableOpacity
                        onPress={handlePlay}>
                        <Icons name='play-arrow' size={35} color={'#000'} />
                    </TouchableOpacity>}

                <TouchableOpacity
                    onPress={handlesnedata}>
                    <Icons name='blur-on' size={35} color={'#000'} />
                </TouchableOpacity>

            </View>

        </View> : null}

    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Scontainer: {
        width: '90%',
        alignSelf: 'center',
        height: 70,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 10,
        elevation: 5,
        marginLeft: 10
    },
    footer: {
        height: 65,
        backgroundColor: '#FFF',
        elevation: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between'
    }
})

export default SongList
