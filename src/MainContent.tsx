import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import {
    Container,
    Content,
    Text
} from "native-base";
import React from "react";
import {
    Route,
    MemoryRouter,
    Switch
} from "react-router-native";

import { IrohaFooterWithRouter } from "./components/Footer";
import { IrohaHeader } from "./components/Header";
import { HomeContent } from "./components/HomeContent";
import { NoticeList } from "./components/NoticeList";
import { OrderList } from "./components/OrderList";
import { TakeOrder } from "./components/TakeOrder";

interface IMainContentProps { }

interface IMainContentState {
    isReady: boolean;
}

/**
 * A component which works as the root and has all of the components.
 */
export class MainContent extends React.Component<IMainContentProps, IMainContentState> {
    constructor(props: IMainContentProps) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ...Ionicons.font
        });
        this.setState({
            isReady: true
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <Text>Now loading...</Text>
            );
        }

        return (
            <Container>
                <MemoryRouter>
                    <IrohaHeader />
                    <Content>
                        <Switch>
                            <Route path="/done" component={NoticeList} />
                            <Route path="/cook" component={OrderList} />
                            <Route path="/take" component={TakeOrder} />
                            <Route path="/" component={HomeContent} />
                        </Switch>
                    </Content>
                    <IrohaFooterWithRouter />
                </MemoryRouter>
            </Container>
        );
    }
}
