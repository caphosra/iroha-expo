import React from "react";
import { Text, Button } from "native-base";
import { Alert, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router-native";

import { OrderListView } from "./OrderListView";
import { IOrderInfo, ordersDatabase, OrderStatus } from "../models/OrdersDB";

/**
 * Styles for `OrderList`.
 */
const orderListStyles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginLeft: "3%",
        marginRight: "3%",
        width: "44%"
    }
});

/**
 * Properties of `OrderList`.
 */
interface IOrderListProps extends RouteComponentProps { }

/**
 * This is an UI which displays items ordered.
 */
export class OrderList extends React.Component<IOrderListProps> {
    onDoneButtonClicked = (order: IOrderInfo) => {
        return async () => {
            try {
                await ordersDatabase.mark_as(order.order_id, OrderStatus.READY);

                Alert.alert(
                    "調理完了",
                    "調理が完了したことを把握し、サーバーにデータを送りました。"
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

    onDeleteButtonClicked = (order: IOrderInfo) => {
        return async () => {
            try {
                Alert.alert(
                    "注文削除",
                    "この注文を本当に削除しますか?",
                    [
                        {
                            text: "引き下がるぜ!",
                            style: "cancel"
                        },
                        {
                            text: "削除してやるぜ!",
                            onPress: async () => {
                                await ordersDatabase.delete(order.order_id);

                                Alert.alert(
                                    "削除完了",
                                    "削除が完了しました。"
                                );

                                this.props.history.push("/");
                            }
                        }
                    ]
                );
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
                <Button success block onPress={this.onDoneButtonClicked(order)} style={orderListStyles.button}>
                    <Text>準備完了</Text>
                </Button>
                <Button danger block onPress={this.onDeleteButtonClicked(order)} style={orderListStyles.button}>
                    <Text>取り消し</Text>
                </Button>
            </View>
        );
    };

    render() {
        return (
            <OrderListView
                title={"現在の注文"}
                filter={OrderStatus.POSTED}
                onPaintOrderItem={this.renderOrderItem}
            />
        );
    }
}
