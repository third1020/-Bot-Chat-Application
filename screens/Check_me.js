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

import ChatBot from 'react-native-chatbot';
import PlaySound from '../AbilityBot/PlaySound';

export default class Check_me extends React.Component {
    static navigationOptions = {
        title: 'Check_me',
    };

    HomeScreen = () => {
      this.props.navigation.navigate('HomeScreen');
  };

  FirstOpApp = () => {
    this.props.navigation.navigate('FirstOpApp');
};

    render() {
        return (
          <ChatBot
          handleEnd={this.FirstOpApp}
          steps={[
            {
              id: '1',
              message: 'อาการชนิดไหนที่คุณต้องการเข้ารับการประเมินเบื้องต้น',
              trigger: 'FeelGood_2',
            },
           {
              id: 'FeelGood_2',
              component: (
                <Text>
                <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/1.png')}/>
                 {'\n'}
                 {'\n'}
                 {'\n'}
                </Text>
              ),
              asMessage:true,
              trigger: '2',
            },
            {
                id: '2',
                  options: [
                    { value:'ความเครียด วิตกกังวล และภาวะซึมเศร้า', label: 'ความเครียด วิตกกังวล และภาวะซึมเศร้า', trigger: 'HowYouFeel' },
                    { value:'ความเสี่ยงในการทำร้ายตัวเองและการฆ่าตัวตาย', label: 'ความเสี่ยงในการทำร้ายตัวเองและการฆ่าตัวตาย', trigger: 'HowYouFeel' },
                  ],
                },
                // Deep-Mind analytic
              {
                id: 'HowYouFeel',
                message: 'ตอนนี้คุณรู้สึกอย่างไร' ,
                trigger: 'HowYouFeelChoice',
              },
              {
                id: 'HowYouFeelChoice',
                options: [
                  { value:'ดี', label: 'ดี', trigger: 'FeelGood' },
                  { value:'มีความสุข', label: 'มีความสุข', trigger: 'FeelGood' },
                  { value:'โล่งอก', label: 'โล่งอก', trigger: 'FeelGood' },
                  { value:'เหนื่อย', label: 'เหนื่อย', trigger: 'FeelTired' },
                  { value:'นอนไม่หลับ', label: 'นอนไม่หลับ', trigger: 'HowToSleep_Sticker' },
                  { value:'ป่วย', label: 'ป่วย', trigger: 'FeelSick' },
                  { value:'เครียด', label: 'เครียด', trigger: 'feedbackreply' }, // need DASS from main app
                  { value:'ซึมเศร้า', label: 'ซึมเศร้า', trigger: 'feedbackreply' }, // need DASS from main app
                  { value:'วิตกกังวล', label: 'วิตกกังวล', trigger: 'feedbackreply' }, // need DASS from main app
                  { value:'โกรธ', label: 'โกรธ', trigger: 'FeelAngry' },
                  { value:'เหงา', label: 'เหงา', trigger: 'FeelLonely' },
                ],
              },
              {
                id: 'FeelGood',
                message: 'ฉันดีใจมาก ที่คุณรู้สึก{previousValue}' ,
                trigger: 'FeelGood_2',
              },
              {
                id: 'FeelGood_2',
                component: (
                  <Text>
                  <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/2.png')}/>
                   {'\n'}
                   {'\n'}
                   {'\n'}
                  </Text>
                ),
                asMessage:true,
                trigger: 'WhyYouFeel',
              },
              {
                id: 'WhyYouFeel',
                message: 'บอกให้ฉันรู้ได้ไหมว่ามีอะไรเกิดขึ้น แล้วทำให้คุณรู้สึก{previousValue}' ,
                trigger: 'WhyYouFeelType',
              },
              {
                id: 'WhyYouFeelType',
                user: true,
                trigger: 'WhyYouFeelTypeAnswer',
              },
              {
                id: 'WhyYouFeelTypeAnswer',
                message: 'น้องการุดีใจที่คุณรู้สึกดีนะ และหวังว่าคุณจะแชร์ความรู้สึกดีๆให้กับน้องการุ รับรู้อีกนะ น้องการุพร้อมจะรับฟังเสมอ! 😊' ,
                trigger: 'ThankMindbot',
              },
              {
                id: 'ThankMindbot',
                options: [
                  { value:'ขอบคุณนะ น้องการุ!', label: 'ขอบคุณนะ น้องการุ!', trigger: 'HowWasIt' },
                  { value:'Thank you Garoo!', label: 'Thank you Garoo!', trigger: 'HowWasIt' },
                ],
              },
              {
                id: 'FeelTired',
                message: 'ฉันหวังว่าคุณจะได้พักผ่อนบ้างนะ' ,
                trigger: 'ThankMindbot1',
              },
              {
                id: 'ThankMindbot1',
                options: [
                  { value:'ขอบคุณนะ น้องการุ!', label: 'ขอบคุณนะ น้องการุ!', trigger: 'Tired' },
                  { value:'Thank you Garoo!', label: 'Thank you Garoo!', trigger: 'Tired' },
                ],
              },
              {
                id: 'Tired',
                message: 'ฉันมีของวิเศษซึ่งจะช่วยผ่อนคลายความเหนื่อยล้าให้คุณได้' ,
                trigger: 'TiredChoice',
              },
              {
                id: 'TiredChoice',
                options: [
                  { value:'ผ่อนคลายกล้ามเนื้อ', label: 'ผ่อนคลายกล้ามเนื้อ', trigger: 'RelaxMuscle' },
                  { value:'ดนตรีบำบัด', label: 'ดนตรีบำบัด', trigger: 'TherapyMusic' },
                ],
              },
                {
                  id: 'RelaxMuscle',
                  component: (
                    <View><Image
                      source={require('../assets/image/relaxmuscle.jpg')}
                    /></View>
                  ),
                  trigger: 'RelaxMuscleChoice',
                },
                {
                  id: 'RelaxMuscleChoice',
                  options: [
                    { value:'เข้าใจแล้ว น้องการุ', label: 'เข้าใจแล้ว น้องการุ', trigger: 'HowWasIt' },
                  ],
                },
                {
                  id: 'TherapyMusic',
                  component: (
                    <PlaySound/>
                  ),
                  trigger: 'TherapyMusicChoice',
                },
                {
                  id: 'TherapyMusicChoice',
                  options: [
                    { value:'เรียบร้อยแล้ว น้องการุ', label: 'เรียบร้อยแล้ว น้องการุ', trigger: 'HowWasIt' },
                  ],
                },

                {
                  id: 'HowToSleep_Sticker',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'HowToSleep',
                },
                {
                  id: 'HowToSleep',
                  component: (<Image style={{ width: 340,height: 300,  alignSelf: 'auto',}} source={{uri:'https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/50058549_1983959065024959_412088230716899328_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk5-3.fna&oh=5d94fb7978181d3704643d148c187453&oe=5CBD10FC'} } />  ),
                  trigger: 'HowToSleepChoice',
                },
                {
                  id: 'HowToSleepChoice',
                  options: [
                    { value:'ฉันง่วงนอนแล้วล่ะ', label: 'ฉันง่วงนอนแล้วล่ะ 😴', trigger: 'GoodNight' },
                    { value:'ฉันจะพยายามทำตามคำแนะนำนะ', label: 'ฉันจะพยายามทำตามคำแนะนำนะ 👌', trigger: 'HowToSleep1' },
                  ],
                },
                {
                  id: 'GoodNight',
                  message: 'โอเคจ้า ฝันดีนะ แล้วพบกันใหม่วันพรุ่งนี้' ,
                  trigger: 'GoodNight_2',

                },
                {
                  id: 'GoodNight_2',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/6.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'GoodNightChoice',
                },
                {
                  id: 'GoodNightChoice',
                  options: [
                    { value:'Good Night Garoo!', label: 'Good Night Garoo!', end: true },
                    { value:'ฝันดีนะ น้องการุ', label: 'ฝันดีนะ น้องการุ', end: true },
                  ],
                },
                {
                  id: 'HowToSleep1',
                  message: 'บางทีการคุยกับฉันบนหน้าจออาจจะทำให้คุณหลับยากยิ่งขึ้น ฉันจึงอยากให้คุณหลีกเลี่ยงกิจกรรมอื่นๆ บนหน้าจอของคุณบ้างนะ 😟' ,
                  trigger: 'GoodNightChoice',
                },
                {
                  id: 'FeelSick',
                  message: 'ฉันขอให้คุณหายจากอาการป่วยในเร็ววันนะ' ,
                  trigger: 'FeelSickChoice',
                },
                {
                  id: 'FeelSickChoice',
                  options: [
                    { value:'ขอบคุณนะ น้องการุ', label: 'ขอบคุณนะ น้องการุ', trigger:'NeedHelp1'},
                    { value:'ขอบคุณค่ะ', label: 'ขอบคุณค่ะ', trigger:'NeedHelp1'},
                  ],
                },
                {
                  id: 'NeedHelp1',
                  message: 'คุณต้องการให้ฉันช่วยอะไรคุณไหม?' ,
                  trigger: 'NeedHelpChoice',
                },
                {
                  id: 'NeedHelpChoice',
                  options: [
                    { value:'ฉันแค่อยากเล่าให้ฟังเฉยๆ', label: 'ฉันแค่อยากเล่าให้ฟังเฉยๆ', trigger:'NeedHelp'},
                    { value:'ฉันอยากรู้สึกดีขึ้น', label: 'ฉันอยากรู้สึกดีขึ้น', trigger:'WantToFeelGood'},
                  ],
                },
                {
                  id: 'WantToFeelGood_Sticker',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'FeelSick',
                },
                {
                  id: 'WantToFeelGood',
                  component: (
                    <Text>
                    เทคนิคช่วยให้หายป่วย Inspired by Garoo{'\n'}
                    -ทานของอุ่นๆ{'\n'}
                    -นอนพัก{'\n'}
                    -รับประทานอาหารที่มีประโยชน์{'\n'}
                    -เคลื่อนไหวร่างกาย
                    </Text>
                  ),
                  trigger: 'WantToFeelGoodChoice',
                },
                {
                  id: 'WantToFeelGoodChoice',
                  options: [
                    { value:'เข้าใจแล้ว น้องการุ', label: 'เข้าใจแล้ว น้องการุ', trigger:'WantToFeelGoodSum'},
                  ],
                },
                {
                  id: 'WantToFeelGoodSum',
                  message: 'ฉันหวังว่าเทคนิคเหล่านี้จะช่วยให้คุณรู้สึกดีขึ้นและขอให้คุณหายป่วยแล้วกลับมาแข็งแรงในเร็ววันนะ 💪' ,
                  trigger: 'HowWasIt',
                },
                {
                  id: 'NeedHelp',
                  message: 'คุณสามารถเล่าให้ฉันฟังได้เลยนะ ฉันพร้อมรับฟังคุณทุกเมื่อ' ,
                  trigger: 'NeedHelpChoice',
                },
                {
                  id: 'TellStory1',
                    user: true,
                    trigger: 'HowWasIt',//trigger: 'userName',
                  },
                  {
                    id: 'FeelSick2',
                    message: 'ฉันขอให้คุณหายป่วย กลับมาแข็งแรงในเร็ววันนะ 💪' ,
                    trigger: 'HowWasIt',
                  },
                  {
                    id: 'FeelAngry',
                    message: 'ฉันมีของวิเศษ 2 ชิ้นซึ่งช่วยลดอัตราการเต้นของหัวใจคุณ และช่วยให้คุณสงบมากยิ่งขึ้น' ,
                    trigger: 'FeelAngry1',
                  },
                  {
                    id: 'FeelAngry1',
                    message: 'เลือกได้เลยจ้า' ,
                    trigger: 'FeelAngry1_Sticker',
                  },
                  {
                    id: 'FeelAngry1_Sticker',
                    component: (
                      <Text>
                      <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                       {'\n'}
                       {'\n'}
                       {'\n'}
                      </Text>
                    ),
                    asMessage:true,
                    trigger: 'FeelAngryChoice',
                  },
                  {
                    id: 'FeelAngryChoice',
                    options: [
                      { value:'ฝึกการหายใจ', label: 'ฝึกการหายใจ', trigger:'BreathPrac'},
                      { value:'นั่งสมาธิ', label: 'นั่งสมาธิ', trigger:'Meditation'},
                    ],
                  },
                  {
                  id: 'WantToFeelGood_Sticker',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'FeelSick',
                },
                  {
                    id: 'Meditation',
                    message: 'ขั้นตอนแรก ฉันอยากให้คุณนั่งบนพื้น หรือนั่งบนเก้าอี้ก็ได้' ,
                    trigger: 'MeditationChoice',
                  },
                  {
                    id: 'Meditation1',
                    message: 'หลังจากนั้นเอามือขวาทับมือซ้ายไว้ตรงบริเวณตัก แบบนี้จ้า..' ,
                    trigger: 'MeditationImage',
                  },
                  {
                    id: 'MeditationImage',
                    component: (
                      <View><Image
                      source={require('../assets/image/Meditation_posture.jpg')}
                    /></View>
                    ),
                    trigger: 'MeditationChoice1',
                  },
                  {
                    id: 'Meditation2',
                    message: 'หลับตาแล้วทำจิตใจให้สงบประมาณ 5 นาทีนะ ⏱️' ,
                    trigger: 'MeditationChoice2',
                  },
                  {
                    id: 'Meditation3',
                    message: 'ฉันหวังว่าของวิเศษของฉันจะช่วยให้จิตใจของคุณสงบมากขึ้นนะ' ,
                    trigger: 'Meditation3_5',
                  },
                  {
                    id: 'Meditation3_5',
                    component: (
                      <Text>
                      <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/4.png')}/>
                       {'\n'}
                       {'\n'}
                       {'\n'}
                      </Text>
                    ),
                    asMessage:true,
                    trigger: 'Meditation4',
                  },
                  {
                    id: 'Meditation4',
                    message: 'ฉันอยากให้คุณรู้ว่าบางทีอารมณ์โกรธอาจจะทำให้คุณขาดสติจนทำให้ปัญหาบานปลาย สิ่งที่ฉันทำได้คือการช่วยให้คุณสงบ และมีสติที่เพียบพร้อมต่อการแก้ไขปัญหาที่คุณเผชิญอยู่ตรงหน้า' ,
                    trigger: 'Meditation5',
                  },
                  {
                    id: 'Meditation5',
                    message: 'ฉันขอให้คุณผ่านพ้นปัญหาเหล่านี้ไปได้ด้วยดี อย่างที่ฉันพูดทุกครั้งฉันจะอยู่เคียงข้างคุณเสมอ 👌' ,
                    trigger: 'Meditation5Choice',
                  },
                  {
                    id: 'Meditation5Choice',
                    options: [
                      { value:'ขอบคุณครับ น้องการุ', label: 'ขอบคุณครับ น้องการุ', trigger:'HowWasIt'},
                      { value:'ขอบคุณค่ะ น้องการุ', label: 'ขอบคุณค่ะ น้องการุ', trigger:'HowWasIt'},
                    ],
                  },
                  {
                    id: 'MeditationChoice',
                    options: [
                      { value:'ขั้นตอนต่อไป', label: 'ขั้นตอนต่อไป', trigger:'MeditationChoice1'},
                    ],
                  },
                  {
                    id: 'MeditationChoice1',
                    options: [
                      { value:'ขั้นตอนต่อไป', label: 'ขั้นตอนต่อไป', trigger:'MeditationChoice2'},
                    ],
                  },
                  {
                    id: 'MeditationChoice2',
                    options: [
                      { value:'เริ่มเลย น้องการุ', label: 'เริ่มเลย น้องการุ', trigger:'Meditation3'},
                    ],
                  },


                  {
                    id: 'BreathPrac',
                    message: 'นำเข้าสู่ Feature ฝึกการหายใจของ App Mindmood' ,
                    trigger: 'BreathPracChoice',
                  },
                  {
                    id: 'BreathPracChoice',
                    options: [
                      { value:'เรียบร้อยแล้ว น้องการุ', label: 'เรียบร้อยแล้ว น้องการุ', trigger:'cbt2'},
                    ],
                  },
                  {
                    id: 'FeelLonely',
                    message: 'ฉันเข้าใจคุณนะ ฉันรู้ว่ามันไม่ใช่ความรู้สึกที่ดีเลย' ,
                    trigger: 'FeelLonelyChoice',
                  },
                  {
                    id: 'FeelLonelyChoice',
                    options: [
                      { value:'ขอบคุณครับ น้องการุ', label: 'ขอบคุณครับ น้องการุ', trigger:'FeelLonely2'},
                      { value:'ขอบคุณค่ะ น้องการุ', label: 'ขอบคุณค่ะ น้องการุ', trigger:'FeelLonely2'},
                    ],
                  },
                  {
                    id: 'FeelLonely2',
                    message: 'แต่ในขณะเดียวกัน ฉันก็พบความพิเศษบางอย่างที่อยู่ในตัวคุณ 😊' ,
                    trigger: 'FeelLonelyChoice2',
                  },
                  {
                    id: 'FeelLonelyChoice2',
                    options: [
                      { value:'คืออะไรเหรอ?', label: 'คืออะไรเหรอ?', trigger:'FeelLonely3'},
                    ],
                  },
                  {
                    id: 'FeelLonely3',
                    message: 'ก็คือ ให้คุณค่ากับความสัมพันธ์ต่อเพื่อนและคนที่คุณรัก และนั่นแหละคือสิ่งที่ฉันสัมผัสได้จากตัวคุณ' ,
                    trigger: 'FeelLonely3_5',
                  },
                  {
                    id: 'FeelLonely3_5',
                    component: (
                      <Text>
                      <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/4.png')}/>
                       {'\n'}
                       {'\n'}
                       {'\n'}
                      </Text>
                    ),
                    asMessage:true,
                    trigger: 'FeelLonelyChoice3',
                  },
                  {
                    id: 'FeelLonelyChoice3',
                    options: [
                      { value:'emoji_1', label: '😳', trigger:'FeelLonely4'},
                      { value:'emoji_2', label: '😢', trigger:'FeelLonely4'},
                    ],
                  },
                  {
                    id: 'FeelLonely4',
                    message: 'คุณต้องการให้ฉันช่วยอะไรคุณไหม?' ,
                    trigger: 'FeelLonelyChoice4',
                  },
                  {
                    id: 'FeelLonelyChoice4',
                    options: [
                      { value:'ฉันอยากรู้สึกดีขึ้น', label: 'ฉันอยากรู้สึกดีขึ้น', trigger:'FeelLonely5'},//trigger:'Behavior'
                      { value:'ฉันแค่อยากเล่าให้ฟังเฉยๆ', label: 'ฉันแค่อยากเล่าให้ฟังเฉยๆ', trigger:'FeelLonely5'},
                    ],
                  },
                  {
                    id: 'FeelLonely5',
                    message: 'คุณสามารถเล่าให้ฉันฟังได้เลยจ้า ✏️' ,
                    trigger: 'FeelLonely_Sticker',
                  },
                  {
                    id: 'FeelLonely_Sticker',
                    component: (
                      <Text>
                      <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                       {'\n'}
                       {'\n'}
                       {'\n'}
                      </Text>
                    ),
                    asMessage:true,
                    trigger: 'FeelLonelyType',
                  },
                  {
                    id: 'FeelLonelyType',
                      user: true,
                      trigger: 'FeelLonelySum',
                    },
                    {
                      id: 'FeelLonelySum',
                      message: 'ฉันหวังว่าเมื่อถึงเวลาจะมีใครสักคนที่เห็นคุณค่าในตัวคุณ เหมือนที่ฉันเห็นนะ' ,
                      trigger: 'HowWasIt',
                    },
                {
                  id: 'selfHarm',
                  message: 'ฉันตรวจสอบคำที่คุณต้องการความช่วยเหลือ หรือจะเป็นอันตรายต่อคุณ คุณต้องการเข้ารับการประเมินเบื้องต้นหรือไม่ ใช้เวลาแค่ 2 นาที และจะเป็นประโยชน์ต่อตัวคุณมากๆเลยนะ 🙂',
                  trigger: 'selfHarmChoice',
                },
                {
                id: 'selfHarmChoice',
                  options: [
                    { value:'ต้องการ', label: 'ต้องการ', trigger: 'selfHarmStart' },
                    { value:'ไม่ต้องการ', label: 'ไม่ต้องการ', trigger: 'startCBT' },

                  ],
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
                  message: 'แล้วคุณสามารถควมคุมความอยากฆ่าตัวตายที่คุณคิดอยู่ในขณะนั้นได้หรือไม่?',
                  trigger: 'selfHarmQuestionChoice3_1',
                },
                {
                  id: 'selfHarmQuestion3_2',
                  message: 'ดีแล้วแหละครับ คุณจะไม่ฆ่าตัวตายแน่นอนใช่ไหม?',
                  trigger: 'selfHarmQuestionChoice3_2',
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
                    { value:2, label: 'ใช่', trigger: 'selfHarmQuestion2' },
                    { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion2' },
                  ],
                },
                {
                  id: 'selfHarmQuestionChoice2',
                    options: [
                      { value:3, label: 'ใช่', trigger: 'selfHarmQuestion3' },
                      { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion3' },
                    ],
                  },
                  {
                    id: 'selfHarmQuestionChoice3',
                      options: [
                        { value:7, label: 'ใช่', trigger: 'selfHarmQuestion3_1' },
                        { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion3_2' },
                      ],
                    },

                    {
                      id: 'selfHarmQuestionChoice3_1',
                        options: [
                          { value:1, label: 'ควบคุมได้', trigger: 'selfHarmQuestion4' },
                          { value:9, label: 'ควบคุมไม่ได้', trigger: 'selfHarmQuestion4' },
                        ],
                      },
                      {
                        id: 'selfHarmQuestionChoice3_2',
                          options: [
                            { value:1, label: 'แน่นอน', trigger: 'selfHarmQuestion4' },

                          ],
                        },
                    {
                      id: 'selfHarmQuestionChoice4',
                        options: [
                          { value:9, label: 'มี', trigger: 'selfHarmQuestion5' },
                          { value:1, label: 'ไม่มี', trigger: 'selfHarmQuestion5' },
                        ],
                      },

                      {
                        id: 'selfHarmQuestionChoice5',
                          options: [
                            { value:10, label: 'ใช่', trigger: 'selfHarmQuestion6' },
                            { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion6' },
                          ],
                        },
                        {
                          id: 'selfHarmQuestionChoice6',
                            options: [
                              { value:5, label: 'ใช่', trigger: 'selfHarmQuestion7' },
                              { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion7' },
                            ],
                          },
                          {
                            id: 'selfHarmQuestionChoice7',
                              options: [
                                { value:11, label: 'ใช่', trigger: 'selfHarmQuestion8' },
                                { value:1, label: 'ไม่ใช่', trigger: 'selfHarmQuestion8' },
                              ],
                            },
                            {
                              id: 'selfHarmQuestionChoice8',
                                options: [
                                  { value:5, label: 'ใช่', trigger: 'HowWasIt' },
                                  { value:1, label: 'ไม่ใช่', trigger: 'HowWasIt' },
                                ],
                              },
                {
                  id: 'selfHarmStart',
                  message: 'โอเคจ้า งั้นเรามาเริ่มกันเลย ✌️',
                  trigger: 'selfHarmStart_2',
                },
                {
                  id: 'selfHarmStart_2',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/1.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'selfHarmQuestion1',
                },
                {
                  id: 'startCBT_2',
                  message: 'สวัสดี หลังจากคราวที่แล้วที่เราคุยกัน วันนี้ฉันจึงมีแบบทดสอบให้คุณทำ ซึ่งใช้เวลาเพียง 2 นาทีเท่านั้น',
                  trigger: 'startCBT',
                },
                {
                  id: 'startCBT',
                  component: (
                    <Text>
                    <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/6.png')}/>
                     {'\n'}
                     {'\n'}
                     {'\n'}
                    </Text>
                  ),
                  asMessage:true,
                  trigger: 'letstartCBT',
                },
                {
                  id: 'letstartCBT',
                  message: 'งั้นเรามาเริ่มกันเลยดีกว่า ✌️',
                  trigger: 'questionCBT',
                },
                {
                  id: 'questionCBT',
                  message: 'ข้อใดมีการใช้ความคิดแบบ All-or-Nothing',
                  trigger: 'questionCBTchoice',
                },
                {
                  id: 'questionCBTchoice',
                    options: [
                      { value:'ฉันจะพยายามทำให้ดีที่สุด', label: 'ฉันจะพยายามทำให้ดีที่สุด', trigger: 'WrongAnswer' },
                      { value:'ฉันทำไม่ได้แน่ๆ', label: 'ฉันทำไม่ได้แน่ๆ', trigger: 'RightAnswer' },
                      { value:'ฉันทำได้ในบางครั้ง', label: 'ฉันทำได้ในบางครั้ง', trigger: 'WrongAnswer' },
                      { value:'All-or-Nothing คืออะไร?', label: 'All-or-Nothing คืออะไร?', trigger: 'WhatisAllorNothing' },

                    ],
                  },
                  {
                    id: 'WhatisAllorNothing',
                    message: 'All-or-Nothing คือความคิดสุดขั้วในด้านใดด้านหนึ่ง เป็นดำหรือขาวไปหมด เป็นบวกหรือลบไปหมด โดยไม่สามารถมองอะไรกลางๆได้',
                    trigger: 'questionCBT',
                  },
                  {
                    id: 'RightAnswer',
                    message: 'เย้ๆ เยี่ยมไปเลยจ้า คราวนี้ลองข้อต่อไปนะ 🙂',
                    trigger: 'RightAnswer_sticker',
                  },
                  {
                    id: 'RightAnswer_sticker',
                    component: (
                      <Text>
                      <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/2.png')}/>
                       {'\n'}
                       {'\n'}
                       {'\n'}
                      </Text>
                    ),
                    asMessage:true,
                    trigger: 'questionCBT2',
                  },

                  {
                    id: 'WrongAnswer',
                    message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                    trigger: 'questionCBTchoice',
                  }, {
                    id: 'WrongAnswer2',
                    message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                    trigger: 'questionCBTchoice2',
                  },
                  {
                    id: 'questionCBT2',
                    message: 'ข้อใดไม่มีการใช้ความคิดแบบ Labeling',
                    trigger: 'questionCBTchoice',
                  },
                  {
                    id: 'questionCBTchoice2',
                      options: [
                        { value:'ไม่มีใครชอบฉันอีกต่อไป', label: 'ไม่มีใครชอบฉันอีกต่อไป', trigger: 'WrongAnswer2' },
                        { value:'ฉันไม่สามารถเป็นเพื่อนกับใครได้อีก', label: 'ฉันไม่สามารถเป็นเพื่อนกับใครได้อีก', trigger: 'WrongAnswer2' },
                        { value:'ฉันคิดว่าแม่ฉันน่าจะงานยุ่งอยู่ เลยอาจจะมาสาย', label: 'ฉันคิดว่าแม่ฉันน่าจะงานยุ่งอยู่ เลยอาจจะมาสาย', trigger: 'RightAnswer2' },
                        { value:'Labeling คืออะไร', label: 'Labeling คืออะไร', trigger: 'WhatisLabeling' },
                      ],
                    },
                    {
                      id: 'questionCBT3',
                      message: 'ข้อใดใช้ความคิดแบบ "Should" and "Must" statement',
                      trigger: 'questionCBTchoice3',
                    },
                    {
                      id: 'WrongAnswer3',
                      message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                      trigger: 'questionCBTchoice',
                    },
                    {
                      id: 'questionCBTchoice3',
                        options: [
                          { value:'ฉันต้องสอบคิดหมอให้ได้', label: 'ฉันต้องสอบคิดหมอให้ได้', trigger: 'RightAnswerFinal' },
                          { value:'ฉันยอมรับในการตัดสินใจของเพื่อน', label: 'ฉันยอมรับในการตัดสินใจของเพื่อน', trigger: 'WrongAnswer3' },
                          { value:'ชีวิตของฉันมีค่า', label: 'ชีวิตของฉันมีค่า', trigger: 'WrongAnswer3' },
                          { value:'"Should" and "Must" statement คืออะไร?', label: '"Should" and "Must" statement คืออะไร?', trigger: 'WhatisShouldMust' },
                        ],
                      },
                    {
                      id: 'WhatisLabeling',
                      message: 'Labeling คือการตีตราตนเอง หรือ คนอื่นในทางลบ ไม่ว่าจะทำอะไรก็มักจะยึดติดกับความรู้สึกที่ตนได้ตีตราไว้',
                      trigger: 'questionCBT',
                    },
                    {
                      id: 'WhatisShouldMust',
                      message: '"Should and "Must" statement คือการคิดความหวังให้ตนเองหรือคนอื่นเป็นอย่างนั้นอย่างนี้ตามที่ตนคาดหวัง หรือตามความต้องการของตน',
                      trigger: 'questionCBT',
                    },
                    {
                      id: 'RightAnswerFinal',
                      message: 'สุดยอดที่สุดเลย 🎉 ฉันทึ่งในความสามารถของคุณนะ แล้วก็ใจของคุณด้วย',
                      trigger: 'RightAnswerFinal_sticker',
                    },
                    {
                      id: 'RightAnswerFinal_sticker',
                      component: (
                        <Text>
                        <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/2.png')}/>
                         {'\n'}
                         {'\n'}
                         {'\n'}
                        </Text>
                      ),
                      asMessage:true,
                      trigger: 'ThankGaroo',
                    },
                    {
                      id: 'ThankGaroo',
                      options: [
                        { value:'ขอบคุณครับ น้องการุ', label: 'ขอบคุณครับ น้องการุ', trigger:'HowWasIt'},
                        { value:'ขอบคุณค่ะ น้องการุ', label: 'ขอบคุณค่ะ น้องการุ', trigger:'HowWasIt'},
                      ],
                    },
                    {
                      id: 'RightAnswer2',
                      message: 'ว้าว! ยอดไปเลย ต่อไปข้อสุดท้ายนะ 🙂',
                      trigger: 'RightAnswer2_sticker',
                    },
                    {
                      id: 'RightAnswer2_sticker',
                      component: (
                        <Text>
                        <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/2.png')}/>
                         {'\n'}
                         {'\n'}
                         {'\n'}
                        </Text>
                      ),
                      asMessage:true,
                      trigger: 'questionCBT3',
                    },
                    {
                      id: 'WrongAnswer',
                      message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                      trigger: 'questionCBTchoice',
                    },

                    // Cognitive Behavior Therapy (CBT)
                    {
                      id: 'cbt1',
                      message: 'ฉันเข้าใจความรู้สึกของคุณนะ' ,
                      trigger: 'cbt2',
                    },
                    {
                      id: 'cbt2',
                      message: 'ฉันอาจจะใช้ของวิเศษชิ้นนี้ช่วยคุณได้ 🤔' ,
                      trigger: 'cbt2_Sticker',
                    },
                    {
                      id: 'cbt2_Sticker',
                      component: (
                        <Text>
                        <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/3.png')}/>
                         {'\n'}
                         {'\n'}
                         {'\n'}
                        </Text>
                      ),
                      asMessage:true,
                      trigger: 'cbt3',
                    },
                    {
                      id: 'cbt3',
                      message: 'งั้นเรามาเริ่มกันเลยดีกว่า! ฉันจะยกตัวอย่างประโยคให้คุณดังนี้' ,
                      trigger: 'cbt4',
                    },
                    {
                      id: 'cbt4',
                      message: '"ทั้งหมดเป็นความผิดของฉัน"' ,
                      trigger: 'cbt5',
                    },
                    {
                      id: 'cbt5',
                        options: [
                          { value:'ทั้งหมด', label: 'ทั้งหมด', trigger: 'cbt7' },
                          { value:'ความผิด', label: 'ความผิด', trigger: 'cbt6' },
                        ],
                      },
                      {
                        id: 'cbt6',
                        message: 'หืม... ฉันอยากให้คุณคิดอีกที คำว่า "ความผิด" ที่คุณคิดอยู่เป็นความจริงใช่หรือไม่ หรือเป็นความคิดที่แต่งเติมขึ้นมาจากความรู้สึกเราเอง' ,
                        trigger: 'cbt8',
                      },
                      {
                        id: 'cbt7',
                        message: 'ถูกต้องแล้วจ้า! ฉันคิดว่า "ความผิด" คือความจริง แต่ความคิดที่แต่งเติมคือคำว่า "ทั้งหมด" เพราะบางทีเราก็ไม่ได้เป็นคนผิดทั้งหมดเสมอไปนะ' ,
                        trigger: 'cbt9',
                      },
                      {
                        id: 'cbt8',
                          options: [
                            { value:'ใช่', label: 'ใช่', trigger: 'cbt7' },
                            { value:'ความคิดที่แต่งเติม?', label: 'ความคิดที่แต่งเติม?', trigger: 'cbt6' },
                          ],
                        },
                        {
                          id: 'cbt8',
                            options: [
                              { value:'emoji_99', label: '😊', trigger: 'cbt9' },
                              { value:'emoji_98', label: '😢', trigger: 'cbt9' },
                            ],
                          },
                          {
                            id: 'cbt9',
                            message: 'บางทีการเปลี่ยนแปลงอาจจะเป็นสิ่งที่ยาก แต่การที่คุณได้พูดคุยกับฉันในวันนี้ จะเป็น "จุดเริ่มต้นที่ดี" ในการเปลี่ยนแปลงอารมณ์ของคุณ ✌️' ,
                            trigger: 'cbt10',
                          },
                          {
                            id: 'cbt10',
                            message: 'นี่คือสิ่งที่ทุกคนสามารถขัดเกลาและฝึกฝนตนเองได้แล้วฉันจะคอยอยู่เคียงข้างและช่วยเหลือคุณทุกเมื่อเลยนะ ❤️' ,
                            trigger: 'cbt10_5',
                          },
                          {
                            id: 'cbt10_5',
                            component: (
                              <Text>
                              <Image style={{ width: 90,height: 100,}} source={require('../assets/garoo/4.png')}/>
                               {'\n'}
                               {'\n'}
                               {'\n'}
                              </Text>
                            ),
                            asMessage:true,
                            trigger: 'cbtlast',
                          },
                          {
                            id: 'cbtlast',
                              options: [
                                { value:'ขอบคุณนะ น้องการุ', label: 'ขอบคุณนะ น้องการุ', trigger: 'HowWasIt' },
                                { value:'ฉันจะพยายาม น้องการุ', label: 'ฉันจะพยายาม น้องการุ', trigger: 'HowWasIt' },
                              ],
                            },
                          {
                            id: 'HowWasIt',
                            message: 'คุณรู้สึกยังไงที่ได้คุยกับฉันในวันนี้' ,
                            trigger: 'HowWasItChoice',
                          },
                          {
                            id: 'HowWasItChoice',
                              options: [
                                { value:'emoji_97', label: '👍', trigger: 'feedbackreply' },
                                { value:'emoji_96', label: '👎', trigger: 'feedbackreply' },
                              ],
                            },
                            {
                              id: 'feedbackreply',
                              message: 'ขอบคุณสำหรับการติชม ฉันมีความสุขทุกครั้งที่ได้เป็นเพื่อนดูแลใจของคุณ 😊' ,
                              trigger: 'feedbackemoji',
                            },
                            {
                              id: 'feedbackemoji',
                                options: [
                                  { value:'emoji_95', label: '❤️', trigger: 'seeu' },
                                ],
                              },
                                {
                                  id: 'seeu',
                                  message: 'แล้วพบกันอีกนะ  😊' ,
                                  trigger: 'seeuChoice',
                                },

                                {
                                  id: 'seeuChoice',
                                    options: [
                                      { value:'แล้วพบกัน น้องการุ', label: 'แล้วพบกัน น้องการุ', end: true },
                                      { value:'Bye น้องการุ', label: 'Bye น้องการุ', end: true },
                                    ],
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
