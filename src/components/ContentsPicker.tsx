import React from "react";
import { Item, Label, Picker, Icon } from "native-base";
import { StyleSheet, View } from "react-native";

/**
 * Styles for `ContentsPicker`.
 */
const contentsPickerStyles = StyleSheet.create({
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
 * Properties of `ContentsPicker`.
 */
interface IContentsPickerProps {
    title: string;
    onChanged: (value: number) => void;
    label: (value: number) => string;
}

/**
 * Status of `ContentsPicker`.
 */
interface IContentsPickerState {
    selected: string;
}

/**
 * A component which generates a picker which user can choose an item from the list.
 */
export class ContentsPicker extends React.Component<IContentsPickerProps, IContentsPickerState> {
    private readonly MAXIMUM_ORDER_SIZE = 6;

    constructor(props: IContentsPickerProps) {
        super(props);

        this.state = {
            selected: "0"
        };
    }

    onValueChanged = (val: string, index: number) => {
        this.props.onChanged(index);

        this.setState({
            selected: val
        });
    }

    renderIosIcon() {
        return (
            <Icon name="arrow-down" />
        );
    }

    renderPickerItem(id: number): JSX.Element {
        return (
            <Picker.Item
                label={this.props.label(id)}
                key={`${this.props.title}-${id}`}
                value={`${id}`}
            />
        );
    }

    render() {
        const numbersArray = Array.from(Array(this.MAXIMUM_ORDER_SIZE).keys());

        return (
            <View style={contentsPickerStyles.items}>
                <Label>{this.props.title}</Label>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={this.renderIosIcon()}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChanged}
                        style= {contentsPickerStyles.picker}
                    >
                        {
                            numbersArray.map((id: number) => {
                                return this.renderPickerItem(id);
                            })
                        }
                    </Picker>
                </Item>
            </View>
        );
    }
}
