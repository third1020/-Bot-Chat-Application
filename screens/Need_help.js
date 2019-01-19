import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TextInput
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import ChatBot from 'react-native-chatbot';
import HomeScreen from '../navigation/HomeScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Need_help extends React.Component {
    static navigationOptions = {
        title: 'Need_help',
    };

    HomeScreen = () => {
          this.props.navigation.navigate('HomeScreen');
      };

  render(){
    return(
      <KeyboardAwareScrollView>
    <View>
    <TextInput
        style={{height: 40,align: 'justify', borderColor: 'gray', borderWidth: 1,}}
        onChangeText={(text) => this.setState({text})}

      />
    </View>
  </KeyboardAwareScrollView>


    );
  }
}
