import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, AsyncStorage,Alert,Image,Dimensions,TouchableHighlight
,AppRegistry,TouchableOpacity,Platform} from 'react-native';
import ChatBot from 'react-native-chatbot';
import { Colors, Fonts } from '../constants';


import { Button } from 'react-native-elements';
import HomeScreen from '../navigation/HomeScreen';


import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Swiper from 'react-native-swiper'
const { height,width } = Dimensions.get('window')

import PropTypes from 'prop-types';

export default class ShowActivity extends React.Component {
    static navigationOptions = {
        title: 'ShowActivity',
    };

    constructor(props)
    {
    super(props);
    this.state = {
        date: '',
      ActivityData: [{name :"เขียนไดอารี่",image: "https://sv1.picz.in.th/images/2019/01/12/9HxdNZ.jpg"},
                     {name :"เล่นบอร์ดเกมกับเพื่อน",image: "https://sv1.picz.in.th/images/2019/01/12/9HRMpu.jpg"},
                     {name :"ไปกินข้าวกับเพื่อน",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx7rP.jpg"},
                     {name :"ออกกำลังกาย",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx0QI.jpg"},
                     {name :"เดินเล่น",image: "https://sv1.picz.in.th/images/2019/01/12/9HxY0t.jpg"},
                     {name :"กอดคนที่รักเรา",image: "https://sv1.picz.in.th/images/2019/01/12/9HxzZe.jpg"},
                     {name :"กอดคนที่เรารัก",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx4sl.jpg"},
                     {name :"ถักไหมพรม",image: "https://sv1.picz.in.th/images/2019/01/12/9HxNyk.jpg"},
                     {name :"เรียนรู้สิ่งใหม่ๆ",image: "https://sv1.picz.in.th/images/2019/01/12/9HxhjE.jpg"},
                     {name :"ฟังเพลง",image: "https://sv1.picz.in.th/images/2019/01/12/9Hxf9v.jpg"},
                     {name :"นั่งสมาธิ",image: "https://sv1.picz.in.th/images/2019/01/12/9HxkvN.jpg"},
                     {name :"ดูnetflix",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx9NV.png"},
                     {name :"ย้อนไปดูอัลบั้มตัวเองตอนเด็ก",image: "https://sv1.picz.in.th/images/2019/01/12/9HxTUQ.jpg"},
                     {name :"เล่นเกม",image: "https://sv1.picz.in.th/images/2019/01/12/9Hxt8S.jpg"},
                     {name :"เล่นกีฬากับเพื่อน",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx10n.jpg"},
                     {name :"เล่นกับสัตว์เลี้ยง",image: "https://sv1.picz.in.th/images/2019/01/12/9HxKcg.jpg"},
                     {name :"อ่านหนังสือ",image: "https://sv1.picz.in.th/images/2019/01/12/9HxZ2W.jpg"},
                     {name :"ร้องเพลงกับเพื่อน",image: "https://sv1.picz.in.th/images/2019/01/12/9HxiT1.jpg"},
                     {name :"งีบหลับ",image: "https://sv1.picz.in.th/images/2019/01/12/9HxRjy.jpg"},
                     {name :"พูดคุยกับเพื่อน",image: "https://sv1.picz.in.th/images/2019/01/12/9HxxvD.jpg"},
                     {name :"ไปช่วยงานอาสา",image: "https://sv1.picz.in.th/images/2019/01/12/9HxqUJ.jpg"},
                     {name :"พาสัตว์เลี้ยงไปเดินเล่น",image: "https://sv1.picz.in.th/images/2019/01/12/9HxUB9.jpg"},
                     {name :"ดูหนัง",image: "https://sv1.picz.in.th/images/2019/01/12/9Hx58b.jpg"},
                     {name :"อ่านหนังสือ",image: "https://sv1.picz.in.th/images/2019/01/12/9HxZ2W.jpg"},
                     {name :"นั่งสมาธิในที่สงบๆ",image: "https://uppic.cc/d/KRJB"},
                     {name :"ฝึกพลังจิตตรานุภาพ",image: "https://uppic.cc/d/KRJ8"},
                     {name :"เล่นโยคะ",image: "https://uppic.cc/d/KRJ7"},
                     {name :"ช้อปปิ้ง",image: "https://sv1.picz.in.th/images/2019/01/12/9Hxcy2.jpg"}]
    };


  }


    Activity1 = async () => {
      try {
        var activity1 = await AsyncStorage.getItem('Activity1');
        var starttime1 = await AsyncStorage.getItem('StartTime1');
        var endtime1 = await AsyncStorage.getItem('EndTime1');
        for (var i = 0; i < this.state.ActivityData.length; i++) {
          if(activity1 == this.state.ActivityData[i].name){
            this.setState({
              nameActivity1: this.state.ActivityData[i].name,
              imageActivity1: this.state.ActivityData[i].image,
              starttime1: starttime1,
              endtime1: endtime1

            });
          }
        }

        // alert(this.state.activitytime1);

      } catch (error) {
        console.log(error);
      }
    }

    Activity2 = async () => {
      try {
        var activity2 = await AsyncStorage.getItem('Activity2');
        var starttime2 = await AsyncStorage.getItem('StartTime2');
        var endtime2 = await AsyncStorage.getItem('EndTime2');
        for (var i = 0; i < this.state.ActivityData.length; i++) {
          if(activity2 == this.state.ActivityData[i].name){
            this.setState({
              nameActivity2: this.state.ActivityData[i].name,
              imageActivity2: this.state.ActivityData[i].image,
              starttime2: starttime2,
              endtime2: endtime2
            });
          }
        }


        // alert(this.state.nameActivity2);


      } catch (error) {
        console.log(error);
      }
    }

    Activity3 = async () => {
      try {
        var activity3 = await AsyncStorage.getItem('Activity3');
        var starttime3 = await AsyncStorage.getItem('StartTime3');
        var endtime3 = await AsyncStorage.getItem('EndTime3');
        for (var i = 0; i < this.state.ActivityData.length; i++) {
          if(activity3 == this.state.ActivityData[i].name){
            this.setState({
              nameActivity3: this.state.ActivityData[i].name,
              imageActivity3: this.state.ActivityData[i].image,
              starttime3: starttime3,
              endtime3: endtime3
            });
          }
        }

        // alert(this.state.nameActivity3);


      } catch (error) {
        console.log(error);
      }
    }
    componentWillMount() {

      this.Activity1();
      this.Activity2();
      this.Activity3();
      var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });

  }

  render() {
    const { goBack } = this.props.navigation;
    return (
            <View>

            <TouchableOpacity style={styles.itemTwoContainer} onPress={this.Activity1}>
              <View style={styles.itemTwoContent}>
                <Image
                  style={styles.itemTwoImage}
                  source={{ uri:this.state.imageActivity1 }}
                />
                <View style={styles.itemTwoOverlay} />
                <Text style={styles.itemTwoTitle}>{this.state.nameActivity1}</Text>
                <Text style={styles.itemTwoSubTitle}>เริ่มต้น :{this.state.starttime1}</Text>
                <Text style={styles.itemTwoSubTitle}>ต้องทำภายใน :{this.state.endtime1}</Text>

              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemTwoContainer} onPress={this.Activity2}>
              <View style={styles.itemTwoContent}>
                <Image
                  style={styles.itemTwoImage}
                  source={{ uri:this.state.imageActivity2 }}
                />
                <View style={styles.itemTwoOverlay} />
                <Text style={styles.itemTwoTitle}>{this.state.nameActivity2}</Text>
                <Text style={styles.itemTwoSubTitle}>เริ่มต้น :{this.state.starttime2}</Text>
                <Text style={styles.itemTwoSubTitle}>ต้องทำภายใน :{this.state.endtime2}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemTwoContainer} onPress={this.Activity3}>
              <View style={styles.itemTwoContent}>
                <Image
                  style={styles.itemTwoImage}
                  source={{ uri:this.state.imageActivity3 }}
                />
                <View style={styles.itemTwoOverlay} />
                <Text style={styles.itemTwoTitle}>{this.state.nameActivity3}</Text>
                <Text style={styles.itemTwoSubTitle}>เริ่มต้น :{this.state.starttime3}</Text>
                <Text style={styles.itemTwoSubTitle}>ต้องทำภายใน :{this.state.endtime3}</Text>
              </View>
            </TouchableOpacity>

            </View>
          );

    }

  }
  //
  // import React from 'react';
  // import {
  //   StyleSheet,
  //   View,
  //   Platform,
  //   Text,
  //   FlatList,
  //   TouchableOpacity,
  //   ImageBackground,
  //   Image,
  //   Dimensions,
  //   Button,
  // } from 'react-native';
  // import { Colors, Fonts } from '../constants';



  const styles = StyleSheet.create({

    itemTwoContainer: {
      paddingBottom: 10,
      backgroundColor: 'white',
      marginVertical: 5,
    },
    itemTwoContent: {
      padding: 20,
      position: 'relative',
      marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
      height: 150,
    },
    itemTwoTitle: {
      color: Colors.white,

      fontSize: 20,
    },
    itemTwoSubTitle: {
      color: Colors.white,

      fontSize: 15,
      marginVertical: 5,
    },
    itemTwoPrice: {
      color: Colors.white,

      fontSize: 20,
    },
    itemTwoImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    itemTwoOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#6271da',
      opacity: 0.5,
    },

  });
