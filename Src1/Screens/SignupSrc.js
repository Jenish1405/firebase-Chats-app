import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupSrc = ({ navigation }) => {

    const [Fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [ProfilePic, setProfilePic] = useState();
    const [tokenID, setTokenID] = useState();

    useEffect(() => {
        getFcmToken();
    }, [])

    const getFcmToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken')
        setTokenID(fcmToken);
        if (!fcmToken) {
            try {
                const fcmToken = await messaging().getToken();
                if (fcmToken) {
                    setTokenID(fcmToken)
                    await AsyncStorage.setItem('hello', fcmToken)
                }
            } catch (error) {
                console.log(error, "error")
            }
        }
    }

    const handleSignUp = async () => {
        if(email && password && Fullname) {
            await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set({fullname: Fullname, email: email, profilePic: ProfilePic || "https://reqres.in/img/faces/12-image.jpg", tokenID: tokenID  })
                    .then(() => {
                        Alert.alert('Register Successfully');
                    })
                console.log('Registered with:', user.email);
                navigation.navigate('Home', { curruntUser: user });
            }).catch(error => alert(error.message));
        }else {
            Alert.alert('Plz Enter details');
        }
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.textcontainer}>

                <TextInput
                    value={Fullname}
                    onChangeText={text => setFullname(text)}
                    placeholder='Full name'
                    style={styles.inputbox} />
                <TextInput
                    value={ProfilePic}
                    onChangeText={text => setProfilePic(text)}
                    placeholder='Profile URL'
                    style={styles.inputbox} />
                <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder='Email Id'
                    style={styles.inputbox}
                    autoCapitalize='none' />
                <TextInput
                    value={password}
                    onChangeText={text => setpassword(text)}
                    placeholder='Password'
                    secureTextEntry
                    style={styles.inputbox} />
            </View>

            <View style={styles.btncontainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.btn, { backgroundColor: '#0066ff' }]}>
                    <Text style={[styles.bnttitle, { color: '#FFF' }]}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginSrc')}
                    style={[styles.btn, { backgroundColor: '#FFF' }]}>
                    <Text style={styles.bnttitle}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupSrc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3385ff'
    },
    textcontainer: {
        width: '90%'
    },
    inputbox: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 15,
        elevation: 5
    },
    btncontainer: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20

    },
    btn: {
        paddingVertical: 10,
        width: 150,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        elevation: 5

    },
    bnttitle: {
        fontSize: 17,
        fontWeight: '700'
    }
})