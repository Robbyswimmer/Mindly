import {
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonPage,
  IonGrid,
  IonIcon,
  IonCard,
  IonCardContent
  } from '@ionic/react';
import { clipboardOutline, mailOutline,calendarOutline, pencilOutline } from 'ionicons/icons';
import React, {useEffect, useState}from 'react';
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import { useSwipeable } from 'react-swipeable';
import {useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'
import socketIOClient from "socket.io-client";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [ quote, setQuote ] = useState('');
  const [ author, setAuthor ] = useState('');

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const DailyQuote = () => {
      const socket = socketIOClient('http://76.167.174.196:8080/');

      socket.emit('get_daily_quote', {});

      socket.on('quote_data', (data) => {
          setQuote(data.Quote);
          setAuthor(data.Author);
      });

      return(
        <IonCard class="page_content">
        <IonCardContent class="quote_card_content">
          "{quote}" - {author}
        </IonCardContent>
        </IonCard>
      )
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner home_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Mindly</h1>
                  </div>
                  <DailyQuote />
                  <IonCard class="page_content">
                    <IonCardContent>
                      <IonList>
                        <IonItem routerLink='/daily_questions'><IonIcon icon={clipboardOutline} slot="start"/>Daily Questionaire</IonItem>
                        <IonItem routerLink='/create_questions'><IonIcon icon={pencilOutline} slot="start"/>Create Questionaire</IonItem>
                        <IonItem routerLink='/calendar'><IonIcon icon={calendarOutline} slot="start"/>Calendar View</IonItem>
                        <IonItem routerLink='/Messenger'><IonIcon icon={mailOutline} slot="start"/>Contact Theraprist</IonItem>
                      </IonList>
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


export default HomePage;
