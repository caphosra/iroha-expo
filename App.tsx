import React from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { MainContent } from "./src/MainContent";
import { menuDatabase } from "./src/models/MenuDB";

interface IAppProps { }

interface IAppState {
    isReady: boolean;
}

/**
 * Here is the root of this project.
 *
 * If you are going to edit this section, stop it and think again.
 * You will notice where you should REALLY edit --- `MainContent`.
 */
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf")
        });

        await menuDatabase.init();

        this.setState({
            isReady: true
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading />
            );
        }
        else {
            return <MainContent />;
        }
    }
}
