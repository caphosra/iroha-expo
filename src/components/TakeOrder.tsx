import React from "react";
import { H1 } from "native-base";
import { StyleSheet, View } from "react-native";

/**
 * Styles for `TakeOrder`.
 */
const takeOrderStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    }
});

/**
 * This is an UI which is consider to be used to take orders.
 */
export class TakeOrder extends React.Component {
    render() {
        return (
            <View style={takeOrderStyles.container}>
                <H1 style={takeOrderStyles.title}>
                    注文をとる
                </H1>
            </View>
        );
    }
}
