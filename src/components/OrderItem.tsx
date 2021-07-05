import React from "react";
import { Card, CardItem, Body, Text } from "native-base";
import { StyleSheet } from "react-native";

import { menuDatabase } from "../models/MenuDB";
import { IOrderInfo } from "../models/OrdersDB";

/**
 * Styles for `OrderItem`.
 */
 const orderItemStyles = StyleSheet.create({
    card: {
        width: "90%",
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        marginLeft: 10
    },
    orderItem: {
        marginTop: 20,
        marginLeft: 20
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
            <Card style={orderItemStyles.card}>
                <CardItem>
                    <Body>
                        <Text style={orderItemStyles.title}>
                            {this.props.order.table_id + 1}番テーブルのオーダー
                        </Text>
                        {
                            this.props.order.orders.map((val, index) => {
                                if (val) {
                                    const menuName = menuDatabase.get(index).menu_name;
                                    return (
                                        <Text style={orderItemStyles.orderItem}>
                                            {`${menuName} × ${val}`}
                                        </Text>
                                    );
                                }
                            })
                        }
                        {this.props.children}
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
