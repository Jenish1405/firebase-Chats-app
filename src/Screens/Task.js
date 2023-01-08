import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Task = () => {
    return (
        <View>
            <Text>jsdahbvkjhsd</Text>
            <WebView
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
                cacheEnabled
                sharedCookiesEnabled={true}
                startInLoadingState
                onError={() => console.warn("error")}
                source={{
                    uri: "http://google.com",
                }
                }
            >
                <Text>sfbvfzsd</Text>
            </WebView>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({})