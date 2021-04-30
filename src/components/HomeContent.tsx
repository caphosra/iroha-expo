import React from "react";
import { H1, Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { getRandomJoke } from "../logics/GenerateJokes";

const homeContentStyles = StyleSheet.create({
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
 * Properties of `HomeContent`.
 *
 * Note that the interface inherits `RouteComponentProps` due to using users history.
 */
export interface HomeContentProps extends RouteComponentProps { }

/**
 * A main UI of Maccha. All of the UIs would be invoked via the content.
 */
export class HomeContent extends React.Component<HomeContentProps> {
    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <H1 style={homeContentStyles.title}>
                    Macchaへようこそ!
                </H1>
                <Image
                    style={homeContentStyles.image}
                    source={require("../../assets/icon.png")}
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

/**
 * A class which is made of `HomeContent` and `Router`.
 *
 * For more information, please refer `HomeContent` or read react-router documentations.
 */
export const HomeContentWithRouter = withRouter(HomeContent);
