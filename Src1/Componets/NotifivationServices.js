import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


const getFcmToken = async () => {

    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log(fcmToken, "the old token")
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, "the new genrated token");
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log(error, "error")
        }
    }
}

export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging().onMessage(async remoteMessage => {
        console.log('recived in forground', remoteMessage)
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}