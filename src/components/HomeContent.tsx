import React from "react";
import { H1, Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";
import { getRandomJoke } from "../logics/GenerateJokes";

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
        width: 128,
        height: 128
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
                <H1 style={homeContentStyles.title}>
                    Irohaへようこそ!
                </H1>
                <Image
                    style={homeContentStyles.image}
                    source={require("../../assets/logo.png")}
                />
                <Text style={homeContentStyles.content}>
                    下のタブからやるべき事へと移りましょう!{"\n"}
                    何もすることがない人はいないはずですからね!
                </Text>
                <Text style={homeContentStyles.content}>
                    {getRandomJoke()}
                </Text>
            </View>
        );
    }
}
