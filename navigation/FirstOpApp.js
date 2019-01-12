
import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,Alert,Image,AsyncStorage} from 'react-native';

import PlaySound from '../AbilityBot/PlaySound';


export default class FirstOpApp extends React.Component {
  constructor(props) {
  super(props);
  this.state={
    loadingPage: 'OnBoarding'
  }

}


componentWillMount() {
  this.retrieveData();
}
retrieveData = async () => {
  try {
    var value = await AsyncStorage.getItem('@onBoardingPageLoad:key');
    if (value == "login") {
      this.setState({
        loadingPage: 'Login'
      });
    }
    else {
      this.setState({
        loadingPage: 'OnBoarding'
      });
    }
  } catch (error) {
    console.log(error);
  }
}

login = async () => {
  try {
    await AsyncStorage.setItem("@onBoardingPageLoad:key", "login");
    this.props.navigation.navigate("Login");
  } catch (error) {
    // Error saving data
  }
};

render() {
  if (this.state.loadingPage == "Login") {
    return (<PlaySound/>);
  }
  else {
    return (<Text>See you again</Text>);
  }
}

}
