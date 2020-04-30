import {
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonPage,
    IonGrid,
    IonCard,
    IonCardContent
    } from '@ionic/react';

import React, {useEffect, useState} from 'react';
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import { useSwipeable } from 'react-swipeable';
import {useDispatch, useSelector} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions';
import socketIOClient from "socket.io-client";
import Talk from "talkjs";

const Messenger: React.FC = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.user.email);
  const profileImgUrl = useSelector((state: any) => state.user.profileImgUrl);
  const firstName = useSelector((state: any) => state.user.firstName);
  const lastName = useSelector((state: any) => state.user.lastName);
  const chatId = useSelector((state: any) => state.user.chatId);

  var profEmail = '';
  var profChatId = '';
  var profName = '';
  var profPicUrl = '';

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    findProf();
  }, []);

  function loadTalkJS() {
    Talk.ready.then(() => {
        var me = new Talk.User({
        id: chatId,
        name: firstName,
        email: email,
        photoUrl: profileImgUrl,
        role: "DarkMode"
        });

        (window as any).talkSession = new Talk.Session({
          appId: "tiYRASGP",
          me: me
        });

        var other = new Talk.User({
          id: profChatId,
          name: profName,
          email: profEmail,
          photoUrl: profPicUrl,
          role: "DarkMode"
        });

        var conversation = (window as any).talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));

        conversation.setParticipant(me);
        conversation.setParticipant(other);
        var inbox = (window as any).talkSession.createInbox({selected: conversation});
        inbox.mount(document.getElementById("talkjs-container"));

        })
      }

    function findProf(){
      const socket = socketIOClient('http://76.167.174.196:8080/');

      socket.emit('find_professionals', { email: email });

      socket.on('found_prof', (data) => {
          if(data.foundProf === 'true'){
            console.log('Found professional');
          }else{
            console.log('Could not find professional');
          }
      });

      socket.on('prof_info', (data) => {
        profName= 'Dr. ' + data.user[0].lastName;
        profEmail = data.user[0].email;
        profChatId = data.user[0]._id;
        profPicUrl = data.user[0].profileImgUrl;
        loadTalkJS();
      });
    }

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner messenger_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Messenger</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardContent>
                      <div id="talkjs-container"></div>
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


export default Messenger;
