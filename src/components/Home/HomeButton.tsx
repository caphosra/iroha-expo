import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "react-native-button";

/**
 * Styles for `HomeButton`.
 */
const homeButtonStyles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    blueButtonContainer: {
        padding: 10,
        width: 300,
        height: 50,
        backgroundColor: "blue",
        borderRadius: 10
    },
    greenButtonContainer: {
        padding: 10,
        width: 300,
        height: 50,
        backgroundColor: "green",
        borderRadius: 10
    }
});

/**
 * Properties of `HomeButton`.
 */
export interface HomeButtonProps {
    color: "blue" | "green";
    onPress: () => void
}

/**
 * A button used for constructing `HomeContent`.
 */
export class HomeButton extends React.Component<HomeButtonProps> {
    render() {
        const containerStyle = this.props.color == "blue"
            ? homeButtonStyles.blueButtonContainer
            : homeButtonStyles.greenButtonContainer;

        return (
            <View>
                <Button
                    style={homeButtonStyles.buttonText}
                    containerStyle={containerStyle}
                    onPress={() => this.props.onPress()}
                >
                    {this.props.children}
                </Button>
            </View>
        );
    }
}
