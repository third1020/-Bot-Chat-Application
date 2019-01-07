import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import Add from '../navigation/Add';
import ChatBot from 'react-native-chatbot';

export default class Let_talk extends React.Component {
    static navigationOptions = {
        title: 'Let_talk',
    };

    render() {
        return (
          <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
                id: 'start',
                message: 'โอเคจ้า งั้นเรามาเริ่มเปิดใจคุยกันเลยดีกว่า',
                trigger: 'heart',
              },
              {
                id: 'heart',
                options: [
                  {  label: '❤️', trigger: 'HowYouFeel' },
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
                  {  label: 'ดี', trigger: 'FeelGood' },
                  {  label: 'มีความสุข', trigger: 'FeelGood' },
                  {  label: 'โล่งอก', trigger: 'FeelGood' },
                  {  label: 'เหนื่อย', trigger: 'feedbackreply' },
                  {  label: 'นอนไม่หลับ', trigger: 'feedbackreply' },
                  {  label: 'ป่วย', trigger: 'feedbackreply' },
                  {  label: 'เครียด', trigger: 'feedbackreply' },
                  {  label: 'ซึมเศร้า', trigger: 'feedbackreply' },
                  {  label: 'วิตกกังวล', trigger: 'feedbackreply' },
                  {  label: 'โกรธ', trigger: 'feedbackreply' },
                  {  label: '👎', trigger: 'feedbackreply' },
                ],
              },
              {
                id: 'FeelGood',
                message: 'ฉันดีใจมาก ที่คุณรู้สึก{previousValue}' ,
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
                message: 'ฉันดีใจที่คุณรู้สึกดีนะ และหวังว่าคุณจะแชร์ความรู้สึกดีๆให้ Mindbot รับรู้อีกนะ 😊' ,
                trigger: 'ThankMindbot',
              },
              {
                id: 'ThankMindbot',
                options: [
                  {  label: 'ขอบคุณนะ Mindbot!', trigger: 'HowWasIt' },
                  {  label: 'Thank you Mindbot!', trigger: 'HowWasIt' },
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
                  {  label: 'ขอบคุณนะ Mindbot!', trigger: 'Tired' },
                  {  label: 'Thank you Mindbot!', trigger: 'Tired' },
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
                  {  label: 'ผ่อนคลายกล้ามเนื้อ', trigger: 'RelaxMuscle' },
                  {  label: 'ดนตรีบำบัด', trigger: 'TherapyMusic' },
                ],
              },
                {
                  id: 'RelaxMuscle',
                  message: 'แสดงข้อมูลการผ่อนคลายกล้ามเนื้อจาก App Mindmood' ,
                  trigger: 'RelaxMuscleChoice',
                },
                {
                  id: 'RelaxMuscleChoice',
                  options: [
                    {  label: 'เข้าใจแล้ว Mindbot', trigger: 'HowWasIt' },
                  ],
                },
                {
                  id: 'TherapyMusic',
                  component: (
                    <Button

                    title="Play"
                    color="#841584"
                accessibilityLabel="Learn more about this purple button"
                    />
                  ),
                  trigger: 'TherapyMusicChoice',
                },
                {
                  id: 'TherapyMusicChoice',
                  options: [
                    {  label: 'เรียบร้อยแล้ว Mindbot', trigger: 'HowWasIt' },
                  ],
                },
                {
                  id: 'HowToSleep',
                  component: (
                    <Text>ปัญหานอนไม่หลับ {'\n'}
                    โดยเฉลี่ยมนุษย์มีความต้องการในการนอนประมาณ 8 ชั่วโมงต่อวัน ความต้องการการนอนของแต่ละคนอาจแตกต่างกันไปขึ้นกับช่วงวัยและธรรมชาติร่างกายของบุคคลนั้นๆ การนอนหลับอย่างเพียงพอและมีคุณภาพจะช่วยให้ร่างกายได้พักผ่อนกระตุ้นการเจริญเติบโต ซ่อมแซมและฟื้นฟูสมรรถภาพของร่างกายรวมถึง มีสภาวะจิตใจที่ปลอดโปร่งโล่ง
                    สบายอย่างไรก็ตามมีคนจำนวนไม่น้อยประสบปัญหาเรื่องการนอนไม่หลับทั้งแบบชั่วคราวและเรื้อรัง และปัญหานี้ส่งผลเสียต่อสุขภาพทำให้ร่างกายอ่อนเพลียตื่นมาแล้วไม่สดชื่น
                    ง่วงซึม หากปฏิบัติตามทุกข้อดังกล่าวแล้วยังนอนไม่หลับ ควรปรึกษาแพทย์ เพื่อหาสาเหตุและรับการตรวจรักษาเพิ่มเติมต่อไป
                    "ความสุขของการนอนหลับคือก่อนอนหลับมีความสุข"
                    ระหว่างวัน ภูมิต้านทานของร่างกายต่ำลง ลดประสิทธิภาพในการทำงาน สมาธิความจำแย่ลง อารมณ์หงุดหงิดหดหู่จนอาจนำไปสู่ภาวะวิตกกังวลและซึมเศร้าได้
                    1. เมื่อเข้านอนแล้วนอนไม่หลับ{'\n'}
                    2. หลับได้แต่ไม่สนิทหรือหลับๆตื่นๆ{'\n'}
                    3. หลับไปแล้วตื่นกลางดึกและไม่สามารถหลับต่อได้อีก{'\n'}
                    4. ช่วงเวลาที่นอนหลับผิดไปจากคนทั่วไปคือเริ่มหลับได้ตอนดึกมากหลังเที่ยงคืนไปแล้ว{'\n'}
                    อาการนอนไม่หลับเกิดได้จากหลายสาเหตุ เช่น ความเครียดในชีวิตประจำวันการทำงานเป็นกะที่ต้องเปลี่ยนแปลงช่วงเวลาการนอนอยู่บ่อยๆ การเปลี่ยนแปลงเวลาการนอนอยู่บ่อยๆการเปลี่ยนแปลงเวลานอนเนื่องจากการเดินทางข้ามประเทศหรือทวีปที่เขตเวลาเหลื่อมกันอย่างมาก ปัญหาโรคทางกาย เช่น โรคหัวใจ โรคปอด โรคภูมิแพ้หอบหืด โรคอ้วนที่มีการอุดกั้นทางเดินหายใจเมื่อนอนหลับ โรคไทรอยด์ทำงานเกินปัญหาด้านสุขภาพจิตและโรคจิตเวช และการเข้าสู่วัยสูงอายุเป็นต้น
                    เทคนิคการนอนให้หลับสนิท{'\n'}
                    -	หลักเลี่ยงอาหาร เครื่องดื่มที่มีฤทธิ์เป็นสารกระตุ้นเช่น กาแฟ ชา{'\n'}
                    -	จัดบรรยากาศภายในห้องนอนให้เอื้อต่อการนอนหลับได้ง่าย{'\n'}
                    -	เข้านอนและตื่นนอนให้เป็นเวลาประจำเพื่อให้นาฬิกาชีวภาพในร่างกายเกิดความคุ้นเคย{'\n'}
                    -	ออกกำลังกายสม่ำเสมอครั้งละ 30 นาที ประมาณ 3-5 วันต่อสัปดาห์{'\n'}
                    -	หากิจกรรมเบาๆผ่อนคลายทำก่อนเข้านอน เช่น อาบน้ำอุ่น อ่านหนังสือ หรือร้องเพลง
                    </Text>
                  ),
                  trigger: 'HowToSleepChoice',
                },
                {
                  id: 'HowToSleepChoice',
                  options: [
                    {  label: 'ฉันง่วงนอนแล้วล่ะ 😴', trigger: 'GoodNight' },
                    {  label: 'ฉันจะพยายามทำตามคำแนะนะ 👌', trigger: 'HowToSleep1' },
                  ],
                },
                {
                  id: 'GoodNight',
                  message: 'โอเคจ้า ฝันดีนะ แล้วพบกันใหม่วันพรุ่งนี้' ,
                  trigger: 'GoodNightChoice',

                },
                {
                  id: 'GoodNightChoice',
                  options: [
                    {  label: 'Good Night Mindbot !', end: true },
                    {  label: 'ฝันดีนะ Mindbot', end: true },
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
                    {  label: 'ขอบคุณนะ Mindbot', trigger:'NeedHelp1'},
                    {  label: 'ขอบคุณค่ะ', trigger:'NeedHelp1'},
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
                    {  label: 'ฉันแค่อยากเล่าให้ฟังเฉยๆ', trigger:'NeedHelp'},
                    {  label: 'ฉันอยากรู้สึกดีขึ้น', trigger:'WantToFeelGood'},
                  ],
                },
                {
                  id: 'WantToFeelGood',
                  message: 'โชว์ข้อมูล เทคนิคที่ทำให้รู้สึกดีขึ้นยามป่วย' ,
                  trigger: 'WantToFeelGoodChoice',
                },
                {
                  id: 'WantToFeelGoodChoice',
                  options: [
                    {  label: 'เข้าใจแล้ว Mindbot', trigger:'WantToFeelGoodSum'},
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
                    trigger: 'FeelSick2',//trigger: 'userName',
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
                    trigger: 'FeelAngryChoice',
                  },
                  {
                    id: 'FeelAngryChoice',
                    options: [
                      {  label: 'ฝึกการหายใจ', trigger:'BreathPrac'},
                      {  label: 'นั่งสมาธิ', trigger:'Meditation'},
                    ],
                  },
                  {
                    id: 'Meditation',
                    message: 'ขั้นตอนแรก ฉันอยากให้คุณนั่งบนพื้น หรือนั่งบนเก้าอี้ก็ได้' ,
                    trigger: 'MeditationChoice',
                  },
                  {
                    id: 'Meditation1',
                    message: 'หลังจากนั้นเอามือขวาทับมือซ้ายไว้ตรงบริเวณตัก แบบนี้จ้า (ส่งรูปนั่งสมาธิ)' ,
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
                      {  label: 'ขอบคุณครับ Mindbot', trigger:'HowWasIt'},
                      {  label: 'ขอบคุณค่ะ Mindbot', trigger:'HowWasIt'},
                    ],
                  },
                  {
                    id: 'MeditationChoice',
                    options: [
                      {  label: 'ขั้นตอนต่อไป', trigger:'MeditationChoice1'},
                    ],
                  },
                  {
                    id: 'MeditationChoice1',
                    options: [
                      {  label: 'ขั้นตอนต่อไป', trigger:'MeditationChoice2'},
                    ],
                  },
                  {
                    id: 'MeditationChoice2',
                    options: [
                      {  label: 'เริ่มเลย Mindbot', trigger:'Meditation3'},
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
                      {  label: 'เรียบร้อยแล้ว Mindbot', trigger:'cbt2'},
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
                      {  label: 'ขอบคุณครับ Mindbot', trigger:'FeelLonely2'},
                      {  label: 'ขอบคุณค่ะ Mindbot', trigger:'FeelLonely2'},
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
                      {  label: 'คืออะไรเหรอ?', trigger:'FeelLonely3'},
                    ],
                  },
                  {
                    id: 'FeelLonely3',
                    message: 'ก็คือ ให้คุณค่ากับความสัมพันธ์ต่อเพื่อนและคนที่คุณรัก และนั่นแหละคือสิ่งที่ฉันสัมผัสได้จากตัวคุณ' ,
                    trigger: 'FeelLonelyChoice3',
                  },
                  {
                    id: 'FeelLonelyChoice3',
                    options: [
                      {  label: '😳', trigger:'FeelLonely4'},
                      {  label: '😢', trigger:'FeelLonely4'},
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
                      {  label: 'ฉันอยากรู้สึกดีขึ้น', trigger:'FeelLonely5'},//trigger:'begavior'
                      {  label: 'ฉันแค่อยากเล่าให้ฟังเฉยๆ', trigger:'FeelLonely5'},
                    ],
                  },
                  {
                    id: 'FeelLonely5',
                    message: 'คุณสามารถเล่าให้ฉันฟังได้เลยจ้า ✏️' ,
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
                id: 'userAnswer',
                user: true,
                trigger: 'SOSorDoing',

              },
              {
                id: 'SOSorDoing',
                message:'คุณต้องการความช่วยเหลือมั้ย?',
                trigger: 'SOSorDoingChoice',
              },
              {
                id: 'SOSorDoingChoice',
                options: [
                  {  label: 'ฉันต้องการความช่วยเหลือ', trigger: 'selfHarm' },
                  {  label: 'ช่วยฉันด้วย 🆘', trigger: 'cbt1' },
                  {  label: 'ฉันไม่ต้องการความเหลือ', trigger: 'IfHaveProblem' },
                ],
              },
              {
                id: 'IfHaveProblem',
                message:'ถ้ามีเรื่องอะไรอยากให้ Mindbot ดูแลใจให้คุณอีก สามารถเรียกได้ตลอดเลยนะ 😉',
                trigger: 'IfHaveProblemChoice',
              },
              {
                id: 'IfHaveProblemChoice',
                options: [
                  {  label: 'ขอบคุณครับ Mindbot', trigger: 'HowWasIt' },
                  {  label: 'ขอบคุณค่ะ Mindbot', trigger: 'HowWasIt' },
                ],
              },
              {
                id: 'mood',
                message: 'แล้วอารมณ์ของคุณตอนนี้เป็นอย่างไร',
                trigger: 'moodChoice',
              },
              {
                id: 'moodChoice',
                options: [
                  { label: 'ดีมาก', trigger: 'veryGood' },
                  { label: 'ดี', trigger: 'Good' },
                  { label: 'เฉยๆ', trigger: 'notBothered' },
                  { label: 'ไม่ค่อยดี', trigger: 'quiteBad' },
                  { label: 'แย่มาก', trigger: 'bad' },
                ],
              },
              {
                id: 'veryGood',
                message: 'ว้าว! ฉันอยากให้คุณแชร์ให้ฉันรู้หน่อยว่า ทำไมตอนนี้คุณถึงรู้สึกดี',
                trigger: 'shareMood',
              },
              {
                id: 'Good',
                message: 'ว้าว! ฉันอยากให้คุณแชร์ให้ฉันรู้หน่อยว่า ทำไมตอนนี้คุณถึงรู้สึกดี',
                trigger: 'shareMood',
              },
              {
                id: 'notBothered',
                message: 'งั้นเหรอ ฉันอยากให้คุณแชร์ให้ฉันรู้หน่อยว่าทำไม ตอนนี้คุณถึงรู้สึกเฉยๆ',
                trigger: 'shareMood',
              },
              {
                id: 'quiteBad',
                message: 'ฉันพร้อมที่จะอยู่เคียงข้างเธอเสมอนะ! แชร์ให้ฉันรู้หน่อยว่าทำไมตอนนี้คุณถึงรู้สึกแย่ ✏️',
                trigger: 'shareMood',
              },
              {
                id: 'bad',
                message: 'ฉันพร้อมที่จะอยู่เคียงข้างเธอเสมอนะ! แชร์ให้ฉันรู้หน่อยว่าทำไมตอนนี้คุณถึงรู้สึกแย่ ✏️',
                trigger: 'shareMood',
              },
              {
                id: 'shareMood',
                user: true,
                trigger: 'selfHarm',
              },
              {
                id: 'selfHarm',
                message: 'ฉันตรวจสอบคำที่คุณต้องการความช่วยเหลือ หรือจะเป็นอันตรายต่อคุณ คุณต้องการเข้ารับการประเมินเบื้องต้นหรือไม่ ใช้เวลาแค่ 2 นาที และจะเป็นประโยชน์ต่อตัวคุณมากๆเลยนะ 🙂',
                trigger: 'selfHarmChoice',
              },
              {
              id: 'selfHarmChoice',
                options: [
                  { label: 'ต้องการ', trigger: 'selfHarmStart' },
                  { label: 'ไม่ต้องการ', trigger: 'selfHarmStart' },//trigger:startCBT
                  { label: 'ช่วยฉันด้วย', trigger: 'selfHarmStart' },
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
                trigger: 'selfHarmQuestion1',
              },
              {
                id: 'startPostCBT',
                message: 'สวัสดี หลังจากคราวที่แล้วที่เราคุยกัน วันนี้ฉันจึงมีแบบทดสอบให้คุณทำ ซึ่งใช้เวลาเพียง 2 นาทีเท่านั้น',
                trigger: 'letstartPostCBT',
              },

              {
                id: 'letstartPostCBT',
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
                    { label: 'ฉันจะพยายามทำให้ดีที่สุด', trigger: 'WrongAnswer' },
                    { label: 'ฉันทำไม่ได้แน่ๆ', trigger: 'WrongAnswer' },
                    { label: 'ฉันทำได้ในบางครั้ง', trigger: 'RightAnswer' },
                    { label: 'All-or-Nothing คืออะไร?', trigger: 'WhatisAllorNothing' },

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
                  trigger: 'questionCBT2',
                },
                {
                  id: 'WrongAnswer',
                  message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                  trigger: 'questionCBTchoice',
                },
                {
                id: 'questionCBTchoice',
                  options: [
                    {  label: 'ฉันจะพยายามทำให้ดีที่สุด', trigger: 'selfHarmStart' },
                    {  label: 'ฉันทำไม่ได้แน่ๆ', trigger: 'Good' },
                    {  label: 'ฉันทำได้ในบางครั้ง', trigger: 'Good' },
                    {  label: 'ฉันทำได้ในบางครั้ง', trigger: 'Good' },
                  ],
                },
                {
                  id: 'questionCBT2',
                  message: 'ข้อใดไม่มีการใช้ความคิดแบบ Labeling',
                  trigger: 'questionCBTchoice',
                },
                {
                  id: 'questionCBTchoice2',
                    options: [
                      {  label: 'ไม่มีใครชอบฉันอีกต่อไป', trigger: 'WrongAnswer' },
                      {  label: 'ฉันไม่สามารถเป็นเพื่อนกับใครได้อีก', trigger: 'WrongAnswer' },
                      {  label: 'ฉันคิดว่าแม่ฉันน่าจะงานยุ่งอยู่ เลยอาจจะมาสาย', trigger: 'RightAnswer2' },
                      {  label: 'Labeling คืออะไร', trigger: 'WhatisLabeling' },
                    ],
                  },
                  {
                    id: 'questionCBT3',
                    message: 'ข้อใดใช้ความคิดแบบ "Should" and "Must" statement',
                    trigger: 'questionCBTchoice3',
                  },
                  {
                    id: 'questionCBTchoice3',
                      options: [
                        {  label: 'ฉันต้องสอบคิดหมอให้ได้', trigger: 'WrongAnswer' },
                        {  label: 'ฉันยอมรับในการตัดสินใจของเพื่อน', trigger: 'WrongAnswer' },
                        {  label: 'ชีวิตของฉันมีค่า', trigger: 'RightAnswer2' },
                        {  label: '"Should" and "Must" statement คืออะไร?', trigger: 'WhatisShouldMust' },
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
                    id: 'RightAnswer',
                    message: 'เย้ๆ เยี่ยมไปเลยจ้า คราวนี้ลองข้อต่อไปนะ 🙂',
                    trigger: 'questionCBT2',
                  },
                  {
                    id: 'RightAnswer2',
                    message: 'ว้าว! ยอดไปเลย ต่อไปข้อสุดท้ายนะ 🙂',
                    trigger: 'questionCBT2',
                  },
                  {
                    id: 'WrongAnswer',
                    message: 'ลองคิดใหม่นะจ๊ะ ✌️' ,
                    trigger: 'questionCBTchoice',
                  },
                  {
                    id: 'cbt1',
                    message: 'ฉันเข้าใจความรู้สึกของคุณนะ' ,
                    trigger: 'cbt2',
                  },
                  {
                    id: 'cbt2',
                    message: 'ฉันอาจจะใช้ของวิเศษชิ้นนี้ช่วยคุณได้ 🤔' ,
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
                        {  label: 'ทั้งหมด', trigger: 'cbt7' },
                        {  label: 'ความผิด', trigger: 'cbt6' },
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
                          {  label: 'ใช่', trigger: 'cbt7' },
                          {  label: 'ความคิดที่แต่งเติม?', trigger: 'cbt6' },
                        ],
                      },
                      {
                        id: 'cbt8',
                          options: [
                            {  label: '😊', trigger: 'cbt9' },
                            {  label: '😢', trigger: 'cbt9' },
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
                          trigger: 'cbtlast',
                        },
                        {
                          id: 'cbtlast',
                            options: [
                              {  label: 'ขอบคุณนะ Mindbot', trigger: 'HowWasIt' },
                              {  label: 'ฉันจะพยายาม Mindbot', trigger: 'HowWasIt' },
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
                              {  label: '👍', trigger: 'feedbackreply' },
                              {  label: '👎', trigger: 'feedbackreply' },
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
                                {  label: '❤️', trigger: 'seeu' },
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
                                    {  label: 'แล้วพบกัน Mindbot', end: true },
                                    {  label: 'Bye Mindbot', end: true },
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
