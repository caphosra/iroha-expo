import React from "react";
import { Alert, StyleSheet, Text, View, Image, Button } from "react-native";

/**
 * Styles for HomeContent.
 */
const homeContentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title : {
        fontSize: 40
    },
    logo : {
        width: 150,
        height: 150
    },
    joke : {
        fontSize: 15
    }
});

/**
 * A component which works as the root and has all of the components.
 */
export class Home extends React.Component {
    render() {
        return (
            <View>
                <View style={homeContentStyles.container}>
                    <Text style={homeContentStyles.title}>Maccha</Text>
                </View>
                <View style={homeContentStyles.container}>
                    <Image
                        style={homeContentStyles.logo}
                        source={require("../../assets/icon.png")}
                    />
                </View>
                <View style={homeContentStyles.container}>
                    <Button title="Take order" onPress={() => Alert.alert("hey")}></Button>
                </View>
                <View style={homeContentStyles.container}>
                    <Text style={homeContentStyles.joke}>30 Devices Run Maccha</Text>
                </View>
            </View>
        );
    }
}
