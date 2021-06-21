import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { Container, Content } from "native-base";
import React from "react";
import { Route, MemoryRouter, Switch } from "react-router-native";

import { IrohaFooterWithRouter } from "./components/Footer";
import { IrohaHeader } from "./components/Header";
import { HomeContent } from "./components/HomeContent";
import { NoticeList } from "./components/NoticeList";
import { OrderList } from "./components/OrderList";
import { TakeOrderWithRouter } from "./components/TakeOrder";

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
        await preventAutoHideAsync();
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            ...Ionicons.font
        });
        this.setState({
            isReady: true
        });
        await hideAsync();
    }

    render() {
        if (!this.state.isReady) {
            return null;
        }

        return (
            <Container>
                <MemoryRouter>
                    <IrohaHeader />
                    <Content>
                        <Switch>
                            <Route path="/done" component={NoticeList} />
                            <Route path="/cook" component={OrderList} />
                            <Route path="/take" component={TakeOrderWithRouter} />
                            <Route path="/" component={HomeContent} />
                        </Switch>
                    </Content>
                    <IrohaFooterWithRouter />
                </MemoryRouter>
            </Container>
        );
    }
}
