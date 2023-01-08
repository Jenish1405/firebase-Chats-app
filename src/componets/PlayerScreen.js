import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import songs from "../helper/data.json";
import Controller from "./Controllr";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

const PlayerScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const position = useRef(Animated.divide(scrollX, width)).current;


  useEffect(() => {

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);
      setSongIndex(val);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const onStartPress = async (e) => {

    setisAlreadyPlay(true);
    setInprogress(true);
    const path = songs[songIndex].url;
    console.log('vadvacv ', path)
    console.log('jjsjjsjjs', songIndex)
    audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener(async (e) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      let percent = Math.round(
        (Math.floor(e.current_position) / Math.floor(e.duration)) * 100
      );
      setTimeElapsed(e.current_position);
      setPercent(percent);
      setDuration(e.duration);
    })

      console.log("TimeElapse", timeElapsed)
      console.log("Percent", percent)
      console.log("Duration", duration)

  };


  const onStopPress = async () => {
    console.log('onStopPlay');
    await audioRecorderPlayer.stopPlayer();
    // await audioRecorderPlayer.removePlayBackListener();
  }

  const onPausePress = async (e) => {
    setisAlreadyPlay(false);
    audioRecorderPlayer.pausePlayer();
  };

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  // const changeTime = async (seconds) => {
  //   // 50 / duration
  //   let seektime = (seconds / 100) * duration;
  //   setTimeElapsed(seektime);
  //   audioRecorderPlayer.seekToPlayer(seektime);
  // };


  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={{ uri: item.artwork }}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      {/* <Slider
        minimumValue={0}
        maximumValue={100}
        // trackStyle={styles.track}
        // thumbStyle={styles.thumb}
        value={percent}
        minimumTrackTintColor="#93A8B3"
        onValueChange={(seconds) => changeTime(seconds)}
      /> */}
      <View style={styles.inprogress}>
        <Text style={[styles.textLight, styles.timeStamp]}>
          {!inprogress
            ? timeElapsed
            : audioRecorderPlayer.mmssss(Math.floor(timeElapsed))}
        </Text>
        <Text style={[styles.textLight, styles.timeStamp]}>
          {!inprogress ? duration : audioRecorderPlayer.mmssss(Math.floor(duration))}
        </Text>
      </View>


      <View>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        <Text>{songs[songIndex].url}</Text>
      </View>

      <View style={styles.Tcontainer}>
        <TouchableOpacity onPress={goPrv}>
          <MaterialIcons name="skip-previous" size={45} />
        </TouchableOpacity>
        {
          !isAlreadyPlay ? <TouchableOpacity
            onPress={() => onStartPress()}>
            <MaterialIcons name="play-arrow" size={45} />
          </TouchableOpacity> :
            <TouchableOpacity
              onPress={() => onPausePress()}>
              <MaterialIcons name="pause" size={45} />
            </TouchableOpacity>
        }

        <TouchableOpacity onPress={goNext}>
          <MaterialIcons name="skip-next" size={45} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-evenly",
    height: height,
    maxHeight: 500,
  },
  Tcontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default PlayerScreen