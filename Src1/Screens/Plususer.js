import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const Plususer = ({ route, navigation }) => {

    const curuserId = route.params.curuserId;

    const [AllUserData, setAllUserData] = useState([]);
    const [getkey, setgetkey] = useState();
    console.log(curuserId)

    useEffect(() => {
        handlegetallusers();
    }, [])

    const handlegetallusers = async () => {
        await firestore()
            .collection('users')
            .onSnapshot(snapshot => setAllUserData(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
    }

    const handlecustomRoom = async ({data, id}) => {
        
       await firestore()
            .collection('ChatsG')
            .add({
                email1: curuserId.email,
                email2: data.email,
                name1: curuserId.fullname,
                name2: data.fullname,
                image1: curuserId.profilePic,
                image2: data.profilePic,
                Uid1: curuserId.id,
                Uid2: id,
            })
            .then(() => navigation.goBack())
    }

   

    return (
        <View style={styles.container}>
            {
                AllUserData.map(({ id, data }) =>
                    curuserId.email === data.email ? (
                        null
                    ) : (
                        <TouchableOpacity onPress={() => handlecustomRoom({data, id})}>
                            <View style={{
                                alignSelf: 'center',
                                width: '90%',
                                borderRadius: 10,
                                elevation: 5,
                                marginVertical: 5,
                                paddingHorizontal: 15,
                                flexDirection: 'row',
                                height: 70,
                                alignItems: 'center',
                                backgroundColor: '#FFF',

                            }}>
                                <Image source={{ uri: data.profilePic }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#000', marginLeft: 10 }}>{data.fullname}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                )
            }
        </View>
    )
}

export default Plususer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})