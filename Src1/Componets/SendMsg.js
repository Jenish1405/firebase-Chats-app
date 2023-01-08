import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { sendNotification } from './SendNotification'
import firestore from '@react-native-firebase/firestore'
import Icons from "react-native-vector-icons/FontAwesome";
import moment, { now } from 'moment';


const SendMsg = ({ ID, curUserData, tokenID }) => {

    const [input, setInput] = useState();
    const [sendTime, setsendTime] = useState();

    useEffect(() => {
        handleTime();
    })

    const handleSendMsg = () => {
        firestore()
            .collection('ChatsG')
            .doc(ID.id)
            .collection('message')
            .add({
                image: curUserData.profilePic,
                message: input,
                email: curUserData.email,
                timestamp: firestore.FieldValue.serverTimestamp(),
                sendTime: sendTime
            }).then(() => sendNotification({ tokenID: tokenID, title: curUserData.fullname, body: input }))
        setInput('')
    }

    const handleTime =() => {
        const fullTime = new Date()
        const time = moment(fullTime).format('hh:mm a')
        setsendTime(time);
    }

    return (
        <View style={{ marginHorizontal: 15, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                value={input}
                onChangeText={text => setInput(text)}
                placeholder='Message'
                style={styles.textinput} />
            <TouchableOpacity
                onPress={handleSendMsg}
                style={{ marginLeft: 10, borderRadius: 100, padding: 13, backgroundColor: '#128c7e' }}>
                <Icons name='send' size={20} color={'#FFF'} />
            </TouchableOpacity>
        </View>
    )
}

export default SendMsg

const styles = StyleSheet.create({
    textinput: {
        borderRadius: 50,
        width: '84%',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        elevation: 5

    },
})