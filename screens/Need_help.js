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
import Add from '../navigation/Add';
import ChatBot from 'react-native-chatbot';

class Need_help extends React.Component {
    static navigationOptions = {
        title: 'Need_help',
    };

    render() {
        return (
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'ต้องกำรควำมช่วยเหลือ',
              trigger: '2',
            },

            {
              id: '2',
              message: 'ช่วยตัวเองสิครับ',
              end: true,
            },
          ]}
        />

        );
    }
}



const AppStack = createStackNavigator({  Need_help: Need_help ,Add: Add });


export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
    },
));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
