import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Router, Switch } from "react-router-native";
import { createMemoryHistory } from "history";
import { HomeContentWithRouter } from "./components/Home/HomeContent";

/**
 * Stores users history. It is required by react-router,
 */
const history = createMemoryHistory();

/**
 * Styles for `MainContents`
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
                        <Route component={HomeContentWithRouter}></Route>
                    </Switch>
                </Router>
            </View>
        );
    }
}
