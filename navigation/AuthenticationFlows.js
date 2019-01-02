import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import OtherScreen from './OtherScreen';
import App from './App';


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    _showMoreApp = () => {
        this.props.navigation.navigate('Bot');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Other');
    };

    render() {
        return (
            <View>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="Form Add data :)" onPress={this._signOutAsync} />
            </View>
        );
    }
}

const AppStack = createStackNavigator({  Home: HomeScreen , Other: OtherScreen , Bot: App });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));
