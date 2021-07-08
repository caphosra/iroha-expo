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
    waitingTimeItem: {
        marginTop: 20,
        marginLeft: 20,
        color: "#60E627"
    },
    waitingTimeOver5Item: {
        marginTop: 20,
        marginLeft: 20,
        color: "#F70010"
    },
    waitingTimeOver10Item: {
        marginTop: 20,
        marginLeft: 20,
        color: "#9900F7"
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
    renderWaitTimeView(): JSX.Element {
        const waitingTimeMilliseconds = Date.now() - this.props.order.posted.getTime();
        const waitingTimeMinutes = Math.floor(waitingTimeMilliseconds / (1000 * 60));

        if (waitingTimeMinutes < 5) {
            return (
                <Text style={orderItemStyles.waitingTimeItem}>
                    {`${waitingTimeMinutes}分待ち`}
                </Text>
            );
        }
        else if (waitingTimeMinutes < 10) {
            return (
                <Text style={orderItemStyles.waitingTimeOver5Item}>
                    {`${waitingTimeMinutes}分待ち`}
                </Text>
            );
        }
        else {
            return (
                <Text style={orderItemStyles.waitingTimeOver10Item}>
                    {`${waitingTimeMinutes}分待ち`}
                </Text>
            );
        }
    }

    renderOrderItem(val: number, menu_id: number): JSX.Element | null {
        if (val) {
            const menuName = menuDatabase.get(menu_id).menu_name;

            return (
                <Text style={orderItemStyles.orderItem}>
                    {`${menuName} × ${val}`}
                </Text>
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Card style={orderItemStyles.card}>
                <CardItem>
                    <Body>
                        <Text style={orderItemStyles.title}>
                            {this.props.order.table_id + 1}番テーブルのオーダー
                        </Text>
                        {this.renderWaitTimeView()}
                        {
                            this.props.order.orders.map((val, index) => {
                                return this.renderOrderItem(val, index);
                            })
                        }
                        {this.props.children}
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
