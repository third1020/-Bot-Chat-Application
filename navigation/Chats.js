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

import SelfHarm_Danger from '../screens/SelfHarm_Danger';
import SelfHarm_NoNeed from '../screens/SelfHarm_NoNeed';
import SelfHarm_Normal from '../screens/SelfHarm_Normal';


import Check_me from '../screens/Check_me';
import Let_talk from '../screens/Let_talk';
import Need_help from '../screens/Need_help';
import SelectImage from '../AbilityBot/SelectImage';
import { Header } from 'react-native-elements'
import PropTypes from 'prop-types';


const chartIcon = require('../assets/images/pages/chart.png');
const calendarIcon = require('../assets/images/pages/calendar.png');
const chatIcon = require('../assets/images/pages/chat.png');
const galleryIcon = require('../assets/images/pages/gallery.png');
const profileIcon = require('../assets/images/pages/profile.png');

const { height,width } = Dimensions.get('window')





export default class Chats extends React.Component {
  static navigationOptions = {
      title: 'Chats',

  };

  App = () => {
      this.props.navigation.navigate('App');
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

  GoApp = async () => {
    try {
      await AsyncStorage.setItem("@onBoardingPageLoad:key", "Another");
      this.props.navigation.navigate("App");


    } catch (error) {
      // Error saving data
    }
  };


    render(){

        return (
          <View style={styles.container}>
          <Image style={styles.stretch1}
          source={require('../assets/garoo/0001.png')}/>
      <View style={styles.row}>

        <TouchableOpacity onPress={this.App} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>พูดคุยกับฉัน</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.Check_me} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>ประเมินฉัน</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.Need_help} style={styles.item}>
          <Image resizeMode="contain" source={chatIcon} style={styles.itemImage} />
          <Text style={styles.itemText}>ต้องให้ช่วยเหลือ</Text>
        </TouchableOpacity>
        </View>



    </View>
          // <View>
          //           <Button title="Check_me" onPress={this.Check_me}/>
          //           <Button title="Let_talk" onPress={this.Let_talk}/>
          //           <Button title="Need_help" onPress={this.Need_help}/>
          //           <Button title="First App Page" onPress={this.login}/>
          //         </View>
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

Chats.propTypes = {
  steps: PropTypes.object,
};

Chats.defaultProps = {
  steps: undefined,
};


// const HomeIconWithBadge = props => {
//   // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
//   return <IconWithBadge {...props} badgeCount={3} />;
// };
//
// const getTabBarIcon = (navigation, focused, tintColor) => {
//   const { routeName } = navigation.state;
//   let IconComponent = Ionicons;
//   let iconName;
//   if (routeName === 'Home') {
//     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//     // We want to add badges to home tab icon
//     IconComponent = HomeIconWithBadge;
//   } else if (routeName === 'SCORE2T4') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE5T8') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE9T16') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'SCORE17P') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Check_me') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Let_talk') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'Need_help') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   } else if (routeName === 'App') {
//     iconName = `ios-options${focused ? '' : '-outline'}`;
//   }
//
//   // You can return any component that you like here!
//   return <IconComponent name={iconName} size={25} color={tintColor} />;
// };
//
// export default createAppContainer(
//   createBottomTabNavigator(
//     {
//       Home: { screen: HomeScreen },
//       SCORE2T4: { screen: SCORE2T4 },
//       SCORE5T8: { screen: SCORE5T8 },
//       SCORE9T16: { screen: SCORE9T16 },
//       SCORE17P: { screen: SCORE17P },
//       Check_me: { screen: Check_me },
//       Let_talk: { screen: Let_talk },
//       Need_help: { screen: Need_help },
//       App: { screen: App },
//
//     },
//     {
//       defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) =>
//           getTabBarIcon(navigation, focused, tintColor),
//       }),
//       tabBarOptions: {
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       },
//     }
//   )
// );
