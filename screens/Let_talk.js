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

class Let_talk extends React.Component {
    static navigationOptions = {
        title: 'Let_talk',
    };

    render() {
        return (
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'พูดคุยกับฉัน',
              trigger: '2',
            },

            {
              id: '2',
              message: 'สวัสดี',
              end: true,
            },
          ]}
        />

        );
    }
}



const AppStack = createStackNavigator({  Let_talk: Let_talk ,Add: Add });


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
