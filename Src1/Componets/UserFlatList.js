import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const UserFlatList = ({ item, curUser }) => {

    const [image, setImage] = useState()
    const [name, setname] = useState()
    const [users, setusers] = useState();
    const [massages, setmessages] = useState();

    useEffect(() => {
        handleuser();
        handleChack();
    })

    useEffect(() => {
        handleLastmsg()
    }, [])

    const handleLastmsg = () => {
        firestore()
            .collection('ChatsG')
            .doc(item.id)
            .collection('message')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {

                const chats = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
                console.log('kshdbfvj', chats[0]?.data.message)
                setmessages(chats[0]?.data.message)
            })

    }

    const handleuser = async () => {
        if (curUser.email === item?.data.email1) {
            setImage(item?.data.image2)
            setname(item?.data.name2)
        } else {
            setImage(item?.data.image1)
            setname(item?.data.name1)
        }
    }

    const handleChack = () => {
        if (curUser.email === item?.data.email1 || curUser.email === item?.data.email2) {
            setusers(true)
        } else {
            setusers(false)
        }
    }

    return (

        <View>
            {
                users ?
                    <View style={styles.container}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.userName}>{name}</Text>
                            <Text>{massages}</Text>
                        </View>
                    </View> : null
            }

        </View>
    )
}

export default UserFlatList

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginVertical: 5,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    image: {
        width: 50, 
        height: 50, 
        borderRadius: 10
    },
    userName: {
        fontSize: 17, 
        fontWeight: '700', 
        color: '#000'
    }
})