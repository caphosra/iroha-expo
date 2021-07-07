import { Container, Content } from "native-base";
import React from "react";
import { Route, MemoryRouter, Switch } from "react-router-native";
import { IrohaFooterWithRouter } from "./components/Footer";
import { IrohaHeader } from "./components/Header";
import { HomeContent } from "./components/HomeContent";
import { NoticeList } from "./components/NoticeList";
import { OrderList } from "./components/OrderList";
import { TakeOrderWithRouter } from "./components/TakeOrder";

/**
 * A component which works as the root and has all of the components.
 */
export class MainContent extends React.Component {
    render() {
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
