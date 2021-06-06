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
import { irohaColor } from "../ThemeColor";

/**
 * A component which draw a header.
 */
export class IrohaHeader extends React.Component {
    render() {
        return (
            <Header androidStatusBarColor={irohaColor} style={{ backgroundColor: irohaColor }}>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Iroha</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
