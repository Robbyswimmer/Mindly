import {
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonPage,
  IonGrid,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
  } from '@ionic/react';
import { add, remove} from 'ionicons/icons';
import React, {useState}from 'react';
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import { useSwipeable } from 'react-swipeable';
import {useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'
import socketIOClient from "socket.io-client";
import {useSelector} from 'react-redux';

const CreateQuestions: React.FC = () => {
  const dispatch = useDispatch();
  const [ question, setQuestion ] = useState('');
  const [ options, setOptions ] = useState( new Map());
  const [ totalOptions, setTotalOptions ] = useState(3);
  const [ insertStatus, setInsertStatus ] = useState(false);
  const email = useSelector((state: any) => state.user.email);

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });


  const submit = async () => {
    try {
      await submitQuestion({
        question,
        options
      });
    } catch (e) {
    }
  }

  function changeOption(e:any){
    setOptions(options.set(e.target.id, e.detail.value));
  }
  function submitQuestion(e:any){
    const socket = socketIOClient('http://76.167.174.196:8080/');
    socket.emit('insert_questions', {email: email, question: question, options: Array.from(options.values())});

    socket.on('question_insert_status', (data) => {
        if(data.status === 'true'){
          setInsertStatus(true);
        }else{
          setInsertStatus(false);
        }
    });
  }

  function addOption(){
    if(totalOptions < 10){
      setTotalOptions(totalOptions + 1);
    }

  }
  function removeOption(){
    if(totalOptions > 0){
      setTotalOptions(totalOptions - 1);
    }

  }
  const InsertStatus = () => {
    if(insertStatus){
      return (<div className='insert_message'>Successfully added questions.</div>)
    }else{
      return <div></div>
    }
  }

  const createOptions = () => {
    let optionInputs = [];

    for(let i = 0; i < totalOptions; i++){
        optionInputs.push(<IonItem><IonLabel position="floating"color="light">Option {i+1}:</IonLabel>
        <IonInput type="text"color="light" name={`Option${i+1}`} id={`Option${i+1}`}onIonChange={(e) => changeOption(e)}></IonInput></IonItem>
        );
    }

    return optionInputs;
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner create_questions_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header2">Create Questions</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardContent>
                      <form onSubmit={(e) => { e.preventDefault(); submit();}}>
                        <IonItem>
                          <IonLabel position="floating"color="light">Question:</IonLabel>
                          <IonInput type="text"color="light"inputmode="text"  onIonChange={(e) => setQuestion(e.detail.value)}></IonInput>
                        </IonItem>
                        {createOptions()}
                        <IonButton onClick={removeOption} color="dark">
                          <IonIcon icon={remove} />
                        </IonButton>
                        <IonButton onClick={addOption} color="dark">
                          <IonIcon icon={add} />
                        </IonButton>
                        <IonButton className="login_buttons" expand="block" size="small" type="submit" color="dark">Submit Question</IonButton>
                        <InsertStatus/>
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


export default CreateQuestions;
