import React from "react";
import { H1 } from "native-base";
import { StyleSheet, View } from "react-native";

/**
 * Styles for `NoticeList`.
 */
const noticeListStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    }
});

/**
 * This is an UI which displays meals being ready.
 */
export class NoticeList extends React.Component {
    render() {
        return (
            <View style={noticeListStyles.container}>
                <H1 style={noticeListStyles.title}>
                    完成
                </H1>
            </View>
        );
    }
}
