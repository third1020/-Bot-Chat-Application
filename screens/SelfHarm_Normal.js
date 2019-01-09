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

export default class SelfHarm_Normal extends React.Component {
    static navigationOptions = {
        title: 'SelfHarm_Normal',
    };

    render() {
        return (
          <ChatBot
            steps={[
            {
                id: '1',
                message: 'ฉันตรวจพบว่าคุณต้องการความช่วยเหลือ',
                trigger: '3',
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
                          {  label: 'ขอบคุณนะ Mindbot', trigger: 'cbt11' },
                          {  label: 'ฉันจะพยายาม Mindbot', trigger: 'cbt11' },
                        ],
                      },
                      {
                        id: 'cbt11',
                        message: 'เมื่อคุณรู้สึกแย่หรือวิตกกังวล คุณจะขาดแรงจูงใจจนไม่อยากจะทำกิจกรรมอย่างอื่นเลย' ,
                        trigger: 'cbt12',
                      },
                      {
                        id: 'cbt12',
                          options: [
                            {  label: 'ใช่ฉันเลย Mindbot', trigger: 'cbt13' },
                            {  label: 'ฉันคิดว่านั่นไม่ใช่ฉันแล้วล่ะ Mindbot', trigger: 'HowWasIt' },
                          ],
                        },
                      {
                        id: 'cbt13',
                        message: 'ฉันเข้าใจความรู้สึกของคุณนะ' ,
                        trigger: 'cbt14',
                      },
                      {
                        id: 'cbt14',
                        message: 'คราวนี้ ฉันอาจจะใช้ของวิเศษที่ดีที่สุดของฉันแล้วล่ะ 🤔' ,
                        trigger: 'cbt15',
                      },
                      {
                        id: 'cbt15',
                          options: [
                            {  label: 'คืออะไรเหรอ?', trigger: 'cbt16' },
                            {  label: 'เซอไพรส์ฉันสิ', trigger: 'cbt16' },
                          ],
                        },
                        {
                            id: 'cbt16',
                            message: 'คือ "คุณ" ยังไงล่ะ' ,
                            trigger: 'cbt17',
                          },
                          {
                            id: 'cbt17',
                            message: 'ฉันจะทำไม่ได้แน่ๆ เลยหากขาด "คุณ" ในครั้งนี้' ,
                            trigger: 'cbt18',
                          },
                          {
                            id: 'cbt18',
                              options: [
                                {  label: '🤗', trigger: 'cbt19' },
                                {  label: '😳', trigger: 'cbt19' },
                              ],
                            },
                            {
                                id: 'cbt19',
                                message: 'ของวิเศษที่ดีที่สุดสำหรับฉัน ก็คือ "คุณ" ยังไงล่ะ' ,
                                trigger: 'cbt20',
                              },
                              {
                                id: 'cbt20',
                                  options: [
                                    {  label: '😳', trigger: 'Behavior8' },
                                    {  label: '😲', trigger: 'Behavior8' },
                                  ],
                                },
                                {
                                    id: 'Behavior8',
                                    message: 'ใน 1 สัปดาห์นี้ฉันต้องการให้คุณทำกิจกรรมเพื่อการผ่อนคลาย 3 อย่างซึ่งจะเป็นผลดีต่อการพัฒนาทางอารมณ์ของคุณเอง' ,
                                    trigger: 'Behavior8_2',
                                  },
                                  {
                                    id: 'Behavior8_2',
                                    message: 'โชว์รูปภาพกิจกรรม' ,
                                    trigger: 'Behavior9',
                                  },
                                  {
                                    id: 'Behavior9',
                                    message: 'คุณอยากทำอะไรเป็นอย่างแรก' ,
                                    trigger: 'Behavior10',
                                  },
                                  {
                                    id: 'Behavior10',
                                    message: 'แล้วอย่างต่อมาล่ะ' ,
                                    trigger: 'Behavior11',
                                  },
                                  {
                                    id: 'Behavior11',
                                    message: 'แล้วอย่างสุดท้ายคืออะไรจ๊ะ?' ,
                                    trigger: 'Behavior12',
                                  },
                                  {
                                    id: 'Behavior12',
                                    message: 'สรุปคือจะทำตามนี้นะ' ,
                                    trigger: 'Behavior13',
                                  },
                                  {
                                    id: 'Behavior13',
                                    message: 'สัญญานะ !' ,
                                    trigger: 'Behavior14',
                                  },
                                  {
                                    id: 'Behavior14',
                                    options: [
                                      {  label: '👌', trigger:'Behavior15'},
                                      {  label: '🤞', trigger:'Behavior8'},
                                    ],
                                  },
                                  {
                                    id: 'Behavior15',
                                    message: 'โอเคจ้า ถือว่าเป็นการบ้านระหว่างเรานะ' ,
                                    trigger: 'Behavior16',
                                  },
                                  {
                                    id: 'Behavior16',
                                    message: 'แล้วฉันจะมาตรวจการบ้านในอีก 1 สัปดาห์นะ' ,
                                    trigger: 'Welcome', //GO BACK TO START MENU
                                  },
                                  {
                                    id: 'Welcome', // START MENU
                                    options: [
                                      {  label: 'พูดคุยกับฉัน - Lets talk!', trigger:''},
                                      {  label: 'ประเมินฉัน - Checkin me!', trigger:''},
                                      {  label: 'ต้องการความช่วยเหลือ - Need help!', trigger:''},
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
