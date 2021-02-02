import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Router, Switch } from "react-router-native";
import { createMemoryHistory } from "history";
import { Home } from "./components/Home";

/**
 * Stores users history. It is required by react-router,
 */
const history = createMemoryHistory();

/**
 * Styles for MainContent
 */
const mainContentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

/**
 * A component which works as the root and has all of the components.
 */
export class MainContent extends React.Component {
    render() {
        return (
            <View style={mainContentStyles.container}>
                <Router history={history}>
                    <Switch>
                        <Route component={Home}></Route>
                    </Switch>
                </Router>
            </View>
        );
    }
}
