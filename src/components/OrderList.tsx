import React from "react";
import { Text, Button } from "native-base";
import { StyleSheet, View } from "react-native";

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
interface IOrderListProps { }

/**
 * State of `OrderList`.
 */
interface IOrderListState {
    orders: IOrderInfo[];
}

/**
 * This is an UI which displays items ordered.
 */
export class OrderList extends React.Component<IOrderListProps, IOrderListState> {
    constructor(props: IOrderListProps) {
        super(props);

        this.state = {
            orders: []
        };

        this.loadOrders();
    }

    async loadOrders() {
        let orders = await ordersDatabase.get(OrderStatus.POSTED)

        this.setState({
            orders: orders
        });
    }

    renderOrderItem = (order: IOrderInfo) => {
        return (
            <View style={{ width: "100%", flexDirection: "row" }}>
                <Button success block style={orderListStyles.button}>
                    <Text>準備完了</Text>
                </Button>
                <Button danger block style={orderListStyles.button}>
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
