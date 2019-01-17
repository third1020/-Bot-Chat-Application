import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import ChatBot from 'react-native-chatbot';
import HomeScreen from '../navigation/HomeScreen';

export default class Need_help extends React.Component {
    static navigationOptions = {
        title: 'Need_help',
    };

    HomeScreen = () => {
          this.props.navigation.navigate('HomeScreen');
      };

  render(){
    return(
      <ChatBot
      handleEnd={this.HomeScreen}
      steps={[
        {
          id: '1',
          message: 'อาการชนิดไหนที่คุณต้องการเข้ารับการประเมินเบื้องต้น',
          trigger: 'HowToSleep',
        },
        {
          id: 'HowToSleep',
          message:"hello",
          trigger: 'HowToSleep3',

        },
        {
          id: 'HowToSleep3',
          options: [
            { value:'โทรแล้วครับ', label: 'โทรแล้วครับ', trigger:'HowToSleep'},
            { value:'โทรแล้วค่ะ', label: 'โทรแล้วค่ะ', trigger:'ggwp'},
          ],
        },
        {
          id: 'ggwp',
          message:"end",
          end: true,
        },
      ]}
    />


    );
  }
}
