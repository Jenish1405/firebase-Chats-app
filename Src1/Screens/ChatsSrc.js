import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import SendMsg from '../Componets/SendMsg';

const ChatsSrc = ({ navigation, route }) => {

    const ID = route.params.userId;
    const curUserData = route.params.curUser;

    const [messages, setmessages] = useState([])
    const [image, setImage] = useState()
    const [name, setname] = useState()
    const [Uid, setUid] = useState();
    const [tokenID, setTokenID] = useState()

    console.log('asdvasd', curUserData)

    useEffect(() => {
        handleuser().then(() => {
            handlecurUserData();
        })
    });

    const handleuser = async () => {
        if (curUserData.email === ID?.data.email1) {
            setImage(ID?.data.image2)
            setname(ID?.data.name2)
            setUid(ID?.data.Uid2)
        } else {
            setImage(ID?.data.image1)
            setname(ID?.data.name1)
            setUid(ID?.data.Uid1)
        }

        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerconatiner}>
                    <Image source={{ uri: image }} style={styles.headerImage} />
                    <Text style={styles.headerTitle}>{name}</Text>
                </View>
            ),

        });
    }

    const handlecurUserData = async () => {
        const doc = await firestore().collection('users').doc(Uid).get();
        const userD = {
            id: doc.id,
            ...doc.data(),
        };
        setTokenID(userD.tokenID);
    }

    useLayoutEffect(() => {
        const unsubscribe = firestore()
            .collection('ChatsG')
            .doc(ID.id)
            .collection('message')
            .orderBy("timestamp", 'asc')
            .onSnapshot((snapshot) => setmessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
        return unsubscribe;
    }, [route])

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    {messages.map(({ id, data }) =>
                        curUserData.email === data.email ?
                            (<View style={styles.chtasmsgMy}>
                                <Text style={[styles.message, {color: '#000'}]}>{data.message}</Text>
                                <Text style={styles.messageTime}>{data.sendTime}</Text>
                            </View>) :
                            (<View style={styles.chtasmsgOther}>
                                <Text style={styles.messageTime}>{data.sendTime}</Text>
                                <Text style={[styles.message, {color: '#FFF'}]}>{data.message}</Text>
                            </View>)
                    )}
                </ScrollView>
            </View>
            <SendMsg ID={ID} curUserData={curUserData} tokenID={tokenID} />
        </>
    )
}

export default ChatsSrc

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textinput: {
        borderRadius: 50,
        width: '84%',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        elevation: 5

    },
    chtasmsgMy: {
        borderRadius: 50,
        marginRight: 10,
        marginVertical: 5,
        paddingHorizontal: 15,
        alignSelf: 'flex-end',
        paddingVertical: 10,
        backgroundColor: '#fff',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    chtasmsgOther: {
        borderRadius: 50,
        marginVertical: 5,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        paddingVertical: 10,
        backgroundColor: '#3385ff',
        elevation: 5,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    headerImage: {
        width: 40, 
        height: 40, 
        borderRadius: 100, 
        marginLeft: -20
    },
    headerconatiner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: 10, 
        fontSize: 17, 
        color: '#000', 
        fontWeight: '700'
    },
    message: {
        fontSize: 15
    },
    messageTime: {
        fontSize: 10,
        marginHorizontal: 2
    }
})