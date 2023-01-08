import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Trimmer from 'react-native-trimmer'

const AL = () => {

    const [Select, setSelect] = useState({
        trimmerLeftHandlePosition: 100,
        trimmerRightHandlePosition: 1000,
      })
      
     const onHandleChange = ({ leftPosition, rightPosition }) => {
        setSelect({
          trimmerRightHandlePosition: rightPosition,
          trimmerLeftHandlePosition: leftPosition
        })
      }

      console.log("helo===>>>", Select)

    return (
        <View>
            <Trimmer
                onHandleChange={onHandleChange}
                totalDuration={30000}
                trimmerLeftHandlePosition={Select?.trimmerLeftHandlePosition}
                trimmerRightHandlePosition={Select?.trimmerRightHandlePosition}
            />
        </View>
    )
}

export default AL

const styles = StyleSheet.create({})