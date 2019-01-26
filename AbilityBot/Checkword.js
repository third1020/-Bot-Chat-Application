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

export default class Checkword extends React.Component {
    static navigationOptions = {
        title: 'Checkword',
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
      userAnswer: '',

    };
  }

  componentWillMount() {
    const { steps } = this.props;


    const { askName,userAnswer} = steps;


    this.setState({ askName,userAnswer});


                      word = userAnswer.value;
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
    const { askName,userAnswer} = this.state;
    const { goBack } = this.props.navigation;

  if(ggwp ==="ต้องการให้ช่วยไหม"){ return (

            <Text>ฉันตรวจสอบคำที่คุณต้องการความช่วยเหลือ หรือจะเป็นอันตรายต่อคุณ คุณต้องการเข้ารับการประเมินเบื้องต้นหรือไม่ ใช้เวลาแค่ 2 นาที และจะเป็นประโยชน์ต่อตัว{name}มากๆเลยนะ 🙂</Text>

    );}else if (ggwp ==="สบายดีหนิ") {
      return (

                <Text>ฉันตรวจไม่พบคำที่เป็นอันตรายต่อคุณ{name} เลย  หากไม่ต้องการทำแบบประเมินก็ให้กดปุ่มไม่ต้องการนะ ^3^</Text>

        );}

    }

  }



Checkword.propTypes = {
  steps: PropTypes.object,
};

Checkword.defaultProps = {
  steps: undefined,
};
