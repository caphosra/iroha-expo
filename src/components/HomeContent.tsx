import React from "react";
import { H1, Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";

/**
 * Styles for `HomeContent`.
 */
const homeContentStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    },
    image: {
        margin: 30,
        width: 256,
        height: 256
    },
    content: {
        margin: 10
    }
});

/**
 * A main UI of Iroha. All of the UIs would be invoked via the content.
 */
export class HomeContent extends React.Component {
    render() {
        return (
            <View style={homeContentStyles.container}>
                <Image
                    style={homeContentStyles.image}
                    source={require("../../assets/logo.png")}
                />
                <H1 style={homeContentStyles.content}>
                    喫茶班システム - Iroha
                </H1>
                <Text style={homeContentStyles.content}>
                    Designed by capra314cabra (70th)
                </Text>
            </View>
        );
    }
}
