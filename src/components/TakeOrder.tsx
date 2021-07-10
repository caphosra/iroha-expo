import React from "react";
import { H1, Form, Button, Text } from "native-base";
import { Alert, StyleSheet, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";

import { ContentsPicker } from "./ContentsPicker";
import { menuDatabase } from "../models/MenuDB";
import { ordersDatabase } from "../models/OrdersDB";

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
    order_id: number;
    table_id: number;
    orders: number[];
}

/**
 * This is an UI which is consider to be used to take orders.
 */
export class TakeOrder extends React.Component<ITakeOrderProps, ITakeOrderState> {
    private readonly MAXIMUM_ORDER_ID = 2100000000;

    constructor(props: ITakeOrderProps) {
        super(props);

        this.state = {
            order_id: Math.floor(Math.random() * this.MAXIMUM_ORDER_ID),
            table_id: 1,
            orders: new Array<number>(menuDatabase.menu.length)
        };
    }

    onPostButtonClicked = async () => {
        await ordersDatabase.post(
            this.state.order_id,
            this.state.table_id,
            this.state.orders
        );

        Alert.alert(
            "注文完了!",
            "伝票をサーバーに送りました。"
        );

        this.props.history.push("/");
    }

    onTableIDChanged = (table_id: number) => {
        this.setState({
            table_id: table_id
        });
    }

    onMenuItemChanged = (order_id: number) => {
        return (val: number) => {
            let orders = this.state.orders;
            orders[order_id] = val;

            this.setState({
                orders: orders
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
        const menuArrays = Array.from(Array(menuDatabase.menu.length).keys());

        return menuArrays.map((id) => {
            const menuName = menuDatabase.get_by_id(id).menu_name;

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
