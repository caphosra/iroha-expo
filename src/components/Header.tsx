import {
    Body,
    Button,
    Header,
    Icon,
    Left,
    Right,
    Title
} from "native-base";
import React from "react";
import { macchaColor } from "../ThemeColor";

/**
 * A component which draw a header.
 */
export class MacchaHeader extends React.Component {
    render() {
        return (
            <Header androidStatusBarColor={macchaColor} style={{ backgroundColor: macchaColor }}>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Maccha</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
