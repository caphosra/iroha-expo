import React from "react";
import { H1, Form, Item, Button, Label, Picker, Icon, Text } from "native-base";
import { StyleSheet, View } from "react-native";

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
        marginTop: 20,
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
    name: string;
}

/**
 * A component which is a button used for the footer.
 */
class MenuPicker extends React.Component<IMenuPickerProps> {
    constructor(props: IMenuPickerProps) {
        super(props);
    }

    render() {
        return (
            <View style={takeOrderStyles.items}>
                <Label>{this.props.name}</Label>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={"key0"}
                        onValueChange={() => {}}
                        style= {takeOrderStyles.picker}
                    >
                        {
                            Array.from(Array(6).keys())
                                .map((id: number) => (
                                    <Picker.Item label={`${id}個`} key={`key${id}`} value={`key${id}`} />
                                ))
                        }
                    </Picker>
                </Item>
            </View>
        );
    }
}

/**
 * This is an UI which is consider to be used to take orders.
 */
export class TakeOrder extends React.Component {
    render() {
        return (
            <View style={takeOrderStyles.container}>
                <H1 style={takeOrderStyles.title}>
                    伝票をとる
                </H1>
                <Form style={takeOrderStyles.form}>
                    <Item picker style={takeOrderStyles.items}>
                        <Label>席番号</Label>
                        <Picker
                            style={takeOrderStyles.picker}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            selectedValue={"key0"}
                            onValueChange={() => {}}
                        >
                            <Picker.Item label="0番" value="key0" />
                            <Picker.Item label="1番" value="key1" />
                            <Picker.Item label="2番" value="key2" />
                            <Picker.Item label="3番" value="key3" />
                            <Picker.Item label="4番" value="key4" />
                        </Picker>
                    </Item>
                    <MenuPicker name="ホットケーキ" />
                    <MenuPicker name="コーヒー" />
                    <MenuPicker name="パフェ" />
                    <Button block style={takeOrderStyles.items}>
                        <Text>伝票を発行</Text>
                    </Button>
                </Form>
            </View>
        );
    }
}
