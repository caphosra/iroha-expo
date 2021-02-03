import React from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";
import { HomeButton } from "./HomeButton";

/**
 * Styles for `HomeContent`.
 */
const homeContentStyles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallContainer: {
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
 * Properties of `HomeContent`.
 *
 * Note that the interface inherits `RouteComponentProps` due to using users history.
 */
export interface HomeContentProps extends RouteComponentProps { }

/**
 * A main UI of Maccha. All of the UIs would be invoked via the content.
 */
export class HomeContent extends React.Component<HomeContentProps> {
    onTakeOrdersButtonClicked = () => {
        this.props.history.push("/take");
    }

    onFindOrdersButtonClicked = () => {
        this.props.history.push("/find");
    }

    render() {
        return (
            <View>
                <View style={homeContentStyles.container}>
                    <Text style={homeContentStyles.title}>Maccha</Text>
                </View>
                <View style={homeContentStyles.container}>
                    <Image
                        style={homeContentStyles.logo}
                        source={require("../../../assets/icon.png")}
                    />
                </View>
                <View style={homeContentStyles.smallContainer}>
                    <HomeButton
                        color="green"
                        onPress={this.onTakeOrdersButtonClicked}>
                        Take Orders
                    </HomeButton>
                </View>
                <View style={homeContentStyles.smallContainer}>
                    <HomeButton
                        color="blue"
                        onPress={this.onFindOrdersButtonClicked}>
                        Find Orders
                    </HomeButton>
                </View>
                <View style={homeContentStyles.smallContainer}>
                    <Text style={homeContentStyles.joke}>30 Devices Run Maccha</Text>
                </View>
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
