import React from "react";
import { Text, Button } from "native-base";
import { Alert, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router-native";

import { OrderListView } from "./OrderListView";
import { IOrderInfo, ordersDatabase, OrderStatus } from "../models/OrdersDB";

/**
 * Styles for `NoticeList`.
 */
 const noticeListStyles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginLeft: "6%",
        marginRight: "6%",
        width: "88%"
    }
});

/**
 * Properties of `NoticeList`.
 */
interface INoticeListProps extends RouteComponentProps { }

/**
 * This is an UI which displays items ordered.
 */
export class NoticeList extends React.Component<INoticeListProps> {
    onDoneButtonClicked = (order: IOrderInfo) => {
        return async () => {
            try {
                await ordersDatabase.mark_as(order.order_id, OrderStatus.SERVED);

                Alert.alert(
                    "お届け完了",
                    "料理を運べたことを把握し、サーバーにデータを送りました。"
                );

                this.props.history.push("/");
            }
            catch(err) {
                Alert.alert(
                    "エラー発生",
                    "もう既にその注文は何者かによって処理されています。\nまさか...ハッキング...?"
                );

                this.props.history.push("/");
            }
        };
    };

    renderOrderItem = (order: IOrderInfo) => {
        return (
            <View style={{ width: "100%", flexDirection: "row" }}>
                <Button success block onPress={this.onDoneButtonClicked(order)} style={noticeListStyles.button}>
                    <Text>お届け完了</Text>
                </Button>
            </View>
        );
    };

    render() {
        return (
            <OrderListView
                title={"調理が完了した料理"}
                filter={OrderStatus.READY}
                onPaintOrderItem={this.renderOrderItem}
            />
        );
    }
}
