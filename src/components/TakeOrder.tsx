import React from "react";
import { H1, Form, Item, Button, Label, Picker, Icon, Text } from "native-base";
import { Alert, StyleSheet, View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-native";

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
    },
    picker: {
        marginLeft: 20,
        height: 50
    }
});

/**
 * Properties of `MenuPicker`.
 */
interface IMenuPickerProps {
    menu_id: number;
    onChanged: (value: number) => void;
}

/**
 * A component which generates a picker which user can choose an item from the list.
 */
class MenuPicker extends React.Component<IMenuPickerProps> {
    private readonly MAXIMUM_ORDER_SIZE = 6;

    constructor(props: IMenuPickerProps) {
        super(props);
    }

    render() {
        return (
            <View style={takeOrderStyles.items}>
                <Label>{menuDatabase.get(this.props.menu_id).menu_name}</Label>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={"key0"}
                        onValueChange={(val) => {
                            this.props.onChanged(val);
                        }}
                        style= {takeOrderStyles.picker}
                    >
                        {
                            Array.from(Array(this.MAXIMUM_ORDER_SIZE).keys())
                                .map((id: number) => (
                                    <Picker.Item label={`${id}個`} key={`menu${this.props.menu_id}-${id}`} value={id} />
                                ))
                        }
                    </Picker>
                </Item>
            </View>
        );
    }
}

/**
 * A component which generates a picker which user can specify a table.
 */
class TableIDPicker extends React.Component {
    private readonly MAXIMUM_TABLE_SIZE = 6;

    render() {
        return (
            <View style={takeOrderStyles.items}>
                <Label>席番号</Label>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={"key0"}
                        onValueChange={() => {}}
                        style= {takeOrderStyles.picker}
                    >
                        {
                            Array.from(Array(this.MAXIMUM_TABLE_SIZE).keys())
                                .map((id: number) => (
                                    <Picker.Item label={`${id + 1}番`} key={`table${id}`} value={id} />
                                ))
                        }
                    </Picker>
                </Item>
            </View>
        );
    }
}

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
        await ordersDatabase.post(this.state.order);

        Alert.alert(
            "注文完了!",
            "伝票をサーバーに送りました。"
        );

        this.props.history.push("/");
    }

    onMenuItemChanged = (order_id: number) => {
        return (val: number) => {
            this.state.order.orders[order_id] = val;
        };
    }

    render() {
        return (
            <View style={takeOrderStyles.container}>
                <H1 style={takeOrderStyles.title}>
                    伝票をとる
                </H1>
                <Form style={takeOrderStyles.form}>
                    <TableIDPicker />
                    {
                        Array.from(Array(menuDatabase.size()).keys())
                            .map((id) => (
                                <MenuPicker
                                    menu_id={id}
                                    onChanged={this.onMenuItemChanged(id)}
                                />
                            ))
                    }
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
