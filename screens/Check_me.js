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

class Check_me extends React.Component {
    static navigationOptions = {
        title: 'Check_me',
    };

    render() {
        return (
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'ประเมินฉัน',
              trigger: '2',
            },

            {
              id: '2',
              message: 'ประเมินเสร็จละ พอ',
              end: true,
            },
          ]}
        />

        );
    }
}



const AppStack = createStackNavigator({  SCORE2T4: Check_me ,Add: Add });


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
