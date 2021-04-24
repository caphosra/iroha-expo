import React from "react";
import { H1, Text } from "native-base";
import { View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { getRandomJoke } from "../../logics/GenerateJokes";

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
            <View>
                <H1>Maccha</H1>
                <Text>{getRandomJoke()}</Text>
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
