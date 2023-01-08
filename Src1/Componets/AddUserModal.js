import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const AddUserModal = () => {

    const [userName, setuserName] = useState()

    const handlesubmit = async () => {
       await firestore()
        .collection('ChatsG')
        .add({
            username: userName
        })
        .then(() => {
            Alert.alert("Add Succussfully")
            setuserName('')
        })
    }


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ height: 150, width: '80%', borderRadius: 15, backgroundColor: '#FFF', elevation: 5, alignItems: 'center', justifyContent: 'center', }}>

                <TextInput
                value={userName}
                onChangeText={text => setuserName(text)}
                    placeholder='Enter User Name'
                    style={{ borderRadius: 7, paddingHorizontal: 15, paddingVertical: 10, elevation: 5, backgroundColor: '#fff', width: '90%', alignSelf: 'center' }}
                />

                <TouchableOpacity
                onPress={handlesubmit}
                    style={{ borderWidth: 1, alignItems: 'center', paddingVertical: 10, width: '90%', alignSelf: 'center', borderRadius: 10, top: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#000' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddUserModal

const styles = StyleSheet.create({})