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

import React from 'react';
import '../stylesheets/Main.css';
import Menu from '../components/Menu';
import appPages from '../components/Constants';
import { useSwipeable } from 'react-swipeable';
import {useDispatch} from "react-redux";
import {closeMenu, openMenu} from '../redux/actions'

const Resources: React.FC = () => {
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch<any>(closeMenu('')),
    onSwipedRight: () => dispatch<any>(openMenu('')),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <IonPage>
      <IonContent fullscreen={true} class="ion_content">
        <IonGrid>
          <div className="swipe_content" {...handlers}>
            <IonRow class="ion-justify-content-center">
              <IonCol size="12" sizeLg="8" sizeXl="4">
                <div className="main_content">
                  <div className="top_banner resources_banner">
                    <Menu appPages={appPages}/>
                    <h1 className="header1">Resources</h1>
                  </div>
                  <IonCard class="page_content">
                    <IonCardContent>
                      <IonList>
                        <IonItem class="resource_text" href="https://www.therapistaid.com/">
                         Therapist Aid
                        </IonItem>
                        <IonItem class="resource_text" href="https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008">
                          Headspace: Meditation & Sleep
                        </IonItem>
                        <IonItem class="resource_text" href="https://www.nimh.nih.gov/health/find-help/index.shtml">
                          National Institute of Mental Health
                        </IonItem>
                        <IonItem class="resource_text" href="https://suicidepreventionlifeline.org/">
                          National Suicide Prevention Lifeline Info
                        </IonItem>
                        <IonItem class="resource_text">
                          National Suicide Prevention Lifeline:&nbsp;<div className="phone_number">1-800-273-8255</div>
                        </IonItem>
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


export default Resources;
