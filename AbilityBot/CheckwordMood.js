import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, AsyncStorage,Alert} from 'react-native';
import ChatBot from 'react-native-chatbot';

import SelfHarm_Normal from '../screens/SelfHarm_Normal';
import SelfHarm_NoNeed from '../screens/SelfHarm_NoNeed';
import SelfHarm_Danger from '../screens/SelfHarm_Danger';

import App from '../navigation/App';

import { Button } from 'react-native-elements';


import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import PropTypes from 'prop-types';

export default class CheckwordMood extends React.Component {
    static navigationOptions = {
        title: 'CheckwordMood',
    };

    // SelfHarm_Normal = () => {
    //     this.props.navigation.navigate('SelfHarm_Normal');
    // };
    // SelfHarm_NoNeed = () => {
    //     this.props.navigation.navigate('SelfHarm_NoNeed');
    // };
    // SelfHarm_Danger = () => {
    //     this.props.navigation.navigate('SelfHarm_Danger');
    // };


    constructor(props) {
    super(props);

    this.state = {
      askName: '',
      shareMood: '',

    };
  }

  componentWillMount() {
    const { steps } = this.props;


    const { askName,shareMood} = steps;


    this.setState({ askName,shareMood});


                      word = shareMood.value;
                      name = askName.value;
                      // test = word.includes("Hello");


                    if(word.includes("ช่วยด้วย")|| word.includes("SOS") || word.includes("Help") || word.includes("ทั้งหมดเป็นความผิดของฉัน")
                    || word.includes("ผิดเอง")|| word.includes("ไม่อยากอยู่อีกต่อไป") || word.includes("อยากตาย")
                    || word.includes("จะฆ่าตัวตาย") || word.includes("ไม่ไหวแล้ว") || word.includes("อยากเจ็บปวด")
                    || word.includes("อยากทำร้ายตัวเอง")  == true){
                      ggwp ="ต้องการให้ช่วยไหม"
                    } else {
                      ggwp = "สบายดีหนิ"
                    }



                    // if (score == 0) {word = " จากการประเมินเบื้องต้นเราพบว่าคุณไม่มีความเสี่ยงในการทำร้ายตนเองและการฆ่าตัวตาย"
                    //
                    //                } //score =0
                    //
                    // else { word= "Error" }

  }

  render() {
    const { askName,shareMood} = this.state;

  if(ggwp ==="ต้องการให้ช่วยไหม"){  return (

            <Text>ฉันตรวจสอบคำที่คุณต้องการความช่วยเหลือ หรือจะเป็นอันตรายต่อคุณ คุณต้องการเข้ารับการประเมินเบื้องต้นหรือไม่ ใช้เวลาแค่ 2 นาที และจะเป็นประโยชน์ต่อตัว{name}มากๆเลยนะ 🙂</Text>

    );}else if (ggwp ==="สบายดีหนิ") {
      return (

                <Text>แสดงว่าตอนนี้คุณ{name}ก็สบายดี  แล้วตอนนี้คุณ{name}ต้องการที่จะลองทำแบบประเมินเพื่อเช็คว่าตัวเองเสี่ยงเป็นโรคซึมเศร้าหรือเปล่า?</Text>

        );}

    }

  }



CheckwordMood.propTypes = {
  steps: PropTypes.object,
};

CheckwordMood.defaultProps = {
  steps: undefined,
};
