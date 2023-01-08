import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginSrc = ({ navigation }) => {


    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const [tokenID, setTokenID] = useState();
    const [data, setdata] = useState({
        email: '',
        Password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true
    });

    useEffect(() => {
        getFcmToken();
    }, [])

    const getFcmToken = async () => {


        let fcmToken = await AsyncStorage.getItem('fcmToken')
        // console.log(fcmToken, "the old token Login")
        setTokenID(fcmToken);
        if (!fcmToken) {
            try {
                const fcmToken = await messaging().getToken();
                if (fcmToken) {
                    // console.log(fcmToken, "the new genrated token");
                    setTokenID(fcmToken)
                    await AsyncStorage.setItem('hello', fcmToken)
                }
            } catch (error) {
                console.log(error, "error")
            }
        }
    }

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home', { curruntUser: authUser })
            }
        });
        return unsubscribe;
    }, [])



    const handleLogin = async () => {
        if (email && password) {
            await auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    firestore()
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            tokenID: tokenID
                        })
                    console.log('Logged in with:', user.email);
                    Alert.alert('Login Successfully')
                    navigation.navigate('Home', { curruntUser: user })
                    setEmail('')
                    setpassword('')
                }).catch(error => alert(error.message))

        } else {
            Alert.alert('Plz Enter Details')
        }

    }

    const handleValidEmail = (tex) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail(tex)
        if (re.test(tex) || regex.test(tex)) {
            setdata({
                ...data,
                isValidEmail: true,
            })
        } else {
            setdata({
                ...data,
                isValidEmail: false
            })
        }
    }


    const handleValidPassword = (tex) => {
        setpassword(tex)
        if (tex.trim().length >= 6) {
            setdata({
                ...data,
                isValidPassword: true,
            })
        } else {
            setdata({
                ...data,
                isValidPassword: false
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.textcontainer}>
                <TextInput
                    value={email}
                    onChangeText={tex => handleValidEmail(tex)}
                    placeholder='Email Id'
                    style={styles.inputbox}
                    autoCapitalize='none' />
                {data.isValidEmail ? null :
                    <Text style={styles.errormsg}>Enter valid Email Id</Text>}
                <TextInput
                    value={password}
                    onChangeText={tex => handleValidPassword(tex)}
                    placeholder='Password'
                    secureTextEntry
                    style={styles.inputbox} />
                {data.isValidPassword ? null :
                    <Text style={styles.errormsg}>Password must be 6 characters long</Text>}
            </View>

            <View style={styles.btncontainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.btn, { backgroundColor: '#0066ff' }]}>
                    <Text style={[styles.bnttitle, { color: '#FFF' }]}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignupSrc')}
                    style={[styles.btn, { backgroundColor: '#FFF' }]}>
                    <Text style={styles.bnttitle}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginSrc

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
    },
    errormsg: {
        color: 'red',
        marginLeft: 10
    }
})