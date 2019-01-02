import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import Add from './Add';
import App from './App';
import SCORE2T4 from '../screens/SCORE2T4';
import SCORE5T8 from '../screens/SCORE5T8';
import SCORE9T16 from '../screens/SCORE9T16';
import SCORE17P from '../screens/SCORE17P';

import Check_me from '../screens/Check_me';
import Let_talk from '../screens/Let_talk';
import Need_help from '../screens/Need_help';
import { Button } from 'react-native-elements';



class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    _showMoreApp = () => {
        this.props.navigation.navigate('Bot');
    };

    _AddData = () => {
        this.props.navigation.navigate('Add');
    };

    _2T4 = () => {
        this.props.navigation.navigate('SCORE2T4');
    };
    _5T8 = () => {
        this.props.navigation.navigate('SCORE5T8');
    };
    _9T16 = () => {
        this.props.navigation.navigate('SCORE9T16');
    };
    _17P = () => {
        this.props.navigation.navigate('SCORE17P');
    };
    Check_me = () => {
        this.props.navigation.navigate('Check_me');
    };
    Let_talk = () => {
        this.props.navigation.navigate('Let_talk');
    };
    Need_help = () => {
        this.props.navigation.navigate('Need_help');
    };


    render() {
        return (
            <View>
            <Button  large
                     icon={{name: 'envira', type: 'font-awesome'}}
                     title='Chat with Bot'
                     onPress={this._showMoreApp}
            />

                <Button title="Form Add data :)" onPress={this._AddData} />
                <Button title="_2T4 :)" onPress={this._2T4} />
                <Button title="_5T8 :)" onPress={this._5T8} />
                <Button title="_9T16 :)" onPress={this._9T16} />
                <Button title="_17P :)" onPress={this._17P} />

                <Button title="Check_me :)" onPress={this.Check_me} />
                <Button title="Let_talk :)" onPress={this.Let_talk} />
                <Button title="Need_help :)" onPress={this.Need_help} />

            </View>
        );
    }
}

const AppStack = createStackNavigator({  Home: HomeScreen ,
                                          Add: Add ,
                                          Bot: App ,
                                          SCORE2T4: SCORE2T4 ,
                                          SCORE5T8: SCORE5T8,
                                          SCORE9T16: SCORE9T16,
                                          SCORE17P: SCORE17P ,
                                          Check_me: Check_me,
                                          Let_talk: Let_talk,
                                          Need_help: Need_help
                                        });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));
