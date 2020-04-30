import {
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonPage,
    IonGrid,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonButton
    } from '@ionic/react';

import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import '../stylesheets/Main.css';
import { Question } from '../declarations';
import Menu from '../components/Menu';
import socketIOClient from "socket.io-client";
import appPages from '../components/Constants';
import {useSelector} from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import {useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'

const questions: Question[] = []

const DailyQuestions: React.FC = () => {
  const [ questionsRefreshed, refreshQuestions ] = useState('');
  const [ questionsJSON, setQuestionsJSON ] = useState([{'_id': '', 'count': '', 'question':'', 'category': '', 'options':[]}]);
  const [ answers, setAnswers ] = useState( new Map());
  const email = useSelector((state: any) => state.user.email);
  let history = useHistory();
  const dispatch = useDispatch();

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  useEffect(() => {
    queryDailyQuestions();
  }, []);

  const submit = async () => {
    try {
      await submitAnswers({
        answers
      });
    } catch (e) {
    }
  }
  function submitAnswers(e:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');
    let date_ob = new Date();
  	let date = ("0" + date_ob.getDate()).slice(-2);
  	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  	let year = date_ob.getFullYear();
  	// prints date & time in YYYY-MM-DD format
  	const fullDate = (year + "-" + month + "-" + date);
    var answersArray = [];

    answers.forEach((value, key, map) => {
      answersArray.push({question_id: key, value: value})
    });
    socket.emit('daily_questions_response', {'email': email, 'date': fullDate, 'answers': answersArray});

  }

  function changeAnswer(e:any){
    const str = e.srcElement.previousSibling.innerText;
    const str2 = e.detail.value;
    const splitted = str.split('. ');
    const splitted2 = str2.split('. ')

    var i = null;
    for(i = 0; i < questionsJSON.length; i+= 1){
      if(questionsJSON[i].question === splitted[1]){
        setAnswers(answers.set(questionsJSON[i]._id, splitted2[0]));
      }
    }
  }
  function queryDailyQuestions(){
      const socket = socketIOClient('http://76.167.174.196:8080/');
      socket.emit('read_questions', {});

      socket.on('questions_result', (data) => {
        setQuestionsJSON(data.questions);
        data.questions.map(quest => {
          questions.push({question: quest.question, options: quest.options});
        });
        refreshQuestions('refreshed');
      });

  }

  const Quest = ({questions}) => (
  <div>
    {questions.map((quest, index) => (
      <IonItem class="home_item">
      <IonLabel color="light">{index + 1}. {quest.question}</IonLabel>
      <IonSelect onIonChange={(e) => changeAnswer(e)}>
      {quest.options.map((o, index) => (
          <IonSelectOption>{index + 1}. {o}</IonSelectOption>
      ))}
      </IonSelect>
      </IonItem>
    ))}
  </div>
  );

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner daily_questions_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header2">Daily Questions</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardTitle class="card_title">Questions</IonCardTitle>
                    <IonCardContent>
                      <form onSubmit={(e) => { e.preventDefault(); submit();}}>
                        <IonList>
                          <Quest questions={questions} />
                        </IonList>
                        <IonButton expand="block" size="small" type="submit" color="dark">Submit Questions</IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </div>
              </IonCol>
            </IonRow>
          </div>
       </IonGrid>
     </IonContent>
   </IonPage>
  );
};


export default DailyQuestions;
