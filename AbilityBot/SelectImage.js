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

export default class SelectImage extends React.Component {
    static navigationOptions = {
        title: 'SelectImage',
    };
    HomeScreen = () => {
        this.props.navigation.navigate('HomeScreen');
    };

    constructor(props)
        {
          super(props);
          this.state = { count: 0,
                         date : '',
                         dateend : '',
                         activity:[] }
        }

    async saveActivity(value) {
        try {

           if(this.state.count == 0){
           await AsyncStorage.setItem('Activity1', value);
           await AsyncStorage.setItem('StartTime1', this.state.date);
           await AsyncStorage.setItem('EndTime1', this.state.dateend);

           if(!this.state.activity.includes(value)){
           this.setState(prevState => ({
            activity: [...prevState.activity, value],
            count: this.state.count+1
          }))}}

          if(this.state.count == 1){
          await AsyncStorage.setItem('Activity2', value);
          await AsyncStorage.setItem('StartTime2', this.state.date);
          await AsyncStorage.setItem('EndTime2', this.state.dateend);
          if(!this.state.activity.includes(value)){
          this.setState(prevState => ({
           activity: [...prevState.activity, value],
           count: this.state.count+1
         }))}}

         if(this.state.count == 2){
         await AsyncStorage.setItem('Activity3', value);
         await AsyncStorage.setItem('StartTime3', this.state.date);
         await AsyncStorage.setItem('EndTime3', this.state.dateend);
         if(!this.state.activity.includes(value)){
         this.setState(prevState => ({
          activity: [...prevState.activity, value],
          count: this.state.count+1
        }))}}

        } catch (error) {
          console.log("Error saving data" + error);
        }
      }
      componentWillMount() {

        var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds

      that.setState({
        date:  date + '/' + month + '/' + year,
        dateend: date+7 + '/' + month + '/' + year,
          // date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      });

    }




  render() {
    const { goBack } = this.props.navigation;
    if(this.state.count > 3){
      Alert.alert("คุณเลือกกิจกรรมครบ 3 อย่างแล้ว");
    }
    if(this.state.count == 0){
      Alert.alert("คุณอยากทำอะไรเป็นอย่างแรก");
    }
    if(this.state.count == 1){
      Alert.alert("กิจกรรมที่คุณเลือกอย่างที่ 1 คือ "+this.state.activity[0]);

    //   async () => {
    //       try {
    //         // let activity1 = this.state.activity[0];
    //   await AsyncStorage.setItem("Activity1", "55555");
    //   }   catch (error) {
    //     // Error saving data
    //   }
    // }
    }
    if(this.state.count == 2){
      Alert.alert("กิจกรรมที่คุณเลือกอย่างที่ 2 คือ"+this.state.activity[1]);
    //   async () => {
    //       try {
    //     await AsyncStorage.setItem('Activity2', this.state.activity[1]);
    //   }   catch (error) {
    //     // Error saving data
    //   }
    // }
    }
    if(this.state.count == 3){
      Alert.alert("โอเคคุณเลือกกิจกรรม 3 คือ"+this.state.activity[2] +"หวังว่าคุณคงชอบทำกิจกรรมเหล่านี้นะ");
    //   async () => {
    //       try {
    //     await AsyncStorage.setItem('Activity3', this.state.activity[2]);
    //   }   catch (error) {
    //     // Error saving data
    //   }
    // }
    this.props.navigation.goBack();
    }
return (
  <Swiper
      style={styles.wrapper}
      renderPagination={renderPagination}
      loop={false}
    >

    <View style={styles.slide} >
    <Text style={[styles.container]}>เขียนไดอารี่</Text>
    <Text style={{color: 'grey',alignItems: 'flex-end', paddingTop:20}}>กดที่รูปเพิ่อเลือกกิจกรรม</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เขียนไดอารี่")}>
    <Image style={styles.button} source={{uri: 'https://sv1.picz.in.th/images/2019/01/12/9HxdNZ.jpg'}} />
  </TouchableHighlight>
          <View style={{alignItems: 'flex-end', paddingTop:20}}>
          <Text>ต่อไป</Text>
          <Image source={require('../assets/right-arrow.png') } />
            </View>
    </View>


    <View style={styles.slide}  >
    <Text style={[styles.container]}>เล่นบอร์ดเกมกับเพื่อน</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เล่นบอร์ดเกมกับเพื่อน")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HRMpu.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ไปกินข้าวกับเพื่อน</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ไปกินข้าวกับเพื่อน")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx7rP.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ออกกำลังกาย</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ออกกำลังกาย")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx0QI.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เดินเล่น</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เดินเล่น")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxY0t.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>กอดคนที่รักเรา</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("กอดคนที่รักเรา")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxzZe.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>กอดคนที่เรารัก</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("กอดคนที่เรารัก")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx4sl.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ถักไหมพรม</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ถักไหมพรม")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxNyk.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เรียนรู้สิ่งใหม่ๆ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เรียนรู้สิ่งใหม่ๆ")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxhjE.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ฟังเพลง</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ฟังเพลง")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hxf9v.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>นั่งสมาธิ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("นั่งสมาธิ")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxkvN.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ดูnetflix</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ดูnetflix")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx9NV.png'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ย้อนไปดูอัลบั้มตัวเองตอนเด็ก</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ย้อนไปดูอัลบั้มตัวเองตอนเด็ก")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxTUQ.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เล่นเกม</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เล่นเกม")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hxt8S.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เล่นกีฬากับเพื่อน</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เล่นกีฬากับเพื่อน")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx10n.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เล่นกับสัตว์เลี้ยง</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เล่นกับสัตว์เลี้ยง")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxKcg.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>อ่านหนังสือ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("อ่านหนังสือ")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxZ2W.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ร้องเพลงกับเพื่อน</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ร้องเพลงกับเพื่อน")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxiT1.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>งีบหลับ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("งีบหลับ")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxRjy.jpg'} } />
  </TouchableHighlight>
    </View>


    <View style={styles.slide}  >
    <Text style={[styles.container]}>พูดคุยกับเพื่อน</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("พูดคุยกับเพื่อน")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxxvD.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ไปช่วยงานอาสา</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ไปช่วยงานอาสา")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxqUJ.jpg'} } />
  </TouchableHighlight>
    </View>


    <View style={styles.slide}  >
    <Text style={[styles.container]}>พาสัตว์เลี้ยงไปเดินเล่น</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("พาสัตว์เลี้ยงไปเดินเล่น")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxUB9.jpg'} } />
  </TouchableHighlight>
    </View>


    <View style={styles.slide}  >
    <Text style={[styles.container]}>ดูหนัง</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ดูหนัง")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hx58b.jpg'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>อ่านหนังสือ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("อ่านหนังสือ")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9HxZ2W.jpg'} } />
  </TouchableHighlight>
    </View>


    <View style={styles.slide}  >
    <Text style={[styles.container]}>นั่งสมาธิในที่สงบๆ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("นั่งสมาธิในที่สงบๆ")}>
    <Image style={styles.button} source={{uri:'https://uppic.cc/d/KRJB'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>ฝึกพลังจิตตรานุภาพ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ฝึกพลังจิตตรานุภาพ")}>
    <Image style={styles.button} source={{uri:'https://uppic.cc/d/KRJ8'} } />
  </TouchableHighlight>
    </View>

    <View style={styles.slide}  >
    <Text style={[styles.container]}>เล่นโยคะ</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("เล่นโยคะ")}>
    <Image style={styles.button} source={{uri:'https://uppic.cc/d/KRJ7'} } />
  </TouchableHighlight>
    </View>





    <View style={styles.slide} >
    <Text style={[styles.container]}>ช้อปปิ้ง</Text>
    <TouchableHighlight onPress={(value) => this.saveActivity("ช้อปปิ้ง")}>
    <Image style={styles.button} source={{uri:'https://sv1.picz.in.th/images/2019/01/12/9Hxcy2.jpg'} } />
  </TouchableHighlight>
    <View style={{alignItems: 'flex-start', paddingTop:20}}>
    <Text>เลื่อนย้อนกลับ</Text>
    <Image source={require('../assets/left-arrow.png') } />
    </View>
    </View>





    </Swiper>

    );

    }

  }
