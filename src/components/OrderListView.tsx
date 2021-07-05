import React from "react";
import { H1 } from "native-base";
import { StyleSheet, View } from "react-native";

import { OrderItem } from "./OrderItem";
import { IOrderInfo, ordersDatabase, OrderStatus } from "../models/OrdersDB";

/**
 * Styles for `OrderListView`.
 */
const orderListViewStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    }
});

/**
 * Properties of `OrderListView`.
 */
interface IOrderListViewProps {
    title: string;
    filter: OrderStatus;
    onPaintOrderItem: (order: IOrderInfo) => JSX.Element;
}

/**
 * State of `OrderListView`.
 */
interface IOrderListViewState {
    loadStatus: OrderListViewStatus;
    orders: IOrderInfo[];
}

/**
 * Status of the connection between the server and this app.
 */
enum OrderListViewStatus {
    LOADING,
    FAILED_TO_LOAD,
    LOADED
}

/**
 * This is an UI which displays items ordered.
 */
export class OrderListView extends React.Component<IOrderListViewProps, IOrderListViewState> {
    constructor(props: IOrderListViewProps) {
        super(props);

        this.state = {
            loadStatus: OrderListViewStatus.LOADING,
            orders: []
        };

        this.loadOrders();
    }

    async loadOrders() {
        try {
            let orders = await ordersDatabase.get(this.props.filter);

            this.setState({
                loadStatus: OrderListViewStatus.LOADED,
                orders: orders
            });
        }
        catch(err) {
            this.setState({
                loadStatus: OrderListViewStatus.FAILED_TO_LOAD,
            });
        }
    }

    renderLoadingView() {
        return (
            <View style={orderListViewStyles.container}>
                <H1 style={orderListViewStyles.title}>
                    {this.props.title}
                </H1>
                <H1 style={orderListViewStyles.title}>
                    読み込み中...
                </H1>
            </View>
        );
    }

    renderFailedToLoadView() {
        return (
            <View style={orderListViewStyles.container}>
                <H1 style={orderListViewStyles.title}>
                    {this.props.title}
                </H1>
                <H1 style={orderListViewStyles.title}>
                    読み込み失敗
                </H1>
            </View>
        );
    }

    renderLoadedView() {
        return (
            <View style={orderListViewStyles.container}>
                <H1 style={orderListViewStyles.title}>
                    {this.props.title}
                </H1>
                {
                    this.state.orders
                        .map((val) => {
                            return (
                                <OrderItem order={val}>
                                    {
                                        this.props.onPaintOrderItem(val)
                                    }
                                </OrderItem>
                            );
                        })
                }
            </View>
        );
    }

    render() {
        switch(this.state.loadStatus) {
            case OrderListViewStatus.LOADING:
                return this.renderLoadingView();
            case OrderListViewStatus.LOADED:
                return this.renderLoadedView();
            case OrderListViewStatus.FAILED_TO_LOAD:
                return this.renderFailedToLoadView();
        }
    }
}
