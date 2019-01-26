import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Platform,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    Button,
    Linking
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';

import { Entypo as Icon } from '@expo/vector-icons';
import { Colors, Fonts } from '../constants';


import Add from './Add';
import App from './App';
import Q9 from './Q9';
import Chats from './Chats';

import SelfHarm_Danger from '../screens/SelfHarm_Danger';
import SelfHarm_NoNeed from '../screens/SelfHarm_NoNeed';
import SelfHarm_Normal from '../screens/SelfHarm_Normal';


import Check_me from '../screens/Check_me';
import Let_talk from '../screens/Let_talk';
import Need_help from '../screens/Need_help';
import SelectImage from '../AbilityBot/SelectImage';
import ShowActivity from '../AbilityBot/ShowActivity';
import { Header } from 'react-native-elements'


const chartIcon = require('../assets/images/pages/chart.png');
const calendarIcon = require('../assets/images/pages/calendar.png');
const chatIcon = require('../assets/images/pages/chat.png');
const galleryIcon = require('../assets/images/pages/gallery.png');
const profileIcon = require('../assets/images/pages/profile.png');

const { height,width } = Dimensions.get('window')


export default class FirstOpApp extends React.Component {
  static navigationOptions = {
      title: 'FirstOpApp',

  };
  ShowActivity  = () => {
   this.props.navigation.navigate('ShowActivity');
  };

   Chats = () => {
    this.props.navigation.navigate('Chats');
   };
    App = () => {
      this.props.navigation.navigate('App');
    };
    Q9 = () => {
      this.props.navigation.navigate('Q9');
    };

    _AddData = () => {
        this.props.navigation.navigate('Add');
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
    SelectImage = () => {
        this.props.navigation.navigate('SelectImage');
    };

    Website = ()=>{ Linking.openURL('http://www.hospital.tu.ac.th/');
    };

    constructor(props) {
    super(props);
    this.state={
      loadingPage: 'OnBoarding'
    }

  }



    render(){


        return(
          <View style={styles.container}>
          <Image style={styles.stretch1}
          source={require('../assets/garoo/4.png')}/>
      <View style={styles.row}>

        <TouchableOpacity onPress={this.Website} style={styles.item}>
          <Image resizeMode="contain" source={profileIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={this.Chats} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.ShowActivity} style={styles.item}>
          <Image resizeMode="contain" source={calendarIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>Calendar</Text>
        </TouchableOpacity>

      </View>
    </View>

              );
       }
    }

const styles = StyleSheet.create({
  stretch: {
    backgroundColor: '#DDDDDD',
    padding: 200,
    width,
    height,
    flex: 1
  },
  stretch1: {
    backgroundColor: '#DDDDDD',
    padding: 100,
    width,
    height,
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});
