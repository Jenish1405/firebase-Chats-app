import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PlayerFlat = ({index, item}) => {
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
  )
}

export default PlayerFlat

const styles = StyleSheet.create({})