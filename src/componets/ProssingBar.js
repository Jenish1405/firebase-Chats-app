import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

const Progress = ({ step, steps, height }) => {

    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width])

    return (
        <View
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth)
            }}
            style={{
                height,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: height,
                overflow: 'hidden'
            }}>
            <Animated.View
                style={{
                    height,
                    width: '100%',
                    borderRadius: height,
                    backgroundColor: '#a66626',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: [{
                        translateX: animatedValue,
                    }]
                }}>

            </Animated.View>
        </View>
    )
}

const ProssingBar = ({ duration, position }) => {
    const done = 10;
    return (
        <View style={styles.container}>
            <Progress step={position} steps={duration} height={10} />
            
        </View>
    )
}

export default ProssingBar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    }
})