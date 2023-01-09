import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from "react-native-vector-icons/Entypo";
import Icons1 from "react-native-vector-icons/MaterialIcons";
import firestore from '@react-native-firebase/firestore';
import UserFlatList from '../Componets/UserFlatList';
import auth from '@react-native-firebase/auth'

const Home = ({ navigation, route }) => {

    const CurUserData = route.params.curruntUser;

    const [UserData, setUserData] = useState();
    const [ChatsData, setChatsData] = useState();

    useEffect(() => {
        handlecurUserData();
        handlechatscom();
    }, [])

    const handlecurUserData = async () => {
        const doc = await firestore().collection('users').doc(CurUserData.uid).get();
        const userD = {
            id: doc.id,
            ...doc.data(),
        };
        setUserData(userD);
    }

    const handlechatscom = () => {
        firestore()
            .collection('ChatsG')
            .onSnapshot(snapshot => setChatsData(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
    }

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(() => {
                navigation.navigate('LoginSrc')
            });
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.headercontainer}>
                    <Text style={styles.headerTitle}>
                        Chats
                    </Text>
                    <View style={styles.headerRightcontainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Plususer', { curuserId: UserData })}
                            style={styles.icons}>
                            <Icons name='plus' size={25} color={'#000'} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleLogOut}
                            style={styles.icons} >
                            <Icons1 name='logout' size={25} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={ChatsData}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ChatsSrc', { userId: item, curUser: UserData })}>
                                        <UserFlatList item={item} curUser={CurUserData?._user} />
                                    </TouchableOpacity>
                                </>
                            )
                        }}
                    />
                </View>
            </View>
        </>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headercontainer: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#FFF'
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000'
    },
    headerRightcontainer: {
        flexDirection: 'row', 
        width: 80, 
        justifyContent: 'space-between'
    },
    icons: {
        padding: 5, 
        borderRadius: 8, 
        backgroundColor: '#FFF', 
        elevation: 10
    }
})