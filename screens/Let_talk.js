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
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Add from '../navigation/Add';
import ChatBot from 'react-native-chatbot';

import PlaySound from '../AbilityBot/PlaySound';

import Checkword from '../AbilityBot/Checkword';
import CheckwordMood from '../AbilityBot/CheckwordMood';
import CheckFeel from '../AbilityBot/CheckFeel';
import CheckSick from '../AbilityBot/CheckSick';
import HomeScreen from '../navigation/HomeScreen';
import FirstOpApp from '../navigation/FirstOpApp';
import Q9 from '../navigation/Q9';
import SelfHarm_Normal from './SelfHarm_Normal';
import SelfHarm_NoNeed from './SelfHarm_NoNeed';
import SelfHarm_Danger from './SelfHarm_Danger';

import PropTypes from 'prop-types';

class ShowResult extends React.Component {
    static navigationOptions = {
        title: 'ShowResult',
    };



    constructor(props) {
    super(props);





    this.state = {
      askName: '',

      selfHarmQuestionChoice: '',
      selfHarmQuestionChoice2: '',
      selfHarmQuestionChoice3: '',
      selfHarmQuestionChoice3_1: '',
      selfHarmQuestionChoice4: '',
      selfHarmQuestionChoice5: '',
      selfHarmQuestionChoice6: '',
      selfHarmQuestionChoice7: '',
      selfHarmQuestionChoice8: '',


    };
  }

  componentWillMount() {
    const { steps } = this.props;


    const { askName,selfHarmQuestionChoice,selfHarmQuestionChoice2,
            selfHarmQuestionChoice3,selfHarmQuestionChoice3_1,
            selfHarmQuestionChoice4,selfHarmQuestionChoice5,selfHarmQuestionChoice6,
            selfHarmQuestionChoice7,selfHarmQuestionChoice8} = steps;

    this.setState({ askName,selfHarmQuestionChoice,selfHarmQuestionChoice2,
            selfHarmQuestionChoice3,selfHarmQuestionChoice3_1,
            selfHarmQuestionChoice4,selfHarmQuestionChoice5,selfHarmQuestionChoice6,
            selfHarmQuestionChoice7,selfHarmQuestionChoice8});


                      score = selfHarmQuestionChoice.value+selfHarmQuestionChoice2.value+selfHarmQuestionChoice3.value
                              +selfHarmQuestionChoice4.value+selfHarmQuestionChoice5.value+selfHarmQuestionChoice3_1.value
                              +selfHarmQuestionChoice6.value+selfHarmQuestionChoice7.value+selfHarmQuestionChoice8.value;



                    if (score == 0) {word = " จากการประเมินเบื้องต้นเราพบว่าคุณไม่มีความเสี่ยงในการทำร้ายตนเองและการฆ่าตัวตาย"

                                     // ,help="ขอบคุณนะ Mindbot",
                                     // nohelp="แล้วเจอกันอีกนะ Mindbot",
                                     // patch="{() => this.props.navigation.navigate('SCORE5T8')}"


                                   } //score =0
                    else if (score > 0 && score < 2 ) {word =" จากการประเมินเบื้องต้นเราพบว่าคุณมีความเสี่ยงในการทำร้ายตัวเองในระดับปานกลาง และความเสี่ยงในการฆ่าตัวตายในระดับน้อย"
                                                       // ,help="ขอบคุณนะ Mindbot",
                                                       // nohelp="แล้วเจอกันอีกนะ Mindbot"
                                                     }//score =1-2

                    else if (score >= 2 && score < 5 ) {word =" จากการประเมินเบื้องต้นเราพบว่าคุณมีความเสี่ยงในการทำร้ายตัวเองในระดับสูง และความเสี่ยงในการฆ่าตัวตายในระดับน้อย"
                                                       // ,help="ฉันต้องกำรควำมช่วยเหลือ",
                                                       // nohelp="ฉันยังไม่ต้องกำรควำมช่วยเหลือ"
                                                     }//score =3-4

                    else if (score >= 5 && score < 9) {word =" จากการประเมินเบื้องต้นเราพบว่าึถณมีความเสี่ยงในการทำร้ายตัวเองในระดับรุนแรง และความเสี่ยงในการฆ่าตัวตายในระดับน้อย"
                                                       // ,help="ฉันต้องกำรควำมช่วยเหลือ",
                                                       // nohelp="ฉันยังไม่ต้องกำรควำมช่วยเหลือ"
                                                     }//score =5-9

                    else if (score >= 9 && score < 17) {word =" จากการประเมินเบื้องต้นเราพบว่าคุณมีความเสี่ยงในการทำร้ายตัวเองในระดับรุนแรง และความเสี่ยงในการฆ่าตัวตายในระดับปานกลาง"
                                                       // ,help="ฉันต้องกำรควำมช่วยเหลืออย่างเร่งด่วน",
                                                       // nohelp="ฉันต้องกำรควำมช่วยเหลือ"
                                                     }//score =10-16

                    else if (score >= 17) { word =" จากการประเมินเบื้องต้นเราพบว่าคุณมีความเสี่ยงในการทำร้ายตัวเองในระดับรุนแรง และมีความเสี่ยงในการฆ่าตัวตายในระดับสูง"
                                                       // ,help="ฉันต้องกำรควำมช่วยเหลืออย่างเร่งด่วน",
                                                       // nohelp="ฉันต้องกำรควำมช่วยเหลือ"
                                                     }//score > 16
                    else { word= "Error" }

  }

  render() {
    const { askName,selfHarmQuestionChoice,selfHarmQuestionChoice2,
            selfHarmQuestionChoice3,selfHarmQuestionChoice3_1,
            selfHarmQuestionChoice4,selfHarmQuestionChoice5,selfHarmQuestionChoice6,
            selfHarmQuestionChoice7,selfHarmQuestionChoice8} = this.state;


    return (

            <Text> คะแนนที่คุณได้คือ {score}{word}</Text>
    );
  }
}


ShowResult.propTypes = {
  steps: PropTypes.object,
};

ShowResult.defaultProps = {
  steps: undefined,
};



class Let_talk extends React.Component {
    static navigationOptions = {
        title: 'SelfHarm',
    };

    HomeScreen = () => {
      this.props.navigation.navigate('HomeScreen');
  };
  FirstOpApp = () => {
    this.props.navigation.navigate('FirstOpApp');
};

  SelfHarm_Normal = () => {
      this.props.navigation.navigate('SelfHarm_Normal');
  };
  SelfHarm_NoNeed = () => {
      this.props.navigation.navigate('SelfHarm_NoNeed');
  };
  SelfHarm_Danger = () => {
      this.props.navigation.navigate('SelfHarm_Danger');
  };
  Q9 = () => {
      this.props.navigation.navigate('Q9');
  };

    render() {
        return (
          <ChatBot
          handleEnd={this.FirstOpApp}
          steps={[
            {
              id: 'start',
              message: 'ฉันตรวจสอบคำที่คุณต้องการความช่วยเหลือ หรือจะเป็นอันตรายต่อคุณ คุณต้องเข้ารับการประเมินเบื้องต้น ใช้เวลาแค่ 2 นาที และจะเป็นประโยชน์ต่อตัวคุณมากๆเลยนะ 🙂',
              trigger: 'selfHarmQuestion1',
            },

              {
                id: 'selfHarmQuestion1',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้คิดว่าอยากตายหรือคิดว่าตายไปจะดีกว่าบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice',
              },
              {
                id: 'selfHarmQuestion2',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้คิดว่าอยากทำร้ายตัวเองหรือทำให้ตัวเองบาดเจ็บบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice2',
              },
              {
                id: 'selfHarmQuestion3',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้คิดเกี่ยวกับการฆ่าตัวตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice3',
              },
              {
                id: 'selfHarmQuestion3_1',
                message: 'คุณสามารถควมคุมความอยากฆ่าตัวตายที่คุณคิดอยู่ได้หรือไม่?',
                trigger: 'selfHarmQuestionChoice3_1',
              },

              {
                id: 'selfHarmQuestion4',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้มีแผนการที่จะฆ่าตัวตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice4',
              },
              {
                id: 'selfHarmQuestion5',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้เตรียมการที่จะทำร้ายตัวเอง หรือเตรียมการฆ่าตัวตายโดยตั้งใจว่าจะให้ตัวเองตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice5',
              },
              {
                id: 'selfHarmQuestion6',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้ทำให้ตัวเองบาดเจ็บแต่ไม่ได้ตั้งใจให้ตัวเองตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice6',
              },
              {
                id: 'selfHarmQuestion7',
                message: 'ในเดือนที่ผ่านมาจนถึงวันนี้ คุณได้พยายามฆ่าตัวตาย โดยคาดหวังหรือตั้งใจจะให้ตัวเองตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice7',
              },
              {
                id: 'selfHarmQuestion8',
                message: 'ในตลอดชีวิตที่ผ่านมา คุณเคยพยายามฆ่าตัวตายบ้างหรือไม่?',
                trigger: 'selfHarmQuestionChoice8',
              },
              {
              id: 'selfHarmQuestionChoice',
                options: [
                  { value:1, label: 'ใช่', trigger: 'selfHarmQuestion2' },
                  { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion2' },
                ],
              },
              {
                id: 'selfHarmQuestionChoice2',
                  options: [
                    { value:2, label: 'ใช่', trigger: 'selfHarmQuestion3' },
                    { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion3' },
                  ],
                },
                {
                  id: 'selfHarmQuestionChoice3',
                    options: [
                      { value:6, label: 'ใช่', trigger: 'selfHarmQuestion3_1' },
                      { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion3_1' },
                    ],
                  },

                  {
                    id: 'selfHarmQuestionChoice3_1',
                      options: [
                        { value:0, label: 'ควบคุมได้', trigger: 'selfHarmQuestion4' },
                        { value:8, label: 'ควบคุมไม่ได้', trigger: 'selfHarmQuestion4' },
                      ],
                    },

                  {
                    id: 'selfHarmQuestionChoice4',
                      options: [
                        { value:8, label: 'มี', trigger: 'selfHarmQuestion5' },
                        { value:0, label: 'ไม่มี', trigger: 'selfHarmQuestion5' },
                      ],
                    },

                    {
                      id: 'selfHarmQuestionChoice5',
                        options: [
                          { value:9, label: 'ใช่', trigger: 'selfHarmQuestion6' },
                          { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion6' },
                        ],
                      },
                      {
                        id: 'selfHarmQuestionChoice6',
                          options: [
                            { value:4, label: 'ใช่', trigger: 'selfHarmQuestion7' },
                            { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion7' },
                          ],
                        },
                        {
                          id: 'selfHarmQuestionChoice7',
                            options: [
                              { value:10, label: 'ใช่', trigger: 'selfHarmQuestion8' },
                              { value:0, label: 'ไม่ใช่', trigger: 'selfHarmQuestion8' },
                            ],
                          },
                          {
                            id: 'selfHarmQuestionChoice8',
                              options: [
                                { value:4, label: 'ใช่', trigger: 'intheend' },
                                { value:0, label: 'ไม่ใช่', trigger: 'intheend' },
                              ],
                            },
                            {
                              id: 'intheend',
                            component: (<ShowResult />),
                            trigger: 'endtest'
                            },
                            {
                              id: 'endtest',
                                options: [
                                  {value:'ฉันต้องการความช่วยเหลืออย่างเร่งด่วน', label: 'ฉันต้องการความช่วยเหลืออย่างเร่งด่วน', trigger: 'Danger' },
                                  {value:'ฉันต้องการความช่วยเหลือ', label: 'ฉันต้องการความช่วยเหลือ',trigger: 'Normal' },
                                  {value:'ฉันไม่ต้องการความช่วยเหลือ', label: 'ฉันไม่ต้องการความช่วยเหลือ',trigger: 'NoNeed'}
                                ],
                              },
                              {
                                id: 'Danger',
                                component: (<View>
                                  <Button title="กดปุ่มนีเพื่อรับความช่วยเหลือแบบเร่งด่วน" onPress={this.SelfHarm_Danger} />
                                </View>) ,
                              },
                              {
                                id: 'Normal',
                                component: (<View>
                                  <Button title="กดปุ่มนีเพื่อรับความช่วยเหลือ" onPress={this.SelfHarm_Normal} />

                                </View>) ,
                              },
                              {
                                id: 'NoNeed',
                                component: (<Button title="กดปุ่มนี้เพื่อกลับสู่หน้าหลัก" onPress={this.FirstOpApp} />) ,
                              },


          ]}
        />

        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Let_talk;
