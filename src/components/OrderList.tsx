import React from "react";
import { H1, Card, CardItem, Body, Text } from "native-base";
import { StyleSheet, View } from "react-native";

import { IOrderInfo, OrderStatus } from "../models/OrderInfo";

/**
 * Styles for `OrderList`.
 */
const orderListStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    },
    card: {
        width: "90%"
    }
});

/**
 * Properties of `OrderItem`.
 */
interface IOrderItemProps {
    order: IOrderInfo;
}

/**
 * This is an UI which displays information of an order.
 */
 export class OrderItem extends React.Component<IOrderItemProps> {
    render() {
        return (
            <Card style={orderListStyles.card}>
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.order.tableID}番テーブルのオーダー
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

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
                <OrderItem order={{ id: 0, tableID: 0, date: new Date(), orders: [], status: OrderStatus.READY }} />
            </View>
        );
    }
}
