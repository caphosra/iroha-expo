import React from "react";
import { H1, Form, Button, Text } from "native-base";
import { Alert, StyleSheet, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";

import { ContentsPicker } from "./ContentsPicker";
import { menuDatabase } from "../models/MenuDB";
import { IOrderInfo, ordersDatabase, get_infinity_date } from "../models/OrdersDB";

/**
 * Styles for `TakeOrder`.
 */
const takeOrderStyles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    title: {
        margin: 30
    },
    form: {
        width: "80%"
    },
    items: {
        margin: 20,
        width: "100%"
    }
});

/**
 * Properties of `TakeOrder`.
 */
interface ITakeOrderProps extends RouteComponentProps { }

/**
 * State of `TakeOrder`.
 */
interface ITakeOrderState {
    order: IOrderInfo
}

/**
 * This is an UI which is consider to be used to take orders.
 */
export class TakeOrder extends React.Component<ITakeOrderProps, ITakeOrderState> {
    private readonly MAXIMUM_ORDER_ID = 2100000000;

    constructor(props: ITakeOrderProps) {
        super(props);

        this.state = {
            order: {
                order_id: Math.floor(Math.random() * this.MAXIMUM_ORDER_ID),
                table_id: 1,
                posted: get_infinity_date(),
                ready: get_infinity_date(),
                served: get_infinity_date(),
                paid: get_infinity_date(),
                orders: new Array<number>(menuDatabase.size())
            }
        };
    }

    onPostButtonClicked = async () => {
        this.state.order.posted = new Date(Date.now());

        await ordersDatabase.post(this.state.order);

        Alert.alert(
            "注文完了!",
            "伝票をサーバーに送りました。"
        );

        this.props.history.push("/");
    }

    onTableIDChanged = (table_id: number) => {
        let order = this.state.order;
        order.table_id = table_id;

        this.setState({
            order: order
        });
    }

    onMenuItemChanged = (order_id: number) => {
        return (val: number) => {
            let order = this.state.order;
            order.orders[order_id] = val;

            this.setState({
                order: order
            });
        };
    }

    renderTablePicker(): JSX.Element {
        return (
            <ContentsPicker
                title="席番号"
                onChanged={this.onTableIDChanged}
                label={(val) => `${val + 1}番`}
            />
        )
    }

    renderMenuPickers(): JSX.Element[] {
        const menuArrays = Array.from(Array(menuDatabase.size()).keys());

        return menuArrays.map((id) => {
            const menuName = menuDatabase.get(id).menu_name;

            return (
                <ContentsPicker
                    title={menuName}
                    onChanged={this.onMenuItemChanged(id)}
                    label={(val) => `${val}個`}
                    key={`menu-picker-${id}`}
                />
            );
        });
    }

    render() {
        return (
            <View style={takeOrderStyles.container}>
                <H1 style={takeOrderStyles.title}>
                    伝票をとる
                </H1>
                <Form style={takeOrderStyles.form}>
                    {this.renderTablePicker()}
                    {this.renderMenuPickers()}
                    <Button block style={takeOrderStyles.items} onPress={this.onPostButtonClicked}>
                        <Text>伝票を発行</Text>
                    </Button>
                </Form>
            </View>
        );
    }
}

/**
 * A class which is made of `TakeOrder` and `Router`.
 *
 * For more information, please refer `TakeOrder` or read react-router documentations.
 */
export const TakeOrderWithRouter = withRouter(TakeOrder);
