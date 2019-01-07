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

export default class SCORE9T16 extends React.Component {
    static navigationOptions = {
        title: 'Point Between 9 and 16',
    };

    render() {
        return (
          <ChatBot
            steps={[
            {
                id: '1',
                message: 'จากการประเมินเบื้องต้นเราพบว่าคุณมีความเสี่ยงในการทำร้ายตัวเองในระดับรุนแรง และมีความเสี่ยงในการฆ่าตัวตายในระดับสูง',
                trigger: '2',
              },
              {
                id: '2',
                options: [
                  {  label: 'ฉันต้องการความช่วยเหลืออย่างเร่งด่วน', trigger:'3'},
                  {  label: 'ฉันต้องการความช่วยเหลือ', trigger:'3'},
                ],
              },
              {
                id: '3',
                message: 'โปรดระบุว่าคุณคือ บุคคลทั่วไป หรือ บุคลากร/นักศึกษามหาวิทยาลัยธรรมศาสตร์',
                trigger: '4',
              },
              {
                id: '4',
                options: [
                  {  label: 'บุคคลทั่วไป', trigger:'5'},
                  {  label: 'บุคลากร/นักศึกษามหาวิทยาลัยธรรมศาสตร์', trigger:'6'},
                ],
              },
              {
                id: '5',
                message: 'สามารถโทรปรึกษากับพี่ๆผู้เชี่ยวชาญได้เลย ที่ 1323 สายด่วนสุขภาพจิต ฟรี! ได้ตลอด 24 ชม.เลยจ้า',
                trigger: '7',
              },
              {
                id: '6',
                message: 'สามารถโทรปรึกษากับพี่ๆผู้เชี่ยวชาญได้เลย ที่ 02-564-4440 ต่อ 1282, 6604 ศูนย์สุขภาวะทางจิต มหาวิทยาลัยธรรมศาสตร์ หรือ 1323 สายด่วนกรมสุขภาพจิต ฟรี! ได้ตลอด 24 ชม.',
                trigger: '7',
              },
              {
                id: '7',
                options: [
                  {  label: 'โทรแล้วครับ', trigger:'5'},
                  {  label: 'โทรแล้วค่ะ', trigger:'6'},
                ],
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
                trigger: 'cbt4_1',
              },
              {
                id: 'cbt4_1',
                message: 'จากประโบคข้างบน คุณคิดว่าคำไหนที่เราสามารถเปลี่ยนแปลงได้' ,
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
