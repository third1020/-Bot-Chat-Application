import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, AsyncStorage,Alert,Image,Dimensions,TouchableHighlight
,AppRegistry} from 'react-native';
import ChatBot from 'react-native-chatbot';


import { Button } from 'react-native-elements';
import HomeScreen from '../navigation/HomeScreen';


import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Swiper from 'react-native-swiper'
const { height,width } = Dimensions.get('window')

const styles = {
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'black'
  },
  left: {
    padding: 10,
    position: 'left',

  },
  right: {
    padding: 10,
    position: 'right',

  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 200,
    width,
    height,
    flex: 1
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'grey',
    fontSize: 15
  },
  container: {
        alignItems: 'center',
        textAlign: 'center'
    },
}

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'black' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

import PropTypes from 'prop-types';

export default class ShowActivity extends React.Component {
    static navigationOptions = {
        title: 'ShowActivity',
    };
    HomeScreen = () => {
        this.props.navigation.navigate('HomeScreen');
    };

    Activity1 = async () => {
      try {
        var activity1 = await AsyncStorage.getItem('Activity1');
        alert(activity1);

      } catch (error) {
        console.log(error);
      }
    }

    Activity2 = async () => {
      try {
        var activity2 = await AsyncStorage.getItem('Activity2');
        alert(activity2);

      } catch (error) {
        console.log(error);
      }
    }

    Activity3 = async () => {
      try {
        var activity3 = await AsyncStorage.getItem('Activity3');
        alert(activity3);

      } catch (error) {
        console.log(error);
      }
    }








    componentWillMount() {

    }

    constructor(props)
        {
          super(props);

        }



  render() {
    const { goBack } = this.props.navigation;
return (

  <Swiper
      style={styles.wrapper}
      renderPagination={renderPagination}
      loop={false}
    >


    <View style={styles.slide}>
    <Text style={[styles.container]}></Text>
    <Button title="click" onPress={this.Activity1} />
    <Button title="click" onPress={this.Activity2} />
    <Button title="click" onPress={this.Activity3} />

    </View>


    </Swiper>

    );

    }

  }
