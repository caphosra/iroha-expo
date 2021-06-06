import React from "react";
import { H1 } from "native-base";
import { StyleSheet, View } from "react-native";

/**
 * Styles for `OrderList`.
 */
const orderListStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    }
});

/**
 * This is an UI which displays items ordered.
 */
export class OrderList extends React.Component {
    render() {
        return (
            <View style={orderListStyles.container}>
                <H1 style={orderListStyles.title}>
                    現在の注文
                </H1>
            </View>
        );
    }
}
