import userMessageDbRef from "@react-native-firebase/messaging";


export const sendNotification = ({ tokenID, title, body }) => {
    const fcmToken = tokenID;
        const fcmURL = "https://fcm.googleapis.com/fcm/send";
        const firebaseServerKey = "AAAAGgUqivo:APA91bHm2FXw-VUkZ1XSZ04B0LlYpYr0Wp1aXDi7FIoyXVn4QEDbVwfqovoFoh6j9O_p-gkmQn43uDd9T07fF-FEqyFb_EFKfZmRXnLKJDrPkDdeT2agVI5GyeVPgNaMi8AmEfbmxbYf";
      
      console.log("TokenID==>>", tokenID)
      console.log("Title==>>", title)
      console.log("Boby==>>", body)

        const data = {
          registration_ids: [
            fcmToken,
          ],
          notification: {
            title: title,
            body: body,
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: "high",
            content_available: true,
          },
          data: {
            title: title,
            body: body,
            time: 'time',
            type: 'type',
            id: 1
          },
        };
        fetch(fcmURL, {
          method: 'post',
          headers: new Headers({
            'Authorization': 'key=' + firebaseServerKey,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(data)
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            let data = {
              notificationId: '',
              notificationTitle: title,
              notificationBody: body,
              notificationDate: 'time',
              userId: 1,
              type: 'type'
            };
            userMessageDbRef
              .add(data).then(async (res) => {
                userMessageDbRef.doc(res.id)
                  .update({ notificationId: res.id })
      
              });
          }
          else {
          }
        })
          .catch((error) => { console.log("error", error); });
}